import React, { useState } from "react";
import './fees.css';
import SearchComponent from './search';

const feeData = {
  "Grade 1": "Rs. 10,000 per term",
  "Grade 2": "Rs. 11,000 per term",
  "Grade 3": "Rs. 12,000 per term",
  "Grade 4": "Rs. 13,000 per term",
  "Grade 5": "Rs. 14,000 per term",
  "Grade 6": "Rs. 15,000 per term",
  "Grade 7": "Rs. 16,000 per term",
  "Grade 8": "Rs. 17,000 per term",
  "Grade 9": "Rs. 18,000 per term",
  "Grade 10": "Rs. 20,000 per term",
};

function Fees() {
  const [openGrade, setOpenGrade] = useState(null);

  const toggleGrade = (grade) => {
    setOpenGrade(openGrade === grade ? null : grade);
  };

  return (
    <section id="fees" className="fees">
      <div className="box">
        <div className="sectionContent">
          <h1 className="text-bg">Fees Structure</h1>
          <p className="text-sm">
            The fee structure at LBESS is designed to be transparent and accessible.
            Our school offers competitive tuition rates while maintaining the quality
            of education and facilities. Fees may vary based on the grade level and
            any additional activities or services opted for.
          </p>
          <p className="text-sm">
            Parents are encouraged to contact the administration office for detailed
            fee breakdowns and payment plans. Financial assistance or scholarships
            may also be available for eligible students.
          </p>

          <div className="fees-container">
            <h2>Tuition Fees</h2>
            <ul className="grade-list">
              {Object.entries(feeData).map(([grade, fee]) => (
                <li key={grade} className="grade-item">
                  <button onClick={() => toggleGrade(grade)} className="grade-button">
                    {grade}
                  </button>
                  {openGrade === grade && <p className="fee-amount">{fee}</p>}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
      </section>
  );
}

export default Fees;
