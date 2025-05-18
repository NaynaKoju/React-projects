import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import recent1 from "./images/recent1.jpg";
import recent2 from "./images/recent2.jpg";
import recent3 from "./images/recent3.jpg";
import recent4 from "./images/recent4.jpg";
import recent5 from "./images/recent5.jpg";
import recent6 from "./images/recent6.jpg";
import recent7 from "./images/recent7.jpg";
import "./home.css"

const RecentImages = () => {
  const settings = {
    dots: true,
    arrows:true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const images = [recent1, recent2, recent3, recent4, recent5, recent6, recent7];

  return (
    <div className="recentimg">
      <h2 >Recent Highlights</h2>
      <Slider {...settings}>
        {images.map((imgSrc, idx) => (
          <div key={idx}>
            <img
              src={imgSrc}
              alt={`Recent ${idx + 1}`}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecentImages;
