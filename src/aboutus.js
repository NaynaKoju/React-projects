// src/AboutUs.js
import './aboutus.css';
import React, { useEffect, useState } from "react";

function AboutUs() {
  const[sections, setSections] = useState([]);
   
  useEffect(() => {
    fetch (`http://localhost:3004/api/pages/about`)
    .then(res => res.json())
    .then(data => setSections(data))
    .catch(err => console.error("Failed to fetch page", err));
  }, []);

  if (sections.length===0) return <div>Loading.....</div>
   
  return (

<div className="about-us-container">
  {sections.map((section, index) => (
    <div key={index}>
      <h1 className="about-us-heading">{section.title}</h1>
      <div
        className="about-us-paragraph"
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    </div>
  ))}
</div>
  );
}
export default AboutUs;
