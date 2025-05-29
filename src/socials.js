// import React from "react";
// import './social.css'; // Make sure to import the CSS

// function Socials() {
//   return (
//     <div className="socials-container">
//       <h2>Follow Us on Social Media</h2>
//       <ul>
//         <li>
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//             Facebook
//           </a>
//         </li>
//         <li>
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//             Twitter
//           </a>
//         </li>
//         <li>
//           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//             Instagram
//           </a>
//         </li>
//         <li>
//           <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//             LinkedIn
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default Socials;

import React, { useEffect, useState } from "react";
import './social.css';

function Socials() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3004/api/pages/socials")
      .then(res => res.json())
      .then(data => {
      console.log("Fetched data:", data); // check what `content` looks like
      setSections(data);
    })
      .catch(err => console.error("Failed to load Socials content", err));
  }, []);

  const renderContent = (content) => {
  try {
    const links = typeof content === "string" ? JSON.parse(content) : content;
    return (
      <ul>
        {Object.entries(links).map(([name, url]) => (
          <li key={name}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          </li>
        ))}
      </ul>
    );
  } catch (e) {
    return <p>{content}</p>;
  }
};

  return (
    <div className="socials-container">
      {sections.map((section, index) => (
        <div key={index}>
          <h2>{section.title}</h2>
          {renderContent(section.content)}
        </div>
      ))}
    </div>
  );
}

export default Socials;
