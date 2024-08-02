"use client"
import { useState } from 'react';
import styles from './updataproduct.module.css';
import axios from 'axios';


const UpdateProduct = () => {
  const [payload, setPayload] = useState({
    productDescription: '',
    category: '',
    images: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://modern-sofa.onrender.com/api/v1/products/update', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Product updated successfully!');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert('An error occurred while updating the product.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Update Product</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
         {/* <label>
          Updated By:
          <input type="text" name="updatedBy" value={payload.updatedBy} onChange={handleChange} required />
        </label>
        <label>
          Product ID:
          <input type="text" name="productId" value={payload.productId} onChange={handleChange} required />
        </label> */}
        <label className={styles.label}>
          Product Description:
          <textarea   className={styles.textarea} name="productDescription" value={payload.productDescription} onChange={handleChange} />
        </label> 
        <label  className={styles.label}>
          Category:
          <input   className={styles.input} type="text" name="category" value={payload.category} onChange={handleChange} />
        </label>
        <label  className={styles.label}>
          Images (Base64):
          <input  className={styles.input} type="image" name="images" value={payload.images} onChange={handleChange} />
        </label>
        <button  className={styles.button} type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
