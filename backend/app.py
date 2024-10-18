from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
import torch
import cv2
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Path to the saved data
DATA_PATH = os.path.join(os.getcwd(), 'data', 'data.json')
MODEL_DATA_PATH = os.path.join(os.getcwd(), 'data', 'model_data.json')


# Load the data from the file
def load_data():
    if os.path.exists(DATA_PATH):
        with open(DATA_PATH, 'r') as f:
            return json.load(f)
    return {}

# Save the data to the file
def save_data(data):
    with open(DATA_PATH, 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/api/data', methods=['GET'])
def get_saved_data():
    with open(DATA_PATH, 'r') as f:
        saved_data = json.load(f)
    return jsonify(saved_data)

@app.route('/api/data/<circle_name>', methods=['GET'])
def get_circle_data(circle_name):
    data = load_data()
    circle_data = data.get(circle_name, None)
    if circle_data:
        return jsonify(circle_data), 200
    else:
        return jsonify({"message": "Circle not found"}), 404

@app.route('/api/data', methods=['POST'])
def save_circle_data():
    data = load_data()
    req_data = request.get_json()
    circle_name = req_data['circle']
    signals = req_data['signals']
    
    data[circle_name] = signals
    save_data(data)

    return jsonify({"message": f"Circle {circle_name} data saved successfully"}), 200

@app.route('/api/data', methods=['POST'])
def predict_time_from_video(video_path, model_path, predictor_path, vehicle_classes, frame_interval=7):
    # Load YOLOv5 model
    model = torch.hub.load('ultralytics/yolov5', 'custom', path=model_path)

    # Load the trained regression model
    time_predictor = joblib.load(predictor_path)

    # Load video file
    cap = cv2.VideoCapture(video_path)

    # Check if video loaded successfully
    if not cap.isOpened():
        print("Error opening video file")
        return None

    frame_count = 0  # Counter for frames
    predicted_times = []  # List to store predicted times

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1

        # Process every nth frame (default is 7th frame)
        if frame_count == frame_interval:
            # Resize the frame (if needed)
            cropped_frame = cv2.resize(frame, (1280, 720))

            # Perform YOLOv5 detection on the cropped frame
            results = model(cropped_frame)

            # Extract detected objects
            detected_objects = results.pandas().xyxy[0]

            # Initialize vehicle counts
            vehicle_counts = {'motorcycle': 0, 'truck': 0, 'car': 0, 'bus': 0}

            for idx, row in detected_objects.iterrows():
                label = row['name']
                confidence = row['confidence']

                # Only consider vehicle classes
                if label in vehicle_classes and confidence > 0.5:
                    # Update the count for the detected vehicle
                    vehicle_counts[label] += 1

            # Prepare data for prediction
            vehicle_data = pd.DataFrame([vehicle_counts])

            # Predict time based on vehicle counts and round it to the nearest integer
            predicted_time = int(round(time_predictor.predict(vehicle_data)[0]))

            # Append predicted time to the list
            predicted_times.append(predicted_time)

    # Release resources
    cap.release()

    # Return the list of predicted times
    return predicted_times[0]

# Usage example
video_path = r'C:\Users\parth\Downloads\4_trimmed_0.mp4'
model_path = 'yolov5s.pt'
predictor_path = 'vehicle_time_predictor.pkl'
vehicle_classes = ['motorcycle', 'truck', 'car', 'bus']

predicted_times = {'Time': predict_time_from_video(video_path, model_path, predictor_path, vehicle_classes)}

# Convert the predicted time to a list if needed (ensure it's iterable)
time_list = predicted_times['Time'] if isinstance(predicted_times['Time'], list) else [predicted_times['Time']]

# Restructure the data into the desired format, handle missing signals
formatted_data = {
    "circle1": {
        "signal1": time_list[0] if len(time_list) > 0 else None,
        "signal2": time_list[1] if len(time_list) > 1 else None,
        "signal3": time_list[2] if len(time_list) > 2 else None,
        "signal4": time_list[3] if len(time_list) > 3 else None
    }
}

# Path to save the model data
MODEL_DATA_PATH = os.path.join(os.getcwd(), 'data', 'model_data.json')

def test_save():
    try:
        # Write the formatted data to the json file
        with open(MODEL_DATA_PATH, 'w') as f:
            json.dump(formatted_data, f, indent=4)
        print("Test data saved successfully.")
    except Exception as e:
        print(f"Error saving test data: {e}")

test_save()

@app.route('/api/model_data', methods=['GET'])
def get_model_saved_data():
    with open(MODEL_DATA_PATH,'r') as f:
        save_data_model = json.load(f)
    return jsonify(save_data_model)

if __name__ == '__main__':
    app.run(debug=True)
