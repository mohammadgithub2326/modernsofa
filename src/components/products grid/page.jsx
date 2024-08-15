import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './productsgrid.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    axios.get('https://modern-sofa-backend.onrender.com/api/v1/products/getallproducts')
      .then((response) => {
        console.log(response)
        setProducts(response.data.data);
      })
      .catch((error) => {
        alert(response.message)
        console.log('Error fetching products:', error);
      });
  }, []);

  const convertAndUseDriveUrl = (url) => {
    const id = url.split('id=')[1];
    return `https://drive.google.com/uc?export=view&id=${id}`;
  };

  const handleWishlistClick = (productId) => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if (!accessToken || !refreshToken) {
      router.push('/login?message=Please login to add to wishlist');
      return;
    }

    axios.post('https://modern-sofa-backend.onrender.com/api/v1/wishlist/add', { productId }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(() => {
      alert('Product added to wishlist');
    })
    .catch(() => {
      alert('Failed to add to wishlist');
    });
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  const filteredProducts = searchQuery 
    ? products.filter(product => 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className={styles.container}>
      <input 
        type="text" 
        placeholder="Search products..." 
        className={styles.searchBar} 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className={styles.grid}>
        {filteredProducts?.map(product => (
          <div 
            key={product._id} 
            className={styles.card} 
            onClick={() => handleProductClick(product._id)}
          >
            <ImageSlider 
              images={product.images.map(url => convertAndUseDriveUrl(url))} 
            />
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <button 
                className={styles.wishlistIcon} 
                onClick={(e) => { 
                  e.stopPropagation();
                  handleWishlistClick(product._id);
                }}
              >
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // change image every 3 seconds

    return () => clearInterval(interval); // clean up on unmount
  }, [images.length]);

  return (
    <div className={styles.slider}>
    <div 
      className={styles.sliderInner} 
      style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
    >
      {images.map((image, index) => (
        <div key={index} className={styles.sliderImage}>
          <Image 
            src={image} 
            alt={`Product Image ${index + 1}`} 
            layout="fill" 
            objectFit="cover" 
          />
        </div>
      ))}
    </div>
  </div>
  );
};

export default ProductGrid;
