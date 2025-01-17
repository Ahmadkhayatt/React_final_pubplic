from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import face_recognition
import pickle
import numpy as np
import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime
from supabase import create_client, Client
import json
import os 

app = Flask(__name__)
CORS(app)

#suoabase
with open("DataBaseFolder/supabaseKey.json") as f:
    supabase_credentials = json.load(f)
    
SUPABASE_URL = supabase_credentials["supabase_url"]
SUPABASE_KEY = supabase_credentials["supabase_key"]
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

bucket_name = "storage"

# Initialize Firebase
cred = credentials.Certificate("DataBaseFolder/serviceAccountKeyFireBase.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://finalproject2-b1cc5-default-rtdb.firebaseio.com/'
})

# Load existing encodings
encoder_file_path = 'encoderFile.p'
if os.path.exists(encoder_file_path):
    with open(encoder_file_path, 'rb') as file:
        encodeListKnownWithIDS = pickle.load(file)
    encodeListKnown, studentIds = encodeListKnownWithIDS
    print(f"Encodings: {encodeListKnown}")
    print(f"Student IDs: {studentIds}")
else:
    encodeListKnown = []
    studentIds = []

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
        # Check for image file in the request
        if 'profile-picture' not in request.files:
            return jsonify({'error': 'Profile picture is required'}), 400

        image_file = request.files['profile-picture']
        if not image_file:
            return jsonify({'error': 'Invalid image file'}), 400

        # Read and process the image
        np_img = np.frombuffer(image_file.read(), np.uint8)
        img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({'error': 'Failed to process the image'}), 400

        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(img_rgb)

        if not face_locations:
            return jsonify({'error': 'No face detected in the image'}), 400

        face_encodings = face_recognition.face_encodings(img_rgb, face_locations)
        if not face_encodings:
            return jsonify({'error': 'Failed to encode face'}), 400

        # Extract the first encoding
        face_encoding = face_encodings[0]

        # Parse JSON data
        user_data = request.form

        required_fields = ['id', 'name', 'age', 'career', 'total_attendance']
        for field in required_fields:
            if field not in user_data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        user_id = user_data['id']
        name = user_data['name']
        age = int(user_data['age'])
        career = user_data['career']
        total_attendance = int(user_data['total_attendance'])
        last_attendance_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Update encodings
        if user_id in studentIds:
            return jsonify({'error': 'User ID already exists'}), 400

        encodeListKnown.append(face_encoding)
        studentIds.append(user_id)

        with open(encoder_file_path, 'wb') as file:
            pickle.dump([encodeListKnown, studentIds], file)
        print(f"Stored user_ids: {studentIds}")  # Log studentIds for debugging

        # Add user to Firebase
        firebase_data = {
            'name': name,
            'age': age,
            'career': career,
            'Total_attendance': total_attendance,
            'last_attendance_time': last_attendance_time
        }
        db.reference(f'Employe/{user_id}').set(firebase_data)

        
    
    ##try to add image to supabase bucket
        # Upload image to Supabase bucket
  
    #     image_name = f'{user_id}.jpg'
    #     supabase.storage.from_file(bucket_name, image_name, image_file)

    #     # Add user to Supabase database
    #     supabase.table('users').insert({
    #         'id': user_id,
    #         'name': name,
    #         'age': age,
    #         'career': career,
    #         'total_attendance': total_attendance,
    #         'last_attendance_time': last_attendance_time,
    #         'profile_picture': f'{SUPABASE_URL}/storage/v1/object/public/{bucket_name}/{image_name}'
    #     }).execute()

        return jsonify({'message': 'User added successfully!'}), 200
    


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
    user_id = str(user_id).strip()
    # Step 1: Delete user from Firebase database
    try:
        ref = db.reference(f'Employe/{user_id}')
        if ref.get():
            ref.delete()
            print(f"User {user_id} successfully deleted from Firebase.")
        else:
            print(f"User {user_id} not found in Firebase.")
            return jsonify({'error': 'User not found in database'}), 404
    except Exception as e:
        print(f"Error deleting user from Firebase: {str(e)}")
        return jsonify({'error': f'Failed to delete user from database: {str(e)}'}), 500

    # Step 2: Delete user from the encoder file
    try:
        if os.path.exists(encoder_file_path):
            with open(encoder_file_path, 'rb') as file:
                encodeListKnownWithIDS = pickle.load(file)

            encodeListKnown, studentIds = encodeListKnownWithIDS

            if user_id in studentIds:
                # Remove the user from encoding lists
                index = studentIds.index(user_id)
                del encodeListKnown[index]
                del studentIds[index]

                # Save the updated encoding file
                with open(encoder_file_path, 'wb') as file:
                    pickle.dump([encodeListKnown, studentIds], file)
                print(f"User {user_id} successfully deleted from the encoder file.")
            else:
                print(f"User {user_id} not found in encoder file.")
                return jsonify({'error': 'User ID not found in encodings'}), 404
        else:
            print(f"Encoder file {encoder_file_path} not found.")
            return jsonify({'error': 'Encoding file not found'}), 500
    except Exception as e:
        print(f"Error deleting user from encoder file: {str(e)}")
        return jsonify({'error': f'Failed to remove encoding: {str(e)}'}), 500
    

    # # Step 3: Delete user's image from Supabase bucket (optional)
    # try:
    #     image_name = f'{user_id}.jpg'
    #     supabase.storage.from_(bucket_name).remove([image_name])
    #     print(f"User {user_id}'s image successfully deleted from Supabase.")
    # except Exception as e:
    #     print(f"Warning: Failed to delete image from Supabase for user {user_id}: {str(e)}")
    #     # Non-blocking warning, proceed with success response.

    # # Success response
    # return jsonify({'message': 'User deleted successfully'}), 200


    # # Delete user's image from Supabase bucket
    # try:
    #     image_name = f'{user_id}.jpg'
    #     supabase.storage.from_(bucket_name).remove([image_name])
    # except Exception as e:
    #     return jsonify({"error": f"Failed to delete image from Supabase: {str(e)}"}), 500

    # # Delete user from Supabase database
    # try:
    #     supabase.table('users').delete().eq('id', user_id).execute()
    # except Exception as e:
    #     return jsonify({"error": f"Failed to delete user from Supabase database: {str(e)}"}), 500

    # return jsonify({"message": "User deleted successfully"}), 200



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
