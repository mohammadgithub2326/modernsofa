"use client"
import { useEffect, useState } from 'react';
import styles from './home.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
//home component
const Home = () => {
    const [products, setProducts] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState(false); // Replace with actual auth check
    const router = useRouter();
        //api call to get all products
    useEffect(() => {
        axios.get('https://modern-sofa.onrender.com/api/v1/products/getallproducts')
        .then(response => {
            setProducts(response.data.data);
            console.log(response.data.data); // This will log the products array
        })
        .catch(error => console.error('Error fetching products:', error));
}, []);

            //getting and decoding the token from cookies
            const accessToken = cookies.get("accessToken")
            accessToken?console.log(accessToken):console.log("no accessToken")
            
            const refreshToken =cookies.get("refreshToken")
            const decodedAccessToken = jwtDecode(accessToken)


        // function to add product to wishlist
    const handleIconClick = async (productId) => {
        if (!!accessToken) {
            // Replace `currentUserId` with actual user id
            const currentUserId = decodedAccessToken.userId;

            try {
                await axios.post('https://modern-sofa.onrender.com/api/v1/wishlist/addtowishlist', {
                    headers: {
                        'Content-Type': 'application/json',
                         'x-refresh-token':`bearer ${refreshToken}`,
                         'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ userId: currentUserId, productId }),
                });
                alert('Product added to wishlist!');
            } catch (error) {
                console.error('Error adding to wishlist:', error);
            }
        } else {
            refreshToken?console.log(refreshToken):console.log("no refreshToken")
            router.push('/login');
        }
    };
        //function for dynamic product 
    const handleProductClick = async(id) => {

        try {
            await axios.get("https://modern-sofa.onrender.com/api/v1/products/getproduct",{
                headers: {
                    'Content-Type': 'application/json',
                     'x-refresh-token':`bearer ${refreshToken}`,
                     'Authorization': `Bearer ${accessToken}`

                },
                body: JSON.stringify({ userId: currentUserId, id }),
            })
        } catch (error) {
            alert(error.message)
        }
                router.push(`/product/${id}`); 
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Username</h1>
            </header>
            <section className={styles.slider}>
                <h2>Latest Designs</h2>
                <div className={styles.sliderWrapper}>
                    <Image src="/modernsofa/public/imagaes/download_1_optimized_3.jpg" alt="Design 1" layout="fill" />
                    <Image src="/images/slider1.jpg" alt="Design 1" layout="fill" />
                    <Image src="/images/slider1.jpg" alt="Design 1" layout="fill" />
                    <Image src="/images/slider1.jpg" alt="Design 1" layout="fill" />
                    <Image src="/images/slider1.jpg" alt="Design 1" layout="fill" />
                    {/* Add more slider images as needed */}
                </div>
            </section>
            <section className={styles.productList}>
                {/* console.log(products) */}
                {products?.map(product => (
                    <div key={product._id} className={styles.productItem} onClick={() => handleProductClick(product._id)}>
                        <div className={styles.imageWrapper}>
                            <Image src={`/images/products/${product.image}`} alt={product.name} layout="fill" />
                            <button
                                className={styles.icon}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleIconClick(product.id);
                                }}
                            >
                                ❤️
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Home;
