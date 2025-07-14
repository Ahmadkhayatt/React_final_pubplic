<div align="center">

![Face Recognition Banner](https://placehold.co/800x200/000000/AC3097?text=Face+Recognition+App)

# Face Recognition Web App

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)]()
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)]()
[![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)]()

A full-stack face recognition system using AI to detect and identify faces in real-time from an image or a live webcam feed.

</div>

## 🗺️ Map
- [<code>🚀 Features</code>](#-features)
- [<code>🛠️ Tech Stack</code>](#-tech-stack)
- [<code>📦 Installation</code>](#-installation)
- [<code>🎮 Usage</code>](#-usage)
- [<code>⚙️ Configuration</code>](#-configuration)
- [<code>📝 License</code>](#-license)
- [<code>📢 Acknowledgments</code>](#-acknowledgments)

## 🚀 Features
-   **Real-Time Detection:** Identify and detect faces instantly via webcam.
-   **Image Analysis:** Upload an image to detect and identify faces within it.
-   **Full-Stack System:** A robust backend powered by Python/Flask and a responsive frontend built with React.
-   **Database Integration:** Uses Firebase and Supabase for data management.

## 🛠️ Tech Stack
-   **Frontend:** `React`, `HTML`, `CSS`
-   **Backend:** `Python`, `Flask`
-   **AI & Computer Vision:** `OpenCV`, `face_recognition`
-   **Database:** `Firebase`, `Supabase`

## 📦 Installation

$${\color{#AC3097}1. \space Clone \space the \space \color{#56565E}repository}$$
```sh
git clone [https://github.com/Ahmadkhayatt/face-recognition-app.git](https://github.com/Ahmadkhayatt/face-recognition-app.git)
cd face-recognition-app
```

$${\color{#AC3097}2. \space Set \space up \space the \space \color{#56565E}Backend}$$
```sh
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt
```

$${\color{#AC3097}3. \space Set \space up \space the \space \color{#56565E}Frontend}$$
```sh
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install
```

## 🎮 Usage

$${\color{#AC3097}Run \space the \space \color{#56565E}Backend \space Server}$$
```sh
# From the /backend directory
flask run
```
The Flask server will start, typically on `http://127.0.0.1:5000`.

$${\color{#AC3097}Run \space the \space \color{#56565E}Frontend \space Application}$$
```sh
# From the /frontend directory
npm start
```
The React application will open in your browser, usually at `http://localhost:3000`.

$${\color{#AC3097}How \space to \space \color{#56565E}Use}$$
-   Open the web application in your browser.
-   Choose to either upload a static image or enable your webcam.
-   The application will draw boxes around detected faces and attempt to identify them.

## ⚙️ Configuration
Before running the application, you may need to configure your database credentials.

$${\color{#AC3097}Environment \space \color{#56565E}Variables}$$
Create a `.env` file in the `backend` directory and add your Firebase and Supabase API keys:
```
FIREBASE_API_KEY="YOUR_KEY_HERE"
SUPABASE_URL="YOUR_URL_HERE"
SUPABASE_KEY="YOUR_KEY_HERE"
```
Similarly, create a `.env` file in the `frontend` directory for any client-side keys needed.

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📢 Acknowledgments
#### $${\color{#AC3097}This \space project \space was \space made \space with \space \color{red} ❤️ \space by \space @Ahmadkhayatt}$$
