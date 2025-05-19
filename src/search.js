import React, { useState } from "react";
import './search.css';

function SearchComponent() {
  // Step 1: Define a state to hold the input value
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);

  // Step 2: Handle the input change
  const handleChange = (e) => {
    setSearchQuery(e.target.value); // Update state with the input value
  };

  // Step 3: Handle the form submission (button click)
  const handleSearch = () => {
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase(); // Make the query lowercase for case-insensitive matching
      let found = false;

      // First, try to search by section ID
      const sectionById = document.getElementById(lowerQuery);
      if (sectionById) {
        sectionById.scrollIntoView({ behavior: "smooth" });
        found = true;
        sectionById.style.transition = "background-color 0.2s ease";
        sectionById.style.backgroundColor = "lightgreen";
        setTimeout(() => {
        sectionById.style.backgroundColor = "";}, 2000);
      }

        const allSections = document.querySelectorAll("section");
        if (allSections) {
        allSections.forEach((section, div, h1, p) => {
          const textContent = section.textContent.toLowerCase();
          if (textContent.includes(lowerQuery)) {
            section.scrollIntoView({ behavior: "smooth" });
            found = true;
          }
        });
      }


      // If no match by section ID, search within all content
      // if (!found) {
      //   const allSections = document.querySelectorAll("section, div, h1, p");
      //   allSections.forEach((section, div, h1, p) => {
      //     const textContent = section.textContent.toLowerCase();
      //     if (textContent.includes(lowerQuery)) {
      //       section.scrollIntoView({ behavior: "smooth" });
      //       found = true;
      //     }
      //   });
      // }

      // If no matching content found
      if (!found) {
        setResult("No matching content found.");
      } else {
        setResult(null); // Clear the result message if a match is found
      }
    } else {
      setResult("Please enter a search query.");
    }
  };

  return (
    <div className="searches">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Type your search here..."
      />
      
      {/* Search button */}
      <button className="btn-sm" onClick={handleSearch}>Search</button>

      {/* Display the result message */}
      {result && <p>{result}</p>}
    </div>
  );
}

export default SearchComponent;