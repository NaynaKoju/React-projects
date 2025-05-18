import React, { useState } from "react";
import { Link } from "react-router-dom";
import './App.css';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClose = () => {
    setShowDropdown(false);
  };

  return (
    <nav className="rightNav">
      <div className="dropdown">
        <button onClick={handleToggle}>Admission</button>
        {showDropdown && (
          <ul className="dropdown-menu">
            <li><Link to="/admissioncriteria" onClick={handleClose}>Criterias</Link></li>
            <li><Link to="/admissionform" onClick={handleClose}>Form</Link></li>
            <li><Link to="/faq" onClick={handleClose}>FAQ</Link></li>
            <li><Link to="/studentprofile" onClick={handleClose}>StudentProfile</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
