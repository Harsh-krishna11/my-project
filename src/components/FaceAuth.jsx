// // import React, { useRef, useState } from "react";

// // const FaceAuth = () => {
// //   const [authMode, setAuthMode] = useState("login");
// //   const [isLoading, setIsLoading] = useState(false);

// //   const videoRef = useRef(null);
// //   const [cameraStarted, setCameraStarted] = useState(false);
// //   const [capturedPhoto, setCapturedPhoto] = useState(null);
// //   const [photoBlob, setPhotoBlob] = useState(null);

// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// //   const [message, setMessage] = useState("");

// //   const resetState = () => {
// //     if (videoRef.current && videoRef.current.srcObject) {
// //       const stream = videoRef.current.srcObject;
// //       stream.getTracks().forEach((track) => track.stop());
// //       videoRef.current.srcObject = null;
// //     }

// //     setCameraStarted(false);
// //     setCapturedPhoto(null);
// //     setPhotoBlob(null);
// //     setMessage("");
// //     setUsername("");
// //     setEmail("");
// //     setIsLoading(false);
// //   };

// //   const startVideo = async () => {
// //     setMessage("");
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// //       if (videoRef.current) {
// //         videoRef.current.srcObject = stream;
// //         videoRef.current.play();
// //         setCameraStarted(true);
// //         setCapturedPhoto(null);
// //         setPhotoBlob(null);
// //       }
// //     } catch (err) {
// //       console.error("Camera access denied:", err);
// //       setMessage("Please allow camera access to use this feature.");
// //       setCameraStarted(false);
// //     }
// //   };

// //   const capturePhoto = () => {
// //     const video = videoRef.current;
// //     if (!video) return;

// //     const canvas = document.createElement("canvas");
// //     canvas.width = video.videoWidth || 320;
// //     canvas.height = video.videoHeight || 240;
// //     const ctx = canvas.getContext("2d");
// //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// //     canvas.toBlob((blob) => {
// //       setCapturedPhoto(URL.createObjectURL(blob));
// //       setPhotoBlob(blob);
// //     }, "image/jpeg");

// //     const stream = video.srcObject;
// //     if (stream) {
// //       stream.getTracks().forEach((track) => track.stop());
// //       video.srcObject = null;
// //     }
// //     setCameraStarted(false);
// //   };

// //   const handleAuth = async (e) => {
// //     e.preventDefault();
// //     setMessage("");

// //     if (!photoBlob) {
// //       setMessage("Please capture your photo first!");
// //       return;
// //     }
// //     setIsLoading(true);

// //     try {
// //       const formData = new FormData();
// //       formData.append("photo", photoBlob, "face.jpg");

// //       let endpoint = "";
// //       if (authMode === "register") {
// //         if (!username || !email) {
// //           setMessage("Please enter username and email to register.");
// //           setIsLoading(false);
// //           return;
// //         }
// //         formData.append("username", username);
// //         formData.append("email", email);
// //         endpoint = "http://localhost:5000/api/auth/register";
// //       } else {
// //         endpoint = "http://localhost:5000/api/auth/login";
// //       }

// //       const res = await fetch(endpoint, {
// //         method: "POST",
// //         body: formData,
// //       });

// //       const data = await res.json();

// //       if (res.ok) {
// //         if (authMode === "register") {
// //           setMessage("Registration successful! You can now log in.");
// //           setAuthMode("login");
// //         } else {
// //           setMessage(`Login successful! Welcome!`);
// //           setIsLoggedIn(true);
// //         }
// //       } else {
// //         setMessage(data.message || "Authentication failed.");
// //         resetState();
// //       }
// //     } catch (err) {
// //       setMessage("Error: " + err.message);
// //       resetState();
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // If the user is logged in, show a simple home page
// //   if (isLoggedIn) {
// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
// //         <div className="p-10 bg-white rounded-2xl shadow-xl space-y-4">
// //           <h2 className="text-4xl font-extrabold text-green-600">
// //             Successfully Logged In!
// //           </h2>
// //           <p className="text-xl text-gray-700">Welcome to your home page.</p>
// //           <button
// //             onClick={() => {
// //               setIsLoggedIn(false);
// //               resetState();
// //             }}
// //             className="mt-6 px-6 py-2 rounded-lg font-bold text-white transition-colors duration-300 bg-red-500 hover:bg-red-600 shadow-md"
// //           >
// //             Logout
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
// //       <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl space-y-6">
// //         <h2 className="text-3xl font-extrabold text-center text-gray-800">
// //           Face Authentication
// //         </h2>

// //         {message && (
// //           <div
// //             className={`p-3 text-center rounded-lg font-medium
// //               ${
// //                 message.includes("successful")
// //                   ? "bg-green-100 text-green-700"
// //                   : "bg-red-100 text-red-700"
// //               }
// //             `}
// //           >
// //             {message}
// //           </div>
// //         )}

// //         {/* Mode Switcher Buttons */}
// //         <div className="flex justify-center space-x-2 bg-gray-200 p-1 rounded-full">
// //           <button
// //             onClick={() => {
// //               setAuthMode("register");
// //               resetState();
// //             }}
// //             className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
// //               authMode === "register"
// //                 ? "bg-blue-600 text-white shadow-md"
// //                 : "bg-transparent text-gray-700 hover:bg-gray-300"
// //             }`}
// //           >
// //             Register
// //           </button>
// //           <button
// //             onClick={() => {
// //               setAuthMode("login");
// //               resetState();
// //             }}
// //             className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
// //               authMode === "login"
// //                 ? "bg-green-600 text-white shadow-md"
// //                 : "bg-transparent text-gray-700 hover:bg-gray-300"
// //             }`}
// //           >
// //             Login
// //           </button>
// //         </div>

// //         {/* Video / Captured Photo Display */}
// //         <div className="relative w-full h-60 bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300 flex items-center justify-center">
// //           {capturedPhoto ? (
// //             <img
// //               src={capturedPhoto}
// //               alt="Captured"
// //               className="w-full h-full object-cover"
// //             />
// //           ) : (
// //             <video
// //               ref={videoRef}
// //               autoPlay
// //               muted
// //               playsInline
// //               className="w-full h-full object-cover"
// //               style={{ display: cameraStarted ? "block" : "none" }}
// //             />
// //           )}
// //           {!cameraStarted && !capturedPhoto && (
// //             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-center">
// //               Click "Start Camera" to begin
// //             </div>
// //           )}
// //         </div>

// //         {/* Camera Control Buttons */}
// //         <div className="flex flex-col space-y-4">
// //           {!cameraStarted && (
// //             <button
// //               onClick={startVideo}
// //               className="w-full py-3 rounded-lg font-bold text-white transition-colors duration-300 bg-blue-500 hover:bg-blue-600 shadow-md"
// //             >
// //               Start Camera
// //             </button>
// //           )}

// //           {cameraStarted && (
// //             <button
// //               type="button"
// //               onClick={capturePhoto}
// //               className="w-full py-3 rounded-lg font-bold text-white transition-colors duration-300 bg-yellow-500 hover:bg-yellow-600 shadow-md"
// //             >
// //               Capture Photo
// //             </button>
// //           )}
// //         </div>

// //         {/* Form Inputs, Submit Button, and Loading Spinner */}
// //         {isLoading ? (
// //           <div className="flex flex-col items-center justify-center py-6">
// //             <svg
// //               className="animate-spin h-10 w-10 text-gray-500"
// //               xmlns="http://www.w3.org/2000/svg"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //             >
// //               <circle
// //                 className="opacity-25"
// //                 cx="12"
// //                 cy="12"
// //                 r="10"
// //                 stroke="currentColor"
// //                 strokeWidth="4"
// //               ></circle>
// //               <path
// //                 className="opacity-75"
// //                 fill="currentColor"
// //                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //               ></path>
// //             </svg>
// //             <p className="mt-4 text-gray-600 font-medium">
// //               {authMode === "register"
// //                 ? "Registering you..."
// //                 : "Logging you in..."}
// //             </p>
// //           </div>
// //         ) : (
// //           <form onSubmit={handleAuth} className="w-full space-y-4 mt-4">
// //             {authMode === "register" && (
// //               <>
// //                 <input
// //                   type="text"
// //                   placeholder="Username"
// //                   value={username}
// //                   onChange={(e) => setUsername(e.target.value)}
// //                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
// //                   required
// //                 />
// //                 <input
// //                   type="email"
// //                   placeholder="Email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
// //                   required
// //                 />
// //               </>
// //             )}

// //             <button
// //               type="submit"
// //               className={`w-full py-3 rounded-lg font-bold text-white transition-colors duration-300 shadow-md mt-4
// //                 ${
// //                   authMode === "register"
// //                     ? "bg-blue-600 hover:bg-blue-700"
// //                     : "bg-green-600 hover:bg-green-700"
// //                 }
// //               `}
// //             >
// //               {authMode === "register" ? "Register" : "Login"}
// //             </button>
// //           </form>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FaceAuth;

// import React, { useRef, useState, useEffect } from "react";
// import * as faceapi from "face-api.js";

// const FaceAuth = () => {
//   const [authMode, setAuthMode] = useState("login");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isModelsLoading, setIsModelsLoading] = useState(true);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [cameraStarted, setCameraStarted] = useState(false);

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const [message, setMessage] = useState("");

//   // New state to hold the face descriptor (embedding)
//   const [faceDescriptor, setFaceDescriptor] = useState(null);

//   // Load face-api.js models when the component mounts
//   useEffect(() => {
//     const loadModels = async () => {
//       setMessage("Loading face recognition models...");
//       setIsModelsLoading(true);
//       try {
//         await Promise.all([
//           faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
//           faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
//           faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//         ]);
//         setMessage(
//           "Models loaded successfully! Click 'Start Camera' to begin."
//         );
//         setIsModelsLoading(false);
//       } catch (err) {
//         console.error("Failed to load models:", err);
//         setMessage(
//           "Error loading models. Please check console and ensure models are in public/models."
//         );
//       }
//     };
//     loadModels();
//   }, []);

//   const resetState = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const stream = videoRef.current.srcObject;
//       stream.getTracks().forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }

//     if (canvasRef.current) {
//       const canvasCtx = canvasRef.current.getContext("2d");
//       canvasCtx.clearRect(
//         0,
//         0,
//         canvasRef.current.width,
//         canvasRef.current.height
//       );
//     }

//     setCameraStarted(false);
//     setFaceDescriptor(null);
//     setMessage("");
//     setUsername("");
//     setEmail("");
//     setIsLoading(false);
//   };

//   const startVideo = async () => {
//     if (isModelsLoading) {
//       setMessage("Models are still loading. Please wait.");
//       return;
//     }
//     setMessage("");
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//         setCameraStarted(true);
//         setFaceDescriptor(null); // Reset descriptor on new photo attempt
//       }
//     } catch (err) {
//       console.error("Camera access denied:", err);
//       setMessage("Please allow camera access to use this feature.");
//       setCameraStarted(false);
//     }
//   };

//   /**
//    * REPLACED OLD 'capturePhoto' functionality.
//    * This function now captures a frame, detects the face,
//    * extracts the face descriptor (embedding), and stops the camera.
//    * It is the core of the face recognition logic on the frontend.
//    */
//   const detectAndCapture = async () => {
//     setMessage("Detecting face...");
//     const video = videoRef.current;
//     if (!video) return;

//     // Use face-api.js to detect a single face and get its descriptor
//     const detections = await faceapi
//       .detectSingleFace(video, new faceapi.SsdMobilenetv1Options())
//       .withFaceLandmarks()
//       .withFaceDescriptor();

//     if (detections) {
//       // Draw the detection box on the canvas for visual feedback
//       const displaySize = {
//         width: video.videoWidth || 320,
//         height: video.videoHeight || 240,
//       };
//       const canvas = canvasRef.current;
//       canvas.width = displaySize.width;
//       canvas.height = displaySize.height;
//       faceapi.matchDimensions(canvas, displaySize);
//       const resizedDetections = faceapi.resizeResults(detections, displaySize);
//       canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
//       faceapi.draw.drawDetections(canvas, resizedDetections);
//       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

//       // Store the face descriptor in state
//       setFaceDescriptor(detections.descriptor);

//       setMessage("Face captured successfully! You can now authenticate.");

//       // Stop the camera stream after capturing
//       const stream = video.srcObject;
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//         video.srcObject = null;
//       }
//       setCameraStarted(false);
//     } else {
//       setMessage("No face detected. Please try again.");
//     }
//   };

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!faceDescriptor) {
//       setMessage("Please capture your face photo first!");
//       return;
//     }
//     setIsLoading(true);

//     try {
//       const payload = {
//         descriptor: Array.from(faceDescriptor), // Convert the Float32Array to a standard array for JSON
//       };

//       let endpoint = "";
//       if (authMode === "register") {
//         if (!username || !email) {
//           setMessage("Please enter username and email to register.");
//           setIsLoading(false);
//           return;
//         }
//         payload.username = username;
//         payload.email = email;
//         endpoint = "http://localhost:5000/api/auth/register";
//       } else {
//         endpoint = "http://localhost:5000/api/auth/login";
//       }

//       const res = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         if (authMode === "register") {
//           setMessage("Registration successful! You can now log in.");
//           setAuthMode("login");
//         } else {
//           setMessage(`Login successful! Welcome!`);
//           setIsLoggedIn(true);
//         }
//       } else {
//         setMessage(data.message || "Authentication failed.");
//         resetState();
//       }
//     } catch (err) {
//       setMessage("Error: " + err.message);
//       resetState();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // If the user is logged in, show a simple home page
//   if (isLoggedIn) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
//         <div className="p-10 bg-white rounded-2xl shadow-xl space-y-4">
//           <h2 className="text-4xl font-extrabold text-green-600">
//             Successfully Logged In!
//           </h2>
//           <p className="text-xl text-gray-700">Welcome to your home page.</p>
//           <button
//             onClick={() => {
//               setIsLoggedIn(false);
//               resetState();
//             }}
//             className="mt-6 px-6 py-2 rounded-lg font-bold text-white transition-colors duration-300 bg-red-500 hover:bg-red-600 shadow-md"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//       <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl space-y-6">
//         <h2 className="text-3xl font-extrabold text-center text-gray-800">
//           Face Authentication
//         </h2>

//         {message && (
//           <div
//             className={`p-3 text-center rounded-lg font-medium
//               ${
//                 message.includes("successful") || message.includes("loaded")
//                   ? "bg-green-100 text-green-700"
//                   : "bg-red-100 text-red-700"
//               }
//             `}
//           >
//             {message}
//           </div>
//         )}

//         {/* Mode Switcher Buttons */}
//         <div className="flex justify-center space-x-2 bg-gray-200 p-1 rounded-full">
//           <button
//             onClick={() => {
//               setAuthMode("register");
//               resetState();
//             }}
//             className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
//               authMode === "register"
//                 ? "bg-blue-600 text-white shadow-md"
//                 : "bg-transparent text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             Register
//           </button>
//           <button
//             onClick={() => {
//               setAuthMode("login");
//               resetState();
//             }}
//             className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
//               authMode === "login"
//                 ? "bg-green-600 text-white shadow-md"
//                 : "bg-transparent text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             Login
//           </button>
//         </div>

//         {/* Video / Captured Photo Display */}
//         <div className="relative w-full h-60 bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300 flex items-center justify-center">
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             playsInline
//             className="w-full h-full object-cover"
//             style={{ display: cameraStarted ? "block" : "none" }}
//           />
//           <canvas ref={canvasRef} className="absolute top-0 left-0"></canvas>
//           {!cameraStarted && (
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-center">
//               Click "Start Camera" to begin
//             </div>
//           )}
//         </div>

//         {/* Camera Control Buttons */}
//         <div className="flex flex-col space-y-4">
//           {!cameraStarted && (
//             <button
//               onClick={startVideo}
//               disabled={isModelsLoading}
//               className="w-full py-3 rounded-lg font-bold text-white transition-colors duration-300 bg-blue-500 hover:bg-blue-600 shadow-md disabled:bg-gray-400"
//             >
//               {isModelsLoading ? "Loading Models..." : "Start Camera"}
//             </button>
//           )}

//           {cameraStarted && (
//             <button
//               type="button"
//               onClick={detectAndCapture}
//               className="w-full py-3 rounded-lg font-bold text-white transition-colors duration-300 bg-yellow-500 hover:bg-yellow-600 shadow-md"
//             >
//               Capture Face
//             </button>
//           )}
//         </div>

//         {/* Form Inputs, Submit Button, and Loading Spinner */}
//         {isLoading ? (
//           <div className="flex flex-col items-center justify-center py-6">
//             <svg
//               className="animate-spin h-10 w-10 text-gray-500"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               ></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               ></path>
//             </svg>
//             <p className="mt-4 text-gray-600 font-medium">
//               {authMode === "register"
//                 ? "Registering you..."
//                 : "Logging you in..."}
//             </p>
//           </div>
//         ) : (
//           <form onSubmit={handleAuth} className="w-full space-y-4 mt-4">
//             {authMode === "register" && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//                   required
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//                   required
//                 />
//               </>
//             )}

//             <button
//               type="submit"
//               disabled={!faceDescriptor}
//               className={`w-full py-3 rounded-lg font-bold text-white transition-colors duration-300 shadow-md mt-4
//                 ${
//                   authMode === "register"
//                     ? "bg-blue-600 hover:bg-blue-700"
//                     : "bg-green-600 hover:bg-green-700"
//                 } disabled:bg-gray-400
//               `}
//             >
//               {authMode === "register" ? "Register" : "Login"}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FaceAuth;

import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";

const FaceAuth = () => {
  const [authMode, setAuthMode] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isModelsLoading, setIsModelsLoading] = useState(true);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraStarted, setCameraStarted] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [message, setMessage] = useState("");

  // New state to hold the face descriptor (embedding)
  const [faceDescriptor, setFaceDescriptor] = useState(null);

  // Load face-api.js models when the component mounts
  useEffect(() => {
    const loadModels = async () => {
      setMessage("Loading face recognition models...");
      setIsModelsLoading(true);
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        ]);
        setMessage(
          "Models loaded successfully! Click 'Start Camera' to begin."
        );
        setIsModelsLoading(false);
      } catch (err) {
        console.error("Failed to load models:", err);
        setMessage(
          "Error loading models. Please check console and ensure models are in public/models."
        );
      }
    };
    loadModels();
  }, []);

  const resetState = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }

    setCameraStarted(false);
    setFaceDescriptor(null);
    setMessage("");
    setUsername("");
    setEmail("");
    setIsLoading(false);
  };

  const startVideo = async () => {
    if (isModelsLoading) {
      setMessage("Models are still loading. Please wait.");
      return;
    }
    setMessage("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraStarted(true);
        setFaceDescriptor(null); // Reset descriptor on new photo attempt
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setMessage("Please allow camera access to use this feature.");
      setCameraStarted(false);
    }
  };

  const detectAndCapture = async () => {
    setMessage("Detecting face...");
    const video = videoRef.current;
    if (!video) return;

    // Use face-api.js to detect a single face and get its descriptor
    const detections = await faceapi
      .detectSingleFace(video, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detections) {
      const displaySize = {
        width: video.videoWidth || 320,
        height: video.videoHeight || 240,
      };
      const canvas = canvasRef.current;
      canvas.width = displaySize.width;
      canvas.height = displaySize.height;

      // Draw the current video frame to the canvas
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, displaySize.width, displaySize.height);

      // Draw the detection box on the canvas
      faceapi.matchDimensions(canvas, displaySize);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

      // Store the face descriptor in state
      setFaceDescriptor(detections.descriptor);

      setMessage("Face captured successfully! You can now authenticate.");

      // Stop the camera stream after capturing
      const stream = video.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        video.srcObject = null;
      }
      setCameraStarted(false);
    } else {
      setMessage("No face detected. Please try again.");
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!faceDescriptor) {
      setMessage("Please capture your face photo first!");
      return;
    }
    setIsLoading(true);

    try {
      const payload = {
        embedding: Array.from(faceDescriptor), // Convert the Float32Array to a standard array for JSON
      };

      let endpoint = "";
      if (authMode === "register") {
        if (!username || !email) {
          setMessage("Please enter username and email to register.");
          setIsLoading(false);
          return;
        }
        payload.username = username;
        payload.email = email;
        endpoint = "https://face-auth-backend-ez43.onrender.com/api/auth/register-embedding";
      } else {
        endpoint = "https://face-auth-backend-ez43.onrender.com/api/auth/login-embedding";
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        if (authMode === "register") {
          setMessage("Registration successful! You can now log in.");
          setAuthMode("login");
        } else {
          setMessage(`Login successful! Welcome!`);
          setIsLoggedIn(true);
        }
      } else {
        setMessage(data.message || "Authentication failed.");
        resetState();
      }
    } catch (err) {
      setMessage("Error: " + err.message);
      resetState();
    } finally {
      setIsLoading(false);
    }
  };

  // If the user is logged in, show a simple home page
  if (isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
        <div className="p-10 bg-white rounded-2xl shadow-xl space-y-4">
          <h2 className="text-4xl font-extrabold text-green-600">
            Successfully Logged In!
          </h2>
          <p className="text-xl text-gray-700">Welcome to your home page.</p>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              resetState();
            }}
            className="mt-6 px-6 py-2 rounded-lg font-bold text-white transition-colors duration-300 bg-red-500 hover:bg-red-600 shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Face Authentication
        </h2>

        {message && (
          <div
            className={`p-3 text-center rounded-lg font-medium
              ${
                message.includes("successful") || message.includes("loaded")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {message}
          </div>
        )}

        {/* Mode Switcher Buttons */}
        <div className="flex justify-center space-x-2 bg-gray-200 p-1 rounded-full">
          <button
            onClick={() => {
              setAuthMode("register");
              resetState();
            }}
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
              authMode === "register"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-transparent text-gray-700 hover:bg-gray-300"
            }`}
          >
            Register
          </button>
          <button
            onClick={() => {
              setAuthMode("login");
              resetState();
            }}
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
              authMode === "login"
                ? "bg-green-600 text-white shadow-md"
                : "bg-transparent text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </button>
        </div>

        {/* Video / Captured Photo Display */}
        <div className="relative w-full h-60 bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300 flex items-center justify-center">
          {/* This video element is hidden when the camera is off */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ display: cameraStarted ? "block" : "none" }}
          />
          {/* The canvas is always visible and will show live or captured images */}
          <canvas
            ref={canvasRef}
            className={`w-full h-full ${cameraStarted ? "absolute" : ""}`}
          ></canvas>

          {/* This message is shown only when nothing else is */}
          {!cameraStarted && !faceDescriptor && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-center">
              Click "Start Camera" to begin
            </div>
          )}
        </div>

        {/* Camera Control Buttons */}
        <div className="flex flex-col space-y-4">
          {!cameraStarted && (
            <button
              onClick={startVideo}
              disabled={isModelsLoading}
              className="w-full py-3 rounded-lg font-bold text-white transition-colors duration-300 bg-blue-500 hover:bg-blue-600 shadow-md disabled:bg-gray-400"
            >
              {isModelsLoading ? "Loading Models..." : "Start Camera"}
            </button>
          )}

          {cameraStarted && (
            <button
              type="button"
              onClick={detectAndCapture}
              className="w-full py-3 rounded-lg font-bold text-white transition-colors duration-300 bg-yellow-500 hover:bg-yellow-600 shadow-md"
            >
              Capture Face
            </button>
          )}
        </div>

        {/* Form Inputs, Submit Button, and Loading Spinner */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <svg
              className="animate-spin h-10 w-10 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="mt-4 text-gray-600 font-medium">
              {authMode === "register"
                ? "Registering you..."
                : "Logging you in..."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleAuth} className="w-full space-y-4 mt-4">
            {authMode === "register" && (
              <>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  required
                />
              </>
            )}

            <button
              type="submit"
              disabled={!faceDescriptor}
              className={`w-full py-3 rounded-lg font-bold text-white transition-colors duration-300 shadow-md mt-4
                ${
                  authMode === "register"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-green-600 hover:bg-green-700"
                } disabled:bg-gray-400
              `}
            >
              {authMode === "register" ? "Register" : "Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FaceAuth;
