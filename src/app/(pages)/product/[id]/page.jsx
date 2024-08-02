"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './product.module.css';
import cookies from "js-cookie"

const  ProductDetails = (props) => {
  const router = useRouter();
  alert("id is : "+ props.params.id)

  // // if (  router.isReady && router.query.id) {
    const { id } =props.params.id;
  //   // alert("router.isReady && router.query.id available");
    const refreshToken = cookies.get(refreshToken)
    const accessToken = cookies.get(accessToken)
    const [product, setProduct] = useState(null);

    useEffect(() => {
      if (id) {
        // Fetch product details based on the ID
        alert("product id is:" + id);
        axios.post(`https://modern-sofa.onrender.com/api/v1/products/getproduct/`,{
          headers:{
             'Content-Type': 'application/json',
             'x-refresh-token':`bearer ${refreshToken}`,
             'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({  productId:id }),
        })
          .then(response => response.json())
          .then(data => setProduct(data));
          alert(response.message + data)
      }
    }, [id]);
  // // }

  // console.log(router.query + router.isReady?true:false)

  // if (!router.isReady ||!product) return <div>Loading...🛰🛰🛰🌌🚩🚥🚦</div>;

  console.log(product)
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </div>
      <div className={styles.details}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.category}>Category: {product.category}</p>
      </div>
      <div className={styles.actions}>
        <button className={styles.button}>Add to Wishlist</button>
        <button className={styles.button}>Order Now</button>
      </div>
    </div>
  );
};

export default ProductDetails
