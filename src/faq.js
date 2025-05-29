import React, { useEffect, useState } from "react";
import "./admission.css";
import SearchComponent from "./search";

const AdmissionFAQ = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3004/api/pages/admission-faq");
        const data = await res.json();
        console.log("Fetched FAQ sections:", data);
        setSections(data);
      } catch (err) {
        console.error("Failed to fetch FAQ:", err);
      }
    };

    fetchData(); // ✅ This needs to be inside useEffect
  }, []);

  return (
    <section>
      <SearchComponent />
      <div className="faq">
        <h1>Here are some Frequently Asked Questions</h1>
        {sections.map((section, index) => (
          <div key={section.id || index}>
            <h2>{section.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: section.content }} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdmissionFAQ;

// import React, { useState } from "react";
// import './admission.css'
// import SearchComponent from './search';

// function AdmissionFAQ () {
//   return (
//     <section>
//       <SearchComponent/>
//     <div className='faq'>
//       <h1>Here are some Frequently asked Questions</h1>
//       <p>Q1: What is the age requirement for admission?<br></br> <br></br>
// A: Children must be at least 3 years old for Nursery, 
// 4 years for Kindergarten, and age-appropriate for higher grades as per educational norms.</p>
// <br></br>
// <p> Q2: What documents are required during admission?<br></br> <br></br>
// A: The required documents include:

// Birth certificate

// Passport-sized photographs

// Previous school report card (if applicable)

// Transfer certificate (for Grade 1 and above)

// Parent/guardian ID proof

// Medical fitness certificate</p>
// <br></br>
// <p>
// Q3: Is there an entrance test for new students?<br></br> <br></br>
// A: Yes, students applying for Grade 1 and above may be required to 
// take a basic entrance test and/or attend an interview to assess their academic readiness.</p>
// <br></br>
// <p>
// Q4: What is the medium of instruction?<br></br> <br></br>
// A: The primary medium of instruction at our school is English. We also offer local 
// and foreign languages as part of the curriculum.</p>
// <br></br>
// <p>Q5: Do you offer transportation services?<br></br> <br></br>
// A: Yes, safe and reliable school transportation is available on selected routes. 
// Please contact the school office for detailed route information.</p>
// <br></br>
// <p>Q6: What extracurricular activities are available?<br></br> <br></br>
// A: We offer a variety of extracurricular activities such as:

// <li>Sports and Athletics</li>

// <li>Art and Craft</li>

// <li>Music and Dance</li>

// <li>Science and Math Clubs</li>

// <li>Debate and Drama</li>
// </p>
// <br></br>
// <p> Q7: Is there a school uniform?<br></br> <br></br>
// A: Yes, all students are required to wear the prescribed school uniform, 
// which reflects discipline and unity.</p>
// <br></br>
// <p> Q8: What is the school’s fee structure?<br></br> <br></br>
// A: The fee structure varies by grade level. You can contact the admissions 
// office directly or visit the Fees section on our website for details.</p>
// <br></br>
// <p> 
// Q9: How do I schedule a school visit?<br></br> <br></br>
// A: You can schedule a school tour by calling our front office or filling 
// out the visit request form on our website.</p>
// <br></br>
// <p>Q10: Does the school support children with special needs?<br></br> <br></br>
// A: Yes, we strive to be inclusive. If your child requires special support, 
// please inform the administration during the admission process so that we can make 
// necessary accommodations.</p>
// <br></br>
//     </div>
//     </section>
//   );
// }

// export default AdmissionFAQ ;
