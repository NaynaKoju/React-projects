import React, { useEffect, useState } from 'react';
import './fees.css';

function Fees() {
  const [fees, setFees] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    async function fetchFees() {
      try {
        const res = await fetch('http://localhost:3004/api/pages/fees');
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const html = data[0].content;
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const listItems = doc.querySelectorAll('li');

          const feesArray = [];
          listItems.forEach((li) => {
            const parts = li.querySelectorAll('p');
            if (parts.length >= 2) {
              feesArray.push({
                grade: parts[0].textContent.trim(),
                fee: parts[1].textContent.trim(),
              });
            }
          });

          setFees(feesArray);
        } else {
          console.warn('Unexpected response:', data);
        }
      } catch (err) {
        console.error('Error fetching fees:', err);
      }
    }

    fetchFees();
  }, []);

  const toggleFee = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!fees.length) return <p>Loading fees...</p>;

  return (
    <section className="fees">
      <div className="box">
        <div className="sectionContent">
          <h2 className="text-bg">Tuition Fees</h2>
          <ul className="grade-list">
            {fees.map(({ grade, fee }, idx) => (
              <li key={idx} className="grade-item">
                <button
                  onClick={() => toggleFee(idx)}
                  className="grade-button"
                >
                  {grade}
                </button>
                {openIndex === idx && (
                  <p className="fee-amount">{fee}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Fees;
