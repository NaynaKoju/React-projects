import React, { useState } from "react";
import './admisionform.css';


function AdmissionForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    gender: "",
    dob: "",
    address: "",
    qualification: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", formData);
  //   alert("Form submitted successfully!");
  //   // Reset the form
  //   setFormData({
  //     fullName: "",
  //     email: "",
  //     contact: "",
  //     gender: "",
  //     dob: "",
  //     address: "",
  //     course: "",
  //     qualification: "",
  //     message: ""
  //   });
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3001/api/admissionDB', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Form submitted successfully! Admission ID: ${data.id}`);
      console.log("Admission submitted:", data);
      // Reset the form
      setFormData({
        fullName: "",
        email: "",
        contact: "",
        dob: "",
        gender: "",
        address: "",
        qualification: "",
        message: ""
      });
    } else {
      alert("Submission failed. Try again.");
      console.error("Error:", data);
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("An error occurred. Please try again later.");
  }
};


  return (
    <div className='adform'>
      <h1>Admission Form</h1>
      <form onSubmit={handleSubmit} className="inputfields">
        <div className= "contents">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
<br>
</br>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
<br>
</br>

        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          pattern="[0-9]{10}"
          title="Please enter a 10-digit number"
          required
        />
<br>
</br>
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          required
        />
<br>
</br>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
<br>
</br>
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          required
        ></textarea>
<br>
</br>
        <input
          type="text"
          name="qualification"
          placeholder="Previous GPA"
          value={formData.qualification}
          onChange={handleChange}
          required
        />
        <br>
        </br>

        {/* <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <option value="">Select Course</option>
          <option value="B.Sc Computer Science">B.Sc Computer Science</option>
          <option value="B.A English">B.A English</option>
          <option value="B.Com">B.Com</option>
          <option value="B.Tech">B.Tech</option>
          <option value="Other">Other</option>
        </select> */}

        <textarea
          name="message"
          placeholder="Type your message here"
          value={formData.message}
          onChange={handleChange}>
        </textarea>

        <br>
        </br>
         <button type="submit">Submit</button>
        </div>

      </form>
    </div>
    
  );
}

export default AdmissionForm;
