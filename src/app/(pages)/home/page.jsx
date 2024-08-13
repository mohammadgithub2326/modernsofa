"use client"
// import { useEffect, useState } from 'react';
// import styles from './home.module.css';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import axios from 'axios';
// import cookies from "js-cookie";
// import { jwtDecode } from 'jwt-decode';
// import Slider from '@/components/Homepage';
// //home component
// const Home = () => {
//     const [products, setProducts] = useState([]);
//     const [userLoggedIn, setUserLoggedIn] = useState(false); // Replace with actual auth check
//     const router = useRouter();
//         //api call to get all products
//     useEffect(() => {
//         axios.get('http://localhost:5000/api/v1/products/getallproducts')
//         .then(response => {
//             setProducts(response.data.data);
//             console.log(response.data.data); // This will log the products array
//         })
//         .catch(error => console.error('Error fetching products:', error));
// }, []);

//             //getting and decoding the token from cookies
//             const accessToken = cookies.get("accessToken")
//             accessToken?console.log(`${accessToken} "this is a access token"`):console.log("no accessToken")
            
//             const refreshToken =cookies.get("refreshToken")
//             console.log(`${refreshToken} this is a refreshToken`)
//             const decodedAccessToken = jwtDecode(accessToken)
//             const currentUserId = decodedAccessToken.userId;
//             console.log(decodedAccessToken)


//         // function to add product to wishlist
//     const handleIconClick = async (productId) => {
//         if (!!accessToken) {
//             // Replace `currentUserId` with actual user id

//             try {
//                 await axios.post('https://modern-sofa.onrender.com/api/v1/wishlist/addtowishlist', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                          'x-refresh-token':`bearer ${refreshToken}`,
//                          'Authorization': `Bearer ${accessToken}`
//                     },
//                     body: JSON.stringify({ userId: currentUserId, productId }),
//                 });
//                 alert('Product added to wishlist!');
//             } catch (error) {
//                 console.error('Error adding to wishlist:', error);
//             }
//         } else {
//             refreshToken?console.log(refreshToken):console.log("no refreshToken")
//             router.push('/login');
//         }
//     };
//         //function for dynamic product 
//     const handleProductClick = async(id) => {

//         try {
//             // await axios.get("https://modern-sofa.onrender.com/api/v1/products/getproduct"
//             await axios.get("http://localhost:5000/api/v1/products/getproduct"
//             ,{
//                 headers: {
//                     'Content-Type': 'application/json',
//                      'x-refresh-token':`bearer ${refreshToken}`,
//                      'Authorization': `Bearer ${accessToken}`

//                 },
//                 body: JSON.stringify({ userId: currentUserId, id }),
//             })
//         } catch (error) {
//             console.log(error.message)
//         }
//                 router.push(`/product/${id}`); 
//     };

//     return (
//         <div className={styles.container}>
//             <header className={styles.header}>
//                 <h5> Wellcome  to modern Sofa <h2>{decodedAccessToken.userName}</h2></h5>
//             </header>
//                  <Slider/>
//             <section className={styles.slider}>
//             </section>
//             <section className={styles.productList}>
//                 {/* console.log(products) */}
//                 {products?.map(product => (
//                     <div key={product._id} className={styles.productItem} onClick={() => handleProductClick(product._id)}>
//                         <div className={styles.imageWrapper}>
//                             <Image src={`/images/products/${product.image}`} alt={product.name} layout="fill" />
//                             <button
//                                 className={styles.icon}
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleIconClick(product.id);
//                                 }}
//                             >
//                                 ❤️
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </section>
//         </div>
//     );
// };

// export default Home;
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import cookies from 'js-cookie';
// import Slider from "react-slick";
// import jwt_decode from "jwt-decode";
// import styles from './home.module.css';

// const HomePage = () => {
//   const [products, setProducts] = useState([]);
//   const [username, setUsername] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/v1/products/getallproducts');
//         const data = await response.json();
//         setProducts(data.products); // Assuming the API response has a 'products' array
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     // const token = cookies({ req: null }).accessToken; // Access token from cookies
//     const token = cookies.get("accessToken")

//     if (!token) {
//       router.push('/login'); // Redirect to login if no token
//     } else {
//       const decodedToken = jwt_decode.default(token);
//       setUsername(decodedToken.username); // Assuming the token has a 'username' claim
//       fetchProducts();
//     }
//   }, []);

//   const handleAddToWishlist = async (productId) => {
//     try {
//       const token = cookies({ req: null }).accessToken;
//       const decodedToken = jwt_decode(token);
//       const userId = decodedToken.userId; // Assuming the token has a 'userId' claim

//       const response = await fetch('http://localhost:5000/api/v1/wishlist/addtowishlist', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId, productId }),
//       });

//       if (response.ok) {
//         console.log('Product added to wishlist');
//       } else {
//         console.error('Error adding product to wishlist');
//       }
//     } catch (error) {
//       console.error('Error adding product to wishlist:', error);
//     }
//   };

//   const handleProductClick = (productId) => {
//     router.push(`/products/${productId}`);
//   };

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.welcome}>
//         <h1>Welcome to Modern Sofa, {username}!</h1>
//       </div>

//       <Slider {...sliderSettings} className={styles.slider}>
//         {/* Latest images would go here */}
//         <div>
//           <img src="/imagaes/download_2_optimized_4.jpg" alt="Latest 1" className={styles.sliderImage} />
//         </div>
//         <div>
//           <img src="/imagaes/download_2_optimized_4.jpg" alt="Latest 2" className={styles.sliderImage} />
//         </div>
//         {/* ... more images */}
//       </Slider>

//       <div className={styles.productsGrid}>
//         {products.map((product) => (
//           <div key={product.id} className={styles.productCard} onClick={() => handleProductClick(product.id)}>
//             {/* Product image slider */}
//             <Slider {...sliderSettings} className={styles.productImageSlider}>
//               {product.images.map((image, index) => (
//                 <div key={index}>
//                   <img src={image} alt={product.name} className={styles.productImage} />
//                 </div>
//               ))}
//             </Slider>

//             <div className={styles.cardBottom}>
//               <button className={styles.wishlistButton} onClick={() => handleAddToWishlist(product.id)}>
//                 {/* Wishlist icon */}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;


import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './home.module.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    
    if (!accessToken) {
        return (
            <div className={styles.sessionExpired}>
              <p>Your session has ended. Please log in again.</p>
              <a href="/login" className={styles.loginLink}>Login</a>
            </div>
          );
    }

    // Decode JWT to get the username (simplified)
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
    setUsername(decodedToken.userName);

    // Fetch all products
    axios.get('http://localhost:5000/api/v1/products/getallproducts', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(response => setProducts(response.data.data))
    .catch(error => console.error(error));
  }, [router]);
  console.log(products)

  const addToWishlist = (productId) => {
    const accessToken = Cookies.get('accessToken');
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
    console.log(decodedToken)
    const userId = decodedToken.id;
    console.log(userId)
    const userName = decodedToken.name;

    axios.post('http://localhost:5000/api/v1/wishlist/addtowishlist', {
      userId,
      productId
    }, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(() => alert('Product added to wishlist!'))
    .catch(error => console.error(error));
  };

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


  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>Welcome to Modern Sofa, {username}</h1>

      <div className={styles.slider}>
        { /* Add your slider logic here */ }
        <img src="https://drive.google.com/uc?id=1Ez2Rog8_SfqTE6wEjGIowirKWL66Q0iQ" alt="Latest" className={styles.sliderImage} />
        <img src="/download.jpeg" alt="Latest" className={styles.sliderImage} />
      </div>

      <div className={styles.productGrid}>
        {products.map(product => (
          <div key={product._id} className={styles.productCard} onClick={() => goToProductDetails(product._id)}>
            <div className={styles.imageSlider}>
              
              {product.images.map((img, index) => ( <React.Fragment key={index}>
            {console.log(`Image URL: ${img}`)}
            <img src="https://drive.google.com/uc?id=1Ez2Rog8_SfqTE6wEjGIowirKWL66Q0iQ" alt={product.name} className={styles.productImage} />
          </React.Fragment>
              ))}
            </div>
            <div className={styles.icon} onClick={(e) => { e.stopPropagation(); addToWishlist(product._id); }}>
              {/* <img src="/static/heart-icon.png" alt="Add to wishlist" /> */}
              ❤️
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
