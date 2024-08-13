import { useState, useEffect } from 'react';
import Image from 'next/image';

const styles = {
  slider: {
    width: '100%',
    textAlign: 'center',
    marginBottom: '20px',
  },
  sliderWrapper: {
    position: 'relative',
    width: '100%',
    height: '300px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure images cover the entire container
    position: 'absolute',
    top: 0,
    left: 0,
    transition: 'opacity 0.5s ease', // Add smooth fade transition
  },

};

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/imagaes/download_1_optimized_3.jpg',
    '/imagaes/download_2_optimized_4.jpg',
    '/imagaes/download_3_optimized_5.jpg',
    // ... add more image paths
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [images.length]);

  return (
    <section className={styles.slider}>
      <h2>Latest Designs</h2>
      <div className={styles.sliderWrapper}>
        {images.map((image, index) => (
          <Image
          key={index}
          src={image}
          alt={`Design ${index + 1}`}
          width={1000} // Adjust as needed to match your desired slider size
          height={500} // Maintain the aspect ratio of your original images
          style={{ ...styles.image, opacity: index === currentIndex ? 1 : 0 }}
        />
        ))}
      </div>
    </section>
  );
};

export default Slider;
