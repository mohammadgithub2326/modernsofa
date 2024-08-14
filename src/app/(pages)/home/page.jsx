"use client"



import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';
import ProductGrid from '@/components/products grid/page';


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
  const router = useRouter();

  // useEffect(() => {
  //   const accessToken = Cookies.get('accessToken');
    
  //   if (!accessToken) {
  //       return (
  //           <div className={styles.sessionExpired}>
  //             <p>Your session has ended. Please log in again.</p>
  //             <a href="/login" className={styles.loginLink}>Login</a>
  //           </div>
  //         );
  //   }

  //   // Decode JWT to get the username (simplified)
  //   const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
  //   setUsername(decodedToken.userName);

  //   // Fetch all products
  //   axios.get('http://localhost:5000/api/v1/products/getallproducts', {
  //     headers: { Authorization: `Bearer ${accessToken}` }
  //   })
  //   .then(response => setProducts(response.data.data))
  //   .catch(error => console.error(error));
  // }, [router]);
  // console.log(products)

  // const addToWishlist = (productId) => {
  //   const accessToken = Cookies.get('accessToken');
  //   const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
  //   console.log(decodedToken)
  //   const userId = decodedToken.id;
  //   console.log(userId)
  //   const userName = decodedToken.name;

  //   axios.post('http://localhost:5000/api/v1/wishlist/addtowishlist', {
  //     userId,
  //     productId
  //   }, {
  //     headers: { Authorization: `Bearer ${accessToken}` }
  //   })
  //   .then(() => alert('Product added to wishlist!'))
  //   .catch(error => console.error(error));
  // };

  const goToProductDetails = (productId) => {
    const id =productId
    router.push(`/product/${id}`);
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
