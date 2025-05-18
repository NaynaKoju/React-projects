import React, { useState } from "react";
import './admission.css'

function AdmissionCriteria() {
  return (
    <div className='adcri'>
      <h1>Admission Criterias you must meet </h1>
      <h1>🏫 School Admission Criteria</h1>
        <p>We welcome students who are committed to academic excellence and personal growth. 
        To ensure a successful learning experience for all, our admission process follows 
        certain guidelines:</p>

 <h1>Age Requirements</h1>
<p>Nursery: 3 years and above
<br></br>Kindergarten: 4 years and above
<br></br>Grade 1 and above: As per national educational standards and transfer certificates
</p>

<h1>Academic Performance</h1>
<p>For Grades 1 and above, the applicant’s previous academic record must reflect satisfactory performance.
Transfer certificate and latest report cards are required.
</p>

<h1>Entrance Test & Interview</h1>
<p>Entrance assessments may be conducted for core subjects to determine the student’s readiness.
Personal interviews with the student and parents may be required for higher grades.
</p>

<h1>Document Submission</h1>
<p>Applicants must provide the following documents:
<br></br>
Birth certificate
<br></br>
Recent passport-sized photographs
<br></br>
Transfer certificate (for students transferring from another school)
<br></br>
Photocopy of report card (for Grades 1 and above)
<br></br>
ID proof of parents/guardians
</p>

<h1>Language Proficiency</h1>
<p>Students applying to grades where English is the primary medium of instruction are expected to have basic proficiency in English.
</p>
<h1>Medical Fitness</h1>
<p>A medical certificate stating that the child is fit to attend school is required.</p>

<h1>Special Needs Support</h1>
<p>The school aims to be inclusive. If your child has any special needs, kindly 
  inform the school during application to determine the available support.</p>
    </div>
  );
}

export default AdmissionCriteria;
