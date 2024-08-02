"use client"
import { useState } from 'react';
import axios from 'axios';
import styles from './addproduct.module.css';
import {getJwtTokenFromCookie,decodeToken} from "@/services/jwt"

const AddProduct = () => {
  const [productDescription, setProductDescription] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState(null);

  const categories = [
    " Recliner sofa Manual,RRR,Motorized",
            'L shape sofa set',
            'Launcher sofa',
            'Cum bed sofa',
            '3+1+1 sofa',
            'Wing chair',
            'T pie and stool',
            'Bed dashboards',
            'Dining set table and chairs',
            'Bed cushions'
  ];

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getJwtTokenFromCookie();
    const decodedToken = decodeToken(token);
    const addedBy = decodedToken.userId;

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
  };

    const imagePromises = Array.from(images).map(image => convertToBase64(image));
    const imageBase64 = await Promise.all(imagePromises);

    const payload = {
      addedBy,
      productDescription,
      category,
      images: imageBase64
    };

    // formData.forEach((value, key) => {
    //   if(key ===images){
    //     images.forEach(image => {
    //       console.log(" these are the images "+image)
    //     });
    //   }
    //   console.log(key + ': ' + value);
    // });

    //   console.log("this is a formdata " + formData.productDescription)
    try { 
      const response = await axios.post('https://modern-sofa.onrender.com/api/v1/products/add', payload, {
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Product Description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.select}
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Images</label>
          <div className={styles.imageUpload}>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className={styles.fileInput}
              required
            />
            <span className={styles.placeholder}>upload product images</span>
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
