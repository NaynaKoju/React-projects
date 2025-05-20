import React from "react";
import "./App.css";
import AboutUs from './aboutus';
import Facilities from './facilities';
import Socials from './socials';
import Students from './students'; 
import Fees from './fees';
import Home from './home'
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import logo from './images/image.png';
import SearchComponent from './search'; 
import AdmissionForm from "./admissionform";
import AdmissionCriteria from "./admissioncriteria";
import AdmissionFAQ from "./faq";
import DropDown from "./dropdown"
import StudentForm from "./studentprofile";
import AdminLogin from "./adminlogin";
import AdminDashboard from "./admindashboard";

// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

function App() {
    return (
       <>
        <div>
            <nav className="navbar background">
                <li className="logo">
                       <img src={logo} alt="SchoolLogo" />

                       </li>
                       <Link to="/home">Home</Link>
                       <Link to="/aboutus">About Us</Link>
                       <Link to="/facilities">Facilities</Link>
                       <Link to="/socials">Socials</Link>
                       <Link to="/students">Students</Link>
                       <Link to="/fees">Fee Structure</Link>

                        <DropDown/>

                         <div className="rightNav">
                     <SearchComponent />
                </div>



                {/* Admin Icon Link */}
    <Link to="/adminlogin" title="Admin Login" style={{ marginLeft: "20px", display: "flex", alignItems: "center", color: "white", textDecoration: "none" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width="24"
        height="24"
        fill="black"
        style={{ marginRight: "6px" }}
      >
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
      Admin
    </Link>
                 
                  </nav>
                  <Routes> {/* Wrap the route inside Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} /> 
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/socials" element={<Socials />} />
          <Route path="/students" element={<Students />} /> {/* Student route */}
          <Route path ="/fees" element={<Fees/>} />
          <Route path="/admissionform" element={<AdmissionForm />} />
          <Route path="/admissioncriteria" element={<AdmissionCriteria />} />
          <Route path="/faq" element={<AdmissionFAQ />} />
          <Route path= "/studentprofile" element={<StudentForm />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          
        </Routes>
            
            <footer className="footer">
                <p className="text-footer">
                    Copyright ©-All rights are reserved
                </p>
            </footer>
        </div>
         </>
    );
}

export default App;