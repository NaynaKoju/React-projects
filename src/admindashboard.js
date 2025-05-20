//code without toggle option..............................
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './profiletable.css';

// function AdminDashboard() {
//   const [students, setStudents] = useState([]);
//   const [admissions, setAdmissions] = useState([]);
//   const [error, setError] = useState("");

//   const email = localStorage.getItem("adminEmail");
//   const password = localStorage.getItem("adminPassword");

//   // Fetch student data
//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/api/studentDB?email=${email}&password=${password}`)
//       .then((res) => {
//         setStudents(res.data);
//       })
//       .catch((err) => {
//         setError("Failed to fetch student data.");
//         console.error(err);
//       });
//   }, []);

//   // Fetch admission form data
//   useEffect(() => {
//     axios
//       .get(`http://localhost:3001/api/admissionDB?email=${email}&password=${password}`)
//       .then((res) => {
//         setAdmissions(res.data);
//       })
//       .catch((err) => {
//         setError("Failed to fetch admission form data.");
//         console.error(err);
//       });
//   }, []);

//   return (
//     <div className="admin-dashboard">
//       <h1 className="title">All Student Profiles</h1>

//       {error && <h3 className="error">{error}</h3>}

//       <table className="student-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Roll No</th>
//             <th>Class</th>
//             <th>Section</th>
//             <th>DOB</th>
//             <th>Guardian</th>
//             <th>Contact</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Admission Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student, index) => (
//             <tr key={student.id || index}>
//               <td>{student.id}</td>
//               <td>{student.name}</td>
//               <td>{student.roll}</td>
//               <td>{student.class}</td>
//               <td>{student.section}</td>
//               <td>{student.dob}</td>
//               <td>{student.guardian}</td>
//               <td>{student.contact}</td>
//               <td>{student.email}</td>
//               <td>{student.address}</td>
//               <td>{student.admission_date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h1 className="title">Admission Form Submissions</h1>

//       <table className="admission-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Contact</th>
//             <th>DOB</th>
//             <th>Gender</th>
//             <th>Address</th>
//             <th>Qualification</th>
//             <th>Message</th>
//           </tr>
//         </thead>
//         <tbody>
//           {admissions.map((admission, index) => (
//             <tr key={admission.id || index}>
//               <td>{admission.id}</td>
//               <td>{admission.fullName}</td>
//               <td>{admission.email}</td>
//               <td>{admission.contact}</td>
//               <td>{admission.dob}</td>
//               <td>{admission.gender}</td>
//               <td>{admission.address}</td>
//               <td>{admission.qualification}</td>
//               <td>{admission.message}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import './profiletable.css';

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState([]); // 'students' or 'admissions' can be passed

  const email = localStorage.getItem("adminEmail");
  const password = localStorage.getItem("adminPassword");

  // Fetch student data
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/studentDB?email=${email}&password=${password}`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch student data.");
        console.error(err);
      });
  }, []);

  // Fetch admission form data
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/admissionDB?email=${email}&password=${password}`)
      .then((res) => {
        setAdmissions(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch admission form data.");
        console.error(err);
      });
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="title">Admin Dashboard</h1>

      {error && <h3 className="error">{error}</h3>}

      <div className="tab-buttons">
        <button
          className={activeTab === "students" ? "active-tab" : ""}
          onClick={() => setActiveTab("students")}
        >
          Student Profiles
        </button>
      
        <button
          className={activeTab === "admission" ? "active-tab" : ""}
          onClick={() => setActiveTab("admission")}
        >
          Admission Submissions
        </button>
      </div>

      {activeTab === "students" && (
        <>
          <h2 className="title">All Student Profiles</h2>
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Section</th>
                <th>DOB</th>
                <th>Guardian</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Address</th>
                <th>Admission Date</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id || index}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.roll}</td>
                  <td>{student.class}</td>
                  <td>{student.section}</td>
                  <td>{student.dob}</td>
                  <td>{student.guardian}</td>
                  <td>{student.contact}</td>
                  <td>{student.email}</td>
                  <td>{student.address}</td>
                  <td>{student.admission_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === "admission" && (
        <>
          <h1 className="title">Admission Form Submissions</h1>
          <table className="admission-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Qualification</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {admissions.map((admission, index) => (
                <tr key={admission.id || index}>
                  <td>{admission.id}</td>
                  <td>{admission.fullName}</td>
                  <td>{admission.email}</td>
                  <td>{admission.contact}</td>
                  <td>{admission.dob}</td>
                  <td>{admission.gender}</td>
                  <td>{admission.address}</td>
                  <td>{admission.qualification}</td>
                  <td>{admission.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
