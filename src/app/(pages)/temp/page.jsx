'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHeart, FaBoxOpen, FaUser, FaPlusSquare } from 'react-icons/fa';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import styles from './temp.module.css';

const Navbar = () => {
  
  
  return (
    
  <>
  
  <div className={styles.glassContainer}>
      <h1 className={styles.glassTitle}>Elegant Glass Designs</h1>
      <div className={styles.glassCard}>
        <img src="/download.jpeg" alt="Glass Design" />
        <p className={styles.glassDescription}>Beautiful frosted glass work for your home decor.</p>
      </div>
    </div>


    <div className={styles.neuContainer}>
      <h1 className={styles.neuTitle}>Modern Glass Designs</h1>
      <div className={styles.neuCard}>
        <img src="/download.jpeg" alt="Glass Design" className={styles.neuImage} />
        <p className={styles.neuDescription}>Sleek and stylish glass work for your home decor.</p>
      </div>
    </div>

    <div className={styles.materialContainer}>
      <h1 className={styles.materialTitle}>Stylish Glass Designs</h1>
      <div className={styles.materialCard}>
        <img src="/download.jpeg" alt="Glass Design" className={styles.materialImage} />
        <p className={styles.materialDescription}>Bold and elegant glass work for your home decor.</p>
      </div>
    </div>

    <div className={styles.minimalContainer}>
      <h1 className={styles.minimalTitle}>Timeless Glass Designs</h1>
      <div className={styles.minimalCard}>
        <img src="/download.jpeg" alt="Glass Design" className={styles.minimalImage} />
        <p className={styles.minimalDescription}>Simple and elegant glass work for your home decor.</p>
      </div>
    </div>

    <div className={styles.retroContainer}>
      <h1 className={styles.retroTitle}>Futuristic Glass Designs</h1>
      <div className={styles.retroCard}>
        <img src="/download.jpeg" alt="Glass Design" className={styles.retroImage} />
        <p className={styles.retroDescription}>Bold and vibrant glass work for your home decor.</p>
      </div>
    </div>
</>
     
  );
};

export default Navbar;
