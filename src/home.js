import React from "react";
import './home.css'; 
import SearchComponent from './search';
import schoolimage from './images/schoolimage.jpg';
import RecentImages from "./RecentImages.js";

function Home() {
  return (
    <>
 
<img src={schoolimage} alt="School" className="school-image" />
 <section className="section" id= "admission">
                <div className="box-main">
                
                    <div className="firstHalf">
                        <h1 className="text-big">
                            Do you really wanna get admission in LordBuddha?
                        </h1>
                        <p className="text-small">
                            Our school welcomes applications from students who are eager to 
                            learn and grow in a supportive and academically enriching environment. 
                            Admission is granted based on a review of the student’s previous academic 
                            performance, age eligibility, and availability of seats in the desired grade 
                            level. Parents are required to submit a completed application form along 
                            with necessary documents such as birth certificate, previous school reports, 
                            and identification. Depending on the grade, students may be invited to 
                            participate in an entrance test and/or a personal interview. We also consider 
                            recommendations and special achievements where applicable. Admission 
                            decisions are made in the best interest of the student and the school 
                            community. We encourage all prospective families to visit the school, 
                            meet with our staff, and experience the learning environment firsthand 
                            before applying.
                        </p>
                    </div>
                </div>
            </section>
            <section className="section" id="latest">
                <div className="box-main">
                    <div className="secondHalf">
                        <h1 className="text-big">
                            Latest
                        </h1>
                        <p className="text-small">
                            Stay up-to-date with the latest happenings at LBESS! This section provides important 
                            updates regarding upcoming events, school holidays, exam schedules, and special 
                            announcements. Whether it's new academic programs, extracurricular activities, 
                            or achievements of our students, we ensure that our community is always in the loop. 
                            Be sure to check here regularly to stay informed and engaged with everything happening 
                            at our school.
                        </p>
                    </div>
                </div>
            </section>
            <section className="section" id="testimonial">
                    <div className="secondHalf">
                        <h1 className="text-big">
                            Testimonial
                        </h1>
                        <p className="text-small">
                            What Our Students and Parents Say?
                            "Choosing LBESS has been one of the best decisions for our family. 
                            The dedicated faculty and personalized attention my child receives 
                            have helped them not only excel academically but also grow as a confident 
                            and compassionate individual. The school's focus on nurturing both 
                            intellectual and emotional development has made a lasting impact. 
                            We are proud to be part of such a supportive and thriving community." – Emily, Parent of a 7th Grader
                        </p>
                         <RecentImages />
                    </div>
            </section>
            </>
  );
}

export default Home;