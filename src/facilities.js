import React, { useEffect, useState } from "react";
import './facilities.css';

function Facilities() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3004/api/pages/facilities")
      .then((res) => res.json())
      .then((data) => setSections(data))
      .catch((err) => console.error("Failed to load Facilities page", err));
  }, []);

  return (
    <div className="facilities-container">
      {sections.map((section, idx) => (
        <section key={idx}>
          <h2>{section.title}</h2>

          {/* ✅ Renders HTML directly */}
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        </section>
      ))}
    </div>
  );
}

export default Facilities;


// import React from "react";
// import './facilities.css';
// import SearchComponent from './search';;

// function Facilities() {
  
//   return (
//     <div className="facilities-container">
//         <section>
//       <h2>Our Facilities</h2>
//       <ul>
//         <li>Modern classrooms with smart boards</li>
//         <li>Science and computer laboratories</li>
//         <li>Library with digital access</li>
//         <li>Sports complex and playgrounds</li>
//         <li>Clean and hygi enic cafeteria</li>
//         <li>Transport facility</li>
//       </ul>
//       </section>
//     </div>
//   );
// }

// export default Facilities;
