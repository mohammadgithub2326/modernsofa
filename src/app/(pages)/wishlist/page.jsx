'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import styles from './wishlist.module.css';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState([]);
  
  const [loadingMessage, setLoadingMessage] = useState(''); // State for showing loading message
    
  const router = useRouter();

  // useEffect(()=>{
  //   const accessToken =  Cookies.get("accessToken")
  //   accessToken?"loading....":router.push("/Login")
  // },[]);
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const accessToken = Cookies.get('accessToken');
      const refreshToken = Cookies.get('refreshToken');

      if (!accessToken || !refreshToken) {
        setLoadingMessage(' you are  not logged in Redirecting to login page...'); // Set loading message
                setTimeout(() => {
                    router.push('/Login'); // Redirect after a short delay
                }, 3000);
                return;
      }

      try {
        const response = await axios.post('https://modernsofabk.onrender.com/api/v1/wishlist/getWishlist',null, {
        // const response = await axios.post('http://localhost:5000/api/v1/wishlist/getWishlist',null, {
            headers: {
                'Authorization': Cookies.get('accessToken'),
                'x-refresh-token': Cookies.get('refreshToken'),
              },
        });

        if (response.status === 200) {
            console.log(response)
          setWishlist(response.data.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setWishlist([]);
        }
      }
    };

    checkUserLoggedIn();
  }, [router]);

  const downloadWishlist = async () => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    const decodedToken = jwtDecode(accessToken)
        console.log(decodedToken)
        setUserId(decodedToken.userId)

    try {
        const response = await axios.post(
            'https://modernsofabk.onrender.com/api/v1/wishlist/downloadWishlist',
            // 'http://localhost:5000/api/v1/wishlist/downloadWishlist',
            { userId: userId }, // Replace with actual user ID if available
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'x-refresh-token': refreshToken,
                },
                responseType: 'blob', // Important for handling binary data
            }
        );

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${decodedToken.name}wishlist_${new Date().toISOString()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading wishlist PDF:', error);
    }
};

if (loadingMessage) {
  return <p className={styles.loadingMessage}>{loadingMessage}</p>;
}

  return (
    <div className={styles.container}>
      <h1>My Wishlist</h1>
      <button className={styles.downloadButton} onClick={downloadWishlist}>Download Wishlist</button>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className={styles.grid}>
          {wishlist?.map((product) => (
            <div className={styles.card} key={product.id}>
              <div className={styles.imageContainer}>
                <Image src={product.images[0]} alt={product.name} width={500} height={500} className={styles.sliderImage} />
              </div>
              <div className={styles.productInfo}>
                <span className={styles.productName}>{product.name}</span>
                <button className={styles.removeButton}>Remove from Wishlist</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
