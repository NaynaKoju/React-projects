import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminlogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  // Define your admin credentials here
  const adminCredentials = {
    email: "admin@lbess.edu.np",
    password: "admin123"
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === adminCredentials.email && password === adminCredentials.password) {
        localStorage.setItem("adminEmail", email);
        localStorage.setItem("adminPassword", password);
      alert("Admin logged in successfully!");
      setError("");
     navigate("/admindashboard"); // <-- redirect to admin dashboard
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
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
    </div>
  );
}

export default AdminLogin;
