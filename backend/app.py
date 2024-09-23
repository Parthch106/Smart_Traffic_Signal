from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# API endpoint for a POST request
@app.route('/api/data', methods=['POST'])
def get_data():
    data = request.json
    name = data.get('name')
    response = {
        'message': f'Hello, {name}!'
    }
    return jsonify(response)

# API endpoint for a GET request
@app.route('/api/greet/<name>', methods=['GET'])
def greet(name):
    return jsonify({'greeting': f'Hello, {name}!'})

if __name__ == '__main__':
    app.run(debug=True)
