"use client"



import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './home.module.css';
import ProductGrid from '@/components/products grid/page';
import axios from 'axios';


// const convertImageToBase64 = (url) => {
//   console.log("entered the base64converter and these are the urls : "+ url)
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//       const reader = new FileReader();
//       reader.onloadend = function() {
//         resolve(reader.result);
//       };
//       reader.readAsDataURL(xhr.response);
//     };
//     xhr.onerror = function() {
//       reject('Image conversion failed');
//     };
//     xhr.open('GET', url, true);
//     xhr.responseType = 'blob';
//     xhr.send();
//   });
// };


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    axios.get("https://modernsofabk.onrender.com/api/v1/active/ready")
  
  }, [])
  

  const goToProductDetails = (productId) => {
    const id =productId
    router.push(`/product/${id}`);
    console.log("Current Path:", usePathname);
  };
//   if (!user) {
//     return (
//       <div className={styles.sessionExpired}>
//         <p>Your session has ended. Please log in again.</p>
//         <a href="/login" className={styles.loginLink}>Login</a>
//       </div>
//     );
//   }
let url;
console.log("Current Path:", pathname);
  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>Welcome to Modern Sofa, {username}</h1>

      <div className={styles.slider}>
        { /* Add your slider logic here */ }
        <img src="/download (1).jpeg" alt="Latest" className={styles.sliderImage} />
        <img src="/download.jpeg" alt="Latest" className={styles.sliderImage} />
      </div>

        <ProductGrid />
            </div>
  );
};

export default HomePage;
