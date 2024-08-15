/// src/components/ImageSlider.js
import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const images = [
  'https://littlelightproject.s3.amazonaws.com/cover8.jpg',
  'https://littlelightproject.s3.amazonaws.com/cover18.webp',
  'https://littlelightproject.s3.amazonaws.com/cover23.jpg'
//   '/images/cover19.webp'
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="image-slider">
      <button className="prev" onClick={prevSlide}>&#10094;</button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      <button className="next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default ImageSlider;
