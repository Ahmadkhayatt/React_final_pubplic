# 🎓 AI-Powered Face Recognition Attendance System

A full-stack smart attendance system that uses **real-time face recognition** to manage users, track attendance, and sync data with **Firebase** and **Supabase** — all via a **Flask backend** and a stylish **React + Tailwind** frontend.

> 🚀 Built for reliability, scalability, and a futuristic user experience.

---

## ✨ Features

### 🔍 Face Recognition API
- 📷 Upload user image → auto-encode and store face vector
- 🤖 Real-time recognition via webcam snapshot
- 🧠 Fast and accurate `face_recognition` comparison
- 🎯 Matches faces with Firebase-stored metadata

### 🔗 Backend Integration
- 🗄️ Flask REST API with endpoints for:
  - `/recognize` → recognize faces
  - `/add-user` → register new users
  - `/delete-user/<id>` → remove user from system
  - `/get-users` → list all current users
- 🔥 Firebase (Realtime DB) for live attendance logs
- ☁️ Supabase for image storage and attendance backup

### 🖥️ Frontend
- 💻 Modern UI built with **React** + **Tailwind CSS**
- 📂 File upload support and form validation
- 🔁 Real-time feedback and status display

---

## 🏗️ Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| 👁️ Face Recognition | `face_recognition`, `OpenCV`, `NumPy` |
| 🔙 Backend | Flask, Flask-CORS |
| 🔐 Auth/Storage | Firebase Realtime DB, Supabase Buckets |
| 🖼️ Frontend | React.js, Tailwind CSS |
| 🔒 Serialization | Pickle for encodings |
| 🌐 Hosting | Localhost / Cloud-ready |

---

## 📦 Install Backend

### 🐍 Python Environment

```bash
pip install flask flask-cors opencv-python face_recognition firebase-admin supabase numpy pickle-mixin
```




Developed by Ahmad khayat
AI enthusiast • Full Stack Dev • Vision Systems Builder
Let’s connect and build something great! 

