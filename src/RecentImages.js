import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./home.css"; 

const sliderSettings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true
};

const RecentImages = ({ images }) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    console.warn("No images provided to RecentImages slider.");
    return <div className="recentimg"><h2>No recent images available.</h2></div>;
  }

  return (
    <div className="recentimg">
      <h2>Recent Highlights</h2>
      <Slider {...sliderSettings}>
        {images.map((url, index) => {
          const fullUrl = url.startsWith("http")
            ? url
            : `http://localhost:3004${url}`;

          return (
            <div key={index}>
              <img
                src={fullUrl}
                alt={`recent-${index}`}
                className="recent-img-slide"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default RecentImages;
