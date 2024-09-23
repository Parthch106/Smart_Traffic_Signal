from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Path to the saved data
DATA_PATH = os.path.join(os.getcwd(), 'data', 'data.json')

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

if __name__ == '__main__':
    app.run(debug=True)
