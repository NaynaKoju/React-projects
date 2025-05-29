import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./adminlogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3004/api/verifytoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            setIsLoggedIn(true);
            console.log("Token verified. User is already logged in.");
          } else {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3004/api/adminlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("Login successful. Token saved:", data.token);

      alert("Admin logged in successfully!");
      setError("");

      // ✅ Navigate to dashboard
      console.log("Navigating to admin dashboard...");
      navigate("/admindashboard");

    } catch (error) {
      console.error("Login failed:", error.message);
      setError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleStayLoggedIn = () => {
    navigate("/admindashboard");
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>

      {isLoggedIn ? (
        <>
          <p>You are already logged in.</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleStayLoggedIn}>Stay Logged In</button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="admin-login-form">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default AdminLogin;


// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./adminlogin.css";

// // function AdminLogin() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate(); 

// //   // Define your admin credentials here
// //   const adminCredentials = {
// //     email: "admin@lbess.edu.np",
// //     password: "admin123"
// //   };

// //  const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   try {
// //     const response = await fetch("http://localhost:3004/api/adminlogin", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ email, password }),
// //     });

// //     if (!response.ok) {
// //       throw new Error("Invalid email or password");
// //     }

// //     const data = await response.json();
// //     localStorage.setItem("token", data.token);  // save JWT token

// //     alert("Admin logged in successfully!");
// //     setError("");
// //     navigate("/admindashboard");

// //   } catch (error) {
// //     setError(error.message);
// //   }
// // };


// //   return (
// //     <div className="admin-login-container">
// //       <h2>Admin Login</h2>
// //       <form onSubmit={handleSubmit} className="admin-login-form">
// //         <label htmlFor="email">Email:</label>
// //         <input
// //           type="email"
// //           id="email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //           placeholder="Enter your email"
// //         />

// //         <label htmlFor="password">Password:</label>
// //         <input
// //           type="password"
// //           id="password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //           placeholder="Enter your password"
// //         />

// //         {error && <p className="error-message">{error}</p>}

// //         <button type="submit">Login</button>

// //       </form>
// //     </div>
// //   );
// // }

// // export default AdminLogin;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./adminlogin.css";

// function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     fetch("http://localhost:3004/api/verifytoken", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           setIsLoggedIn(true);
//         } else {
//           localStorage.removeItem("token");
//           setIsLoggedIn(false);
//         }
//       })
//       .catch(() => {
//         localStorage.removeItem("token");
//         setIsLoggedIn(false);
//       });
//   }
// }, []);


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3004/api/adminlogin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Invalid email or password");
//       }

//       const data = await response.json();
//       console.log("Login response:", data);
//       localStorage.setItem("token", data.token);
//       console.log("Token saved:", localStorage.getItem("token"));



//       alert("Admin logged in successfully!");
//       setError("");
//       setIsLoggedIn(true);
//       navigate("/admindashboard");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     setEmail("");
//     setPassword("");
//     setError("");
//   };

//   const handleStayLoggedIn = () => {
//     // Just navigate back to dashboard without logging out
//     navigate("/admindashboard");
//   };

//   return (
//     <div className="admin-login-container">
//       <h2>Admin Login</h2>

//       {isLoggedIn ? (
//         <>
//           <p>You are already logged in.</p>
//           <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//             <button onClick={handleLogout}>Logout</button>
//             <button onClick={handleStayLoggedIn}>Stay Logged In</button>
//           </div>
//         </>
//       ) : (
//         <form onSubmit={handleSubmit} className="admin-login-form">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Enter your email"
//           />

//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Enter your password"
//           />

//           {error && <p className="error-message">{error}</p>}

//           <button type="submit">Login</button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default AdminLogin;
