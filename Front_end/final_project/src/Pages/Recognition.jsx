import React, { useState } from "react";
import Webcam from "react-webcam";
import Header from "../Components/Header";

const Recognition = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedInfo, setCapturedInfo] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    if (!isCameraOn) {
      // Clear previous data when the camera is toggled
      setCapturedInfo(null);
      setErrorMessage("");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const captureAndRecognize = async (webcamRef) => {
    if (!webcamRef || !webcamRef.current) {
      setErrorMessage("Webcam not initialized");
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();

    if (!imageSrc) {
      setErrorMessage("Failed to capture image");
      return;
    }

    try {
      const formData = new FormData();
      // Convert base64 image to blob and append it to FormData
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      formData.append("image", blob);

      const apiResponse = await fetch("http://127.0.0.1:5000/recognize", {
        method: "POST",
        body: formData,
      });

      const data = await apiResponse.json();

      if (apiResponse.ok) {
        if (data.id) {
          setCapturedInfo({
            id: data.id,
            distance: data.distance.toFixed(2), // Optional: format distance

            student_data: data.student_data, // added by me :)
          });
          setErrorMessage(""); // Clear error message if recognition succeeds
        } else if (data.error) {
          setErrorMessage(data.error);
        }
      } else {
        setErrorMessage("Error processing the image on the server.");
      }
    } catch (error) {
      console.error("Error during recognition:", error);
      setErrorMessage("An unexpected error occurred.");
      console.log(data.id);
    }
  };

  const webcamRef = React.useRef(null);

  return (
    <>
      <Header />
      <div
        className={`${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } min-h-screen`}
      >
        <div className="container mx-auto py-8 px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Attendance System</h1>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 font-semibold rounded bg-gray-700 text-white hover:bg-gray-800"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center w-full md:w-1/2">
              <div className="w-full h-[480px] bg-gray-200 rounded shadow-md overflow-hidden">
                {isCameraOn ? (
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    height={480}
                    width={640}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="rounded shadow-md"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    Camera is off
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  if (isCameraOn) captureAndRecognize(webcamRef);
                }}
                className="mt-4 px-6 py-2 font-semibold rounded bg-green-600 text-white hover:bg-green-700 transition duration-300 w-48"
                disabled={!isCameraOn}
              >
                Capture and Recognize
              </button>
              <button
                onClick={toggleCamera}
                className="mt-4 px-6 py-2 font-semibold rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-300 w-48"
              >
                {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
              </button>
            </div>
            <div className="w-full md:w-1/2">
              <div className="p-4 border rounded shadow-md bg-gray-100">
                <h2 className="text-xl font-bold mb-4">Detected Information</h2>
                {capturedInfo ? (
                  <>
                    {/* <p>
                      <strong>ID:</strong> {capturedInfo.id}
                    </p>
                    <p>
                      <strong>Distance:</strong> {capturedInfo.distance}
                    </p> */}
                    <p>
                      <strong>Student Data:</strong>
                    </p>
                    <ul>
                      {capturedInfo.student_data &&
                        Object.entries(capturedInfo.student_data).map(
                          ([key, value]) => (
                            <li key={key}>
                              <strong>{key}:</strong> {value}
                            </li>
                          )
                        )}
                    </ul>
                  </>
                ) : errorMessage ? (
                  <p className="text-red-500">{errorMessage}</p>
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recognition;
