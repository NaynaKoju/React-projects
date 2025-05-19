import React, { useState } from "react";
import "./studentform.css";

function StudentForm() {
  const [formData, setformData] = useState({
    name: "",
    roll: "",
    class: "",
    section: "",
    dob: "",
    guardian: "",
    contact: "",
    email: "",
    address: "",
    admission_date: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      const response = await fetch("http://localhost:3000/api/studentDB", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from API:", result);
      alert("Student profile saved successfully!");

      // Reset form after success
      setformData({
        name: "",
        roll: "",
        class: "",
        section: "",
        dob: "",
        guardian: "",
        contact: "",
        email: "",
        address: "",
        admission_date: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>Student Profile Form</h1>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Roll Number:</label>
          <input
            type="text"
            name="roll"
            value={formData.roll}
            onChange={handleChange}
            required
          />

          <label>Class:</label>
          <input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
          />

          <label>Section:</label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          />

          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          <label>Guardian Name:</label>
          <input
            type="text"
            name="guardian"
            value={formData.guardian}
            onChange={handleChange}
            required
          />

          <label>Contact Number:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Please enter a 10-digit number"
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>

          <label>Admission Date:</label>
          <input
            type="date"
            name="admission_date"
            value={formData.admission_date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
