import React from "react";
import './students.css';
import SearchComponent from './search';

function Students() {
  return (
    <div className="students-container">
        <section>
      <h2>Our Students</h2>
      <p>
        At Lord Buddha Educational School, we take great pride in our students who
        excel both academically and in extracurricular activities. Here’s what
        makes our students stand out:
      </p>
      <ul>
        <li>Dedicated to learning and personal growth</li>
        <li>Involved in various clubs and activities</li>
        <li>Strive for excellence in academics and sports</li>
        <li>Actively participate in community outreach programs</li>
      </ul>
      <h3>Student Achievements</h3>
      <p>Our students regularly participate in various competitions and have won numerous awards in:</p>
      <ul>
        <li>National Science Fairs</li>
        <li>Mathematics Olympiads</li>
        <li>Sports Tournaments</li>
        <li>Art and Music Competitions</li>
      </ul>
      <h3>Student Testimonials</h3>
      <blockquote>
       <p> "Being a student at LBESS has been an amazing journey. The teachers are extremely supportive,
        and the environment encourages both academic excellence and personal growth." – Aisha, 10th Grade
</p>
        <p>"As a part of LBESS, it has been an amazing journey that I chose to be here. The teachers are extremely supportive,
        and the environment encourages both academic excellence and personal growth." – Dilasha, 9th Grade
</p>

        <p>"How great it feels to be supported, encouraged and pampered by the teachers. Here at Lord Buddha, teachers
            never only focus on course work but side by side they teach us life long practical lessons" – Esha, 10th Grade
</p>
      </blockquote>
      </section>
    </div>
  );
}

export default Students;
