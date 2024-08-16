"use client"
// import { useState } from 'react';
// import axios from 'axios';
// import styles from './addproduct.module.css';
// import {getJwtTokenFromCookie,decodeToken} from "@/services/jwt"

// const AddProduct = () => {
//   const [productDescription, setProductDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [images, setImages] = useState(null);

//   const categories = [
//     " Recliner sofa Manual,RRR,Motorized",
//             'L shape sofa set',
//             'Launcher sofa',
//             'Cum bed sofa',
//             '3+1+1 sofa',
//             'Wing chair',
//             'T pie and stool',
//             'Bed dashboards',
//             'Dining set table and chairs',
//             'Bed cushions'
//   ];

//   const handleImageChange = (e) => {
//     setImages(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = getJwtTokenFromCookie();
//     const decodedToken = decodeToken(token);
//     const addedBy = decodedToken.userId;

//     const convertToBase64 = (file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//     });
//   };

//     const imagePromises = Array.from(images).map(image => convertToBase64(image));
//     const imageBase64 = await Promise.all(imagePromises);

//     const payload = {
//       addedBy,
//       productDescription,
//       category,
//       images: imageBase64
//     };

//     // formData.forEach((value, key) => {
//     //   if(key ===images){
//     //     images.forEach(image => {
//     //       console.log(" these are the images "+image)
//     //     });
//     //   }
//     //   console.log(key + ': ' + value);
//     // });

//     //   console.log("this is a formdata " + formData.productDescription)
//     try { 
//       const response = await axios.post('https://modern-sofa.onrender.com/api/v1/products/add', payload, {
//         headers: {
//           // 'Content-Type': 'application/json',
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       alert(response.data.message);
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.formGroup}>
//           <label className={styles.label}>Product Description</label>
//           <textarea
//             value={productDescription}
//             onChange={(e) => setProductDescription(e.target.value)}
//             className={styles.textarea}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label className={styles.label}>Category</label>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className={styles.select}
//             required
//           >
//             <option value="" disabled>Select a category</option>
//             {categories.map((cat, index) => (
//               <option key={index} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>
//         <div className={styles.formGroup}>
//           <label className={styles.label}>Images</label>
//           <div className={styles.imageUpload}>
//             <input
//               type="file"
//               multiple
//               onChange={handleImageChange}
//               className={styles.fileInput}
//               required
//             />
//             <span className={styles.placeholder}>upload product images</span>
//           </div>
//         </div>
//         <button type="submit" className={styles.submitButton}>Add Product</button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
import React, { useState, useEffect } from 'react';
import styles from './addproduct.module.css';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// console.log(jwtDecode)
const AddProductPage = () => {
  // console.log(jwtDecode)
    const [userType, setUserType] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState([]);
    const [addedBy,setAddedBy]=useState('')
    const [message,setmessage]=useState("")
    const router = useRouter()

    const categories = [
        'Bed cushions', 'Dining set table and chairs', 'Dining', 
        'Bed dashboards', 'T pie and stool', 'Wing chair', 
        '3+1+1 sofa', 'Cum bed sofa', 'Recliner sofa manual rrr motorized', 
        'Launcher sofa'
    ];

    useEffect(() => {
       typeof window !== 'undefined'?console.log(true):   console.log(false)
        const token = Cookies.get('accessToken');
        if (token) {
            const decoded = jwtDecode(token);
            console.log(decoded)
            setAddedBy(decoded.userId)
            setUserType(decoded.type);
            if (decoded.type !== 'owner') {
                alert('Customers are not allowed to add products');
                window.location.href = '/';

            }
        }
        
    }, []);
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    console.log(accessToken,refreshToken)
    


    const handleImageChange = (input) => {
        const files = Array.from(input.files || input.items);
        const validFiles = files.map(file => {
            if (file.getAsFile) {
                return file.getAsFile(); // for drag and drop
            }
            return file;
        }).filter(Boolean); // Remove undefined entries
    
        setImages((prevImages) => [...prevImages, ...validFiles]);
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // const imagePaths = images.map((image) => URL.createObjectURL(image));

    //     const productData = {
    //         name: productName,
    //         description: description,
    //         category: category,
    //         images: images,
    //         addedBy:addedBy
    //     };

    //     try {
    //       console.log(accessToken)
    //         await axios.post('http://localhost:5000/api/v1/products/addproduct', productData, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${accessToken}`,
    //                 'x-refresh-token': `Bearer ${refreshToken}`
    //             },
    //           });
    //         alert('Product added successfully');
    //     } catch (error) {
    //         console.error(error);
    //         alert('Failed to add product');
    //     }
    //     console.log(productData)
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('addedBy', addedBy);
    
        // Append image files to FormData
        images.forEach((image) => {
            formData.append('images', image);
        });
    
        try {
            // await axios.post('http://localhost:5000/api/v1/products/addproduct', formData, {
            await axios.post('https://modernsofabackend.onrender.com/api/v1/products/addproduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                    'x-refresh-token': refreshToken
                },
            });
        
            alert('Product added successfully');
            
            setmessage("Product added successfully")
           
        } catch (error) {
            console.error(error);
            alert('Failed to add product');
            setmessage("failed to add product : " + error)
        }
        console.log(formData)
    };
    

    if (userType !== 'owner') return "you are not a Owner to addproduct";

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Add New Product</h1>
            {message && <p className={styles.message}>{message}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label className={styles.label}>Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className={styles.input}
                        required
                        placeholder='Enter product name '
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.textarea}
                        placeholder="Enter details of product like  cloths  details, price per seat,  cusion details"
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={styles.select}
                        required
                    >
                        <option value="" disabled>Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Images</label>
                    <div
        className={styles.dropzone}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
            e.preventDefault();
            handleImageChange(e.dataTransfer); // Handle images dropped
        }}
        onClick={() => document.getElementById('imageInput').click()} // Trigger file input on click
    >
        <input
            id="imageInput"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageChange(e.target)} // Handle images selected via click
            className={styles.fileInput}
            style={{ display: 'none' }} // Hide the default file input
        />
        {images.length === 0 && (
            <p className={styles.placeholder}>
                Click or drop images here
            </p>
        )}
    </div>
                    <div className={styles.imagePreview}>
                        {images.map((image, index) => (
                            <div key={index} className={styles.imageContainer}>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Product Preview"
                                    className={styles.image}
                                />
                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className={styles.submitButton}>Add Product</button>

            </form>
        </div>
    );
};

export default AddProductPage;
