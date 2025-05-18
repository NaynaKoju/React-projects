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
                  </nav>
                  <Routes> {/* Wrap the routes inside Routes */}
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