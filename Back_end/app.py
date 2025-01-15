from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import face_recognition
import pickle
import numpy as np
import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime


app = Flask(__name__)
CORS(app)

# Initialize Firebase
cred = credentials.Certificate("DataBaseFolder/serviceAccountKeyFireBase.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://finalproject2-b1cc5-default-rtdb.firebaseio.com/'
})

# Load pre-trained face encodings
with open('encoderFile.p', 'rb') as file:
    encodeListKnownWithIDS = pickle.load(file)
encodeListKnown, studentIds = encodeListKnownWithIDS

@app.route('/recognize', methods=['POST'])
def recognize_face():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    np_img = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    if img is None:
        return jsonify({'error': 'Invalid image format or corrupted file'}), 400

    imgS = cv2.resize(img, (0, 0), None, 0.5, 0.5)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    faceCurFrame = face_recognition.face_locations(imgS)
    if not faceCurFrame:
        return jsonify({'error': 'No faces detected'}), 200

    encodeCurFrame = face_recognition.face_encodings(imgS, faceCurFrame)

    for encodeFace, faceLoc in zip(encodeCurFrame, faceCurFrame):
        matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
        faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
        matchIndex = np.argmin(faceDis)

        if matches[matchIndex]:
            student_id = studentIds[matchIndex]
            # Retrieve student data from Firebase
            student_data = db.reference(f'Employe/{student_id}').get()

            if student_data:
                datetime_object = datetime.strptime(student_data['last_attendance_time'],
                                                    "%Y-%m-%d %H:%M:%S")

                secondCounter = (datetime.now()-datetime_object).total_seconds()

                if secondCounter > 10:
                    # Increment Total_attendance
                    student_data['Total_attendance'] += 1
                    # Update the database
                    db.reference(f'Employe/{student_id}/Total_attendance').set(student_data['Total_attendance'])
                    db.reference(f'Employe/{student_id}/last_attendance_time').set(
                        datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
                    return jsonify({
                        'id': student_id,
                        'distance': float(faceDis[matchIndex]),
                        'student_data': student_data
                    })

            else:
                return jsonify({'error': 'Student data not found in the database'}), 404

    return jsonify({'error': 'No match found'}), 200


@app.route('/add-user', methods=['POST'])
def add_user():
    try:
        # Get user data from the request
        user_data = request.json

        # Validate required fields
        required_fields = ['id', 'name', 'age', 'career', 'total_attendance']
        for field in required_fields:
            if field not in user_data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        # Extract data
        user_id = user_data['id']
        name = user_data['name']
        age = user_data['age']
        career = user_data['career']
        total_attendance = user_data['total_attendance']
        last_attendance_time = user_data.get('last_attendance_time', '')  # Optional

        # Add user to Firebase
        db.reference(f'Employe/{user_id}').set({
            'name': name,
            'age': age,
            'career': career,
            'Total_attendance': total_attendance,
            'last_attendance_time': last_attendance_time
        })

        return jsonify({'message': 'User added successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/get-users', methods=['GET'])
def get_users():
    ref = db.reference('Employe')
    users = ref.get()
    if not users:
        return jsonify({'users': []})
    return jsonify({'users': [{'id': key, **value} for key, value in users.items()]})


@app.route('/delete-user/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    ref = db.reference(f'Employe/{user_id}')
    if ref.get():
        ref.delete()
        return jsonify({'message': 'User deleted successfully'}), 200
    return jsonify({'error': 'User not found'}), 404



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
