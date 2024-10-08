"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './product.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaInstagram, FaFacebook, FaEnvelope, FaWhatsapp, FaPhone } from 'react-icons/fa';
import {decodeToken} from "@/services/jwt"

import { useLoading } from '../../../../context/loadingContext';

const ProductDetails = (props) => {
  const { id } = props.params;
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    console.log("Current Path:", usePathname);
    const fetchProductDetails = async () => {
      startLoading();
      try {
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');
        const response = await axios.post(
          'https://modernsofabk.onrender.com/api/v1/products/getproduct',
          // 'http://localhost:5000/api/v1/products/getproduct',
          { productId: id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'x-refresh-token': refreshToken,
            },
          }
        );
        stopLoading();
        setProduct(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, [id]);

  const convertImageUrl = (url) => {
    const id = url.split('id=')[1];
    return `https://drive.google.com/uc?export=view&id=${id}`;
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleAddToWishlist = () => {
    try {
      const accessToken = Cookies.get('accessToken');
      console.log(accessToken)
      const decodedToken = decodeToken(accessToken)
      const userId = decodedToken.userId;
      console.log(userId)
      const productId = id
      // API call to add to wishlist

      startLoading();
      // axios.post('http://localhost:5000/api/v1/wishlist/addtowishlist', {
      axios.post('https://modernsofabk.onrender.com/api/v1/wishlist/addtowishlist', {
            userId,
            productId
          }, {
            headers: { Authorization: `Bearer ${accessToken}` }
          })
          stopLoading()
          .then(() => {alert('Product added to wishlist!')})
          .catch(error => console.log(error));
      console.log(`Product ${id} ${product?.name} added to wishlist for user ${userId}`);
    } catch (error) {
      console.log('Error adding product to wishlist:', error);
      alert("error adding product to wishlist please wait")
        // alert("problem adding the product to wishlist :" + error)  
      setTimeout(() => {
        router.push("/Login");
      }, 5000);
    }
  };

  const handleOrderProduct = () => {
    try {
      const accessToken = Cookies.get('accessToken');
      console.log(accessToken)
      const decodedToken = decodeToken(accessToken)
      const userId = decodedToken.userId;
      console.log(userId)
      const productId = id
      // API call to order 
      startLoading();
      // axios.post('http://localhost:5000/api/v1/orders/create', {
      axios.post('https://modernsofabk.onrender.com/api/v1/orders/create', {
            userId,
            productId
          }, {
            headers: { Authorization: accessToken }
          }) 
          .then((response) => {
            alert(response.data.message)
            stopLoading();
          }
          )
          .catch(error => console.log(error));
      console.log(`Product ${id} ${product?.name} ordered  for user ${userId}`);
      stopLoading()
    } catch (error) {
      console.log(error)
    }
  };

  const handleContactUs = () => {
    // Logic for showing contact popup or redirecting to contact links
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.productDetails}>
      <h2 className={styles.productName}>{product.name}</h2>
      <div className={styles.imageSlider}>
        <FaArrowLeft className={styles.arrow} onClick={handlePrevImage} />
        <Image
          src={convertImageUrl(product.images[currentImageIndex])}
          width={500}
          height={300}
          alt={product.name}
          className={styles.productImage}
        />
        <FaArrowRight className={styles.arrow} onClick={handleNextImage} />
      </div>
      <div className={styles.imagePreviews}>
        {product.images.map((img, index) => (
          <Image
            key={index}
            src={convertImageUrl(img)}
            width={100}
            height={60}
            alt={`${product.name} preview ${index + 1}`}
            className={`${styles.previewImage} ${index === currentImageIndex ? styles.activePreview : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
      <div className={styles.productInfo}>
        <p className={styles.productCategory}>Category: {product.category}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <div className={styles.actionButtons}>
          <button className={styles.wishlistButton} onClick={handleAddToWishlist}>Add to Wishlist</button>
          <button className={styles.orderButton} onClick={handleOrderProduct}>Order This Product</button>
          {/* <button className={styles.contactButton} onClick={handleContactUs}>Contact Us</button> */}
        </div>
      </div>
      <div className={styles.contactIcons}>
        <a href="https://instagram.com"><FaInstagram /></a>
        <a href="https://facebook.com"><FaFacebook /></a>
        <a href="mailto:mohdarif65420@gmail.com"><FaEnvelope /></a>
        <a href="https://wa.me/+918077557130"><FaWhatsapp /></a>
        <a href="tel:8077557130"><FaPhone /></a>
      </div>
      <footer className={styles.footer}>
        <p>Developed by Mohammad Noor</p>
      </footer>
    </div>
  );
};

export default ProductDetails;
