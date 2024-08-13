"use client"
import React, { useEffect, useState } from 'react';
import styles from './product.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const ProductDetails = ( props ) => {
  const {id} = props.params
  const router = useRouter();
  // const {id} = router.query
  console.log(props

  )
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      
      try {
        console.log('Fetching access and refresh tokens from cookies...');
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);

        console.log('Making request to fetch product details...');
        const response = await axios.post(
          'http://localhost:5000/api/v1/products/getproduct',
          { productId:id },
          console.log(id),

          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'x-refresh-token': refreshToken,
            },
          }
        );
        console.log('Response received:', response);

        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToWishlist = () => {
    try {
      console.log('Handling add to wishlist...');
      const accessToken = Cookies.get('accessToken');
      const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
      const userId = decodedToken.id;
      console.log('User ID:', userId);

      // Add product to wishlist logic (mocked)
      console.log(`Product ${product?.productDescription} added to wishlist for user ${userId}`);
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }
  console.log(product)

  return (
    <div className={styles.productDetails}>
      <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h2 className={styles.productName}>{product.name}</h2>
        <p className={styles.productDescription}>{product.productDescription}</p>
        <p className={styles.productCategory}>Category: {product.category}</p>
        <button className={styles.wishlistButton} onClick={handleAddToWishlist}>
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
