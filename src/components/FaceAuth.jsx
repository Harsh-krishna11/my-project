// // // // // // import React, { useRef, useEffect } from "react";
// // // // // // import * as faceapi from "face-api.js";

// // // // // // const FaceAuth = () => {
// // // // // //   const videoRef = useRef(null);

// // // // // //   // Load models
// // // // // //   useEffect(() => {
// // // // // //     const loadModels = async () => {
// // // // // //       const MODEL_URL = "/models"; // public/models folder
// // // // // //       await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
// // // // // //       await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
// // // // // //       await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
// // // // // //       startVideo();
// // // // // //     };

// // // // // //     const startVideo = () => {
// // // // // //       navigator.mediaDevices
// // // // // //         .getUserMedia({ video: true })
// // // // // //         .then((stream) => {
// // // // // //           videoRef.current.srcObject = stream;
// // // // // //         })
// // // // // //         .catch((err) => console.error(err));
// // // // // //     };

// // // // // //     loadModels();
// // // // // //   }, []);

// // // // // //   const captureFace = async () => {
// // // // // //     const detection = await faceapi
// // // // // //       .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
// // // // // //       .withFaceLandmarks()
// // // // // //       .withFaceDescriptor();

// // // // // //     if (!detection) throw new Error("No face detected");
// // // // // //     return Array.from(detection.descriptor);
// // // // // //   };

// // // // // //   const handleRegister = async () => {
// // // // // //     const username = prompt("Enter username:");
// // // // // //     const email = prompt("Enter email:");

// // // // // //     try {
// // // // // //       const embedding = await captureFace();
// // // // // //       const res = await fetch(
// // // // // //         "http://localhost:5000/api/auth/register-embedding",
// // // // // //         {
// // // // // //           method: "POST",
// // // // // //           headers: { "Content-Type": "application/json" },
// // // // // //           body: JSON.stringify({ username, email, embedding }),
// // // // // //         }
// // // // // //       );
// // // // // //       const data = await res.json();
// // // // // //       alert(data.message || JSON.stringify(data));
// // // // // //     } catch (err) {
// // // // // //       alert(err.message);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleLogin = async () => {
// // // // // //     try {
// // // // // //       const embedding = await captureFace();
// // // // // //       const res = await fetch(
// // // // // //         "http://localhost:5000/api/auth/login-embedding",
// // // // // //         {
// // // // // //           method: "POST",
// // // // // //           headers: { "Content-Type": "application/json" },
// // // // // //           body: JSON.stringify({ embedding }),
// // // // // //         }
// // // // // //       );
// // // // // //       const data = await res.json();
// // // // // //       alert(data.message || JSON.stringify(data));
// // // // // //     } catch (err) {
// // // // // //       alert(err.message);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="flex flex-col items-center mt-10 space-y-5">
// // // // // //       <video
// // // // // //         ref={videoRef}
// // // // // //         autoPlay
// // // // // //         muted
// // // // // //         className="border-2 border-gray-300 rounded-lg"
// // // // // //         width="320"
// // // // // //         height="240"
// // // // // //       ></video>

// // // // // //       <div className="space-x-4">
// // // // // //         <button
// // // // // //           onClick={handleRegister}
// // // // // //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // // // // //         >
// // // // // //           Register
// // // // // //         </button>
// // // // // //         <button
// // // // // //           onClick={handleLogin}
// // // // // //           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// // // // // //         >
// // // // // //           Login
// // // // // //         </button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default FaceAuth;

// // import React, { useRef, useState } from "react";

// // const FaceAuth = () => {
// //   const videoRef = useRef(null);
// //   const [cameraStarted, setCameraStarted] = useState(false);
// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [capturedPhoto, setCapturedPhoto] = useState(null);

// //   // Start camera
// //   const startVideo = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// //       videoRef.current.srcObject = stream;
// //       setCameraStarted(true);
// //     } catch (err) {
// //       console.error("Camera access denied:", err);
// //       alert("Please allow camera access.");
// //     }
// //   };

// //   // Capture photo as blob and set preview
// //   const capturePhoto = () => {
// //     if (!videoRef.current) throw new Error("Video not available");

// //     const canvas = document.createElement("canvas");
// //     canvas.width = videoRef.current.videoWidth || 320;
// //     canvas.height = videoRef.current.videoHeight || 240;
// //     const ctx = canvas.getContext("2d");
// //     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

// //     canvas.toBlob((blob) => {
// //       setCapturedPhoto(URL.createObjectURL(blob)); // show preview
// //       setPhotoBlob(blob); // save blob for sending
// //     }, "image/jpeg");
// //   };

// //   const [photoBlob, setPhotoBlob] = useState(null);

// //   // Handle registration
// //   const handleRegister = async (e) => {
// //     e.preventDefault();
// //     if (!photoBlob) {
// //       alert("Please capture your photo first!");
// //       return;
// //     }

// //     try {
// //       const formData = new FormData();
// //       formData.append("username", username);
// //       formData.append("email", email);
// //       formData.append("photo", photoBlob, "face.jpg");

// //       const res = await fetch("http://localhost:5000/api/auth/register", {
// //         method: "POST",
// //         body: formData,
// //       });
// //       const data = await res.json();
// //       alert(data.message || JSON.stringify(data));
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   // Handle login
// //   const handleLogin = async () => {
// //     if (!photoBlob) {
// //       alert("Please capture your photo first!");
// //       return;
// //     }

// //     try {
// //       const formData = new FormData();
// //       formData.append("photo", photoBlob, "face.jpg");

// //       const res = await fetch("http://localhost:5000/api/auth/login", {
// //         method: "POST",
// //         body: formData,
// //       });
// //       const data = await res.json();
// //       alert(data.message || JSON.stringify(data));
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center mt-10 space-y-5">
// //       <video
// //         ref={videoRef}
// //         autoPlay
// //         muted
// //         playsInline
// //         width="320"
// //         height="240"
// //         className="border-2 border-gray-300 rounded-lg"
// //       ></video>

// //       {!cameraStarted ? (
// //         <button
// //           onClick={startVideo}
// //           className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
// //         >
// //           Start Camera
// //         </button>
// //       ) : (
// //         <>
// //           <form
// //             onSubmit={handleRegister}
// //             className="flex flex-col items-center space-y-3"
// //           >
// //             <input
// //               type="text"
// //               placeholder="Username"
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               className="border px-2 py-1 rounded w-64"
// //               required
// //             />
// //             <input
// //               type="email"
// //               placeholder="Email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="border px-2 py-1 rounded w-64"
// //               required
// //             />
// //             <button
// //               type="button"
// //               onClick={capturePhoto}
// //               className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
// //             >
// //               Capture Photo
// //             </button>
// //             {capturedPhoto && (
// //               <img
// //                 src={capturedPhoto}
// //                 alt="Captured"
// //                 className="w-64 h-48 object-cover border rounded"
// //               />
// //             )}
// //             <div className="flex space-x-4">
// //               <button
// //                 type="submit"
// //                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //               >
// //                 Register
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={handleLogin}
// //                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// //               >
// //                 Login
// //               </button>
// //             </div>
// //           </form>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default FaceAuth;

// import React, { useRef, useState } from "react";

// const FaceAuth = () => {
//   const videoRef = useRef(null);
//   const [cameraStarted, setCameraStarted] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [capturedPhoto, setCapturedPhoto] = useState(null);
//   const [photoBlob, setPhotoBlob] = useState(null);

//   // Start camera
//   const startVideo = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//       setCameraStarted(true);
//     } catch (err) {
//       console.error("Camera access denied:", err);
//       alert("Please allow camera access.");
//     }
//   };

//   // Capture photo
//   const capturePhoto = () => {
//     if (!videoRef.current) throw new Error("Video not available");

//     const canvas = document.createElement("canvas");
//     canvas.width = videoRef.current.videoWidth || 320;
//     canvas.height = videoRef.current.videoHeight || 240;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//     canvas.toBlob((blob) => {
//       setCapturedPhoto(URL.createObjectURL(blob)); // show preview
//       setPhotoBlob(blob); // save blob for sending
//     }, "image/jpeg");
//   };

//   // Handle registration
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (!photoBlob) {
//       alert("Please capture your photo first!");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("username", username);
//       formData.append("email", email);
//       formData.append("photo", photoBlob, "face.jpg");

//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       alert(data.message || JSON.stringify(data));
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // Handle login
//   const handleLogin = async () => {
//     if (!photoBlob) {
//       alert("Please capture your photo first!");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("photo", photoBlob, "face.jpg");

//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       alert(data.message || JSON.stringify(data));
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center mt-10 space-y-5">
//       {/* Video / Captured Photo */}
//       {capturedPhoto ? (
//         <img
//           src={capturedPhoto}
//           alt="Captured"
//           className="w-64 h-48 object-cover border rounded"
//         />
//       ) : (
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           playsInline
//           width="320"
//           height="240"
//           className="border-2 border-gray-300 rounded-lg"
//           style={{ display: cameraStarted ? "block" : "none" }}
//         />
//       )}

//       {/* Start Camera Button */}
//       {!cameraStarted && !capturedPhoto && (
//         <button
//           onClick={startVideo}
//           className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//         >
//           Start Camera
//         </button>
//       )}

//       {/* Capture Photo Button */}
//       {cameraStarted && !capturedPhoto && (
//         <button
//           type="button"
//           onClick={capturePhoto}
//           className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-2"
//         >
//           Capture Photo
//         </button>
//       )}

//       {/* Form Inputs */}
//       <form
//         onSubmit={handleRegister}
//         className="flex flex-col items-center space-y-3 mt-4"
//       >
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="border px-2 py-1 rounded w-64"
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border px-2 py-1 rounded w-64"
//           required
//         />

//         {/* Action Buttons */}
//         <div className="flex space-x-4 mt-2">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Register
//           </button>
//           <button
//             type="button"
//             onClick={handleLogin}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Login
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FaceAuth;

import React, { useRef, useState } from "react";

const FaceAuth = () => {
  const videoRef = useRef(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [photoBlob, setPhotoBlob] = useState(null);

  // Start camera
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setCameraStarted(true);
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Please allow camera access.");
    }
  };

  // Capture photo and stop camera
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      setCapturedPhoto(URL.createObjectURL(blob));
      setPhotoBlob(blob);
    }, "image/jpeg");

    // Stop camera
    const stream = video.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setCameraStarted(false);
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!photoBlob) {
      alert("Please capture your photo first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("photo", photoBlob, "face.jpg");

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message || JSON.stringify(data));
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle login
  const handleLogin = async () => {
    if (!photoBlob) {
      alert("Please capture your photo first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("photo", photoBlob, "face.jpg");

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message || JSON.stringify(data));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 space-y-5">
      {/* Video / Captured Photo */}
      {capturedPhoto ? (
        <img
          src={capturedPhoto}
          alt="Captured"
          className="w-64 h-48 object-cover border rounded"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          width="320"
          height="240"
          className="border-2 border-gray-300 rounded-lg"
          style={{ display: cameraStarted ? "block" : "none" }}
        />
      )}

      {/* Start Camera Button */}
      {!cameraStarted && !capturedPhoto && (
        <button
          onClick={startVideo}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Click to Capture
        </button>
      )}

      {/* Capture Photo Button */}
      {cameraStarted && (
        <button
          type="button"
          onClick={capturePhoto}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-2"
        >
          Capture Photo
        </button>
      )}

      {/* Form Inputs */}
      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center space-y-3 mt-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-2 py-1 rounded w-64"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-2 py-1 rounded w-64"
          required
        />

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default FaceAuth;
