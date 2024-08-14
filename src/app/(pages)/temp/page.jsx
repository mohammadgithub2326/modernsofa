"use client"

import React, { useState, useEffect } from 'react';
const ProductImage = () => {
  const [base64Image, setBase64Image] = useState(null);
   const imageUrl = "https://drive.google.com/uc?export=view&id=1Ez2Rog8_SfqTE6wEjGIowirKWL66Q0iQ"
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const base64 = await convertImageToBase64(imageUrl);
        setBase64Image(base64);
      } catch (error) {
        console.error('Error converting image to Base64:', error);
      }
    };
    const convertImageToBase64 = (url) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            const reader = new FileReader();
            reader.onloadend = function() {
              resolve(reader.result);
            };
            reader.readAsDataURL(xhr.response);
          };
          xhr.onerror = function() {
            reject('Image conversion failed');
          };
          xhr.open('GET', url, true);
          xhr.responseType = 'blob';
          xhr.send();
        });
      };
      

    fetchImage();
  }, [imageUrl]);

  return (
    <div >
      {base64Image ? (
        <img src={base64Image} alt="Product"  />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ProductImage;
