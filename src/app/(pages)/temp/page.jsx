'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHeart, FaBoxOpen, FaUser, FaPlusSquare } from 'react-icons/fa';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import styles from './temp.module.css';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      setUserName(decodedToken.name);
      setUserType(decodedToken.type);
    }
  }, []);

  const handleRedirect = (path) => {
    router.push(path);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brandName}>Modern Sofa</div>
      <div className={styles.welcomeNote}>
        {userName ? `Welcome, ${userName}` : 'Welcome'}
      </div>
      <div className={styles.icons}>
        <FaHeart className={styles.icon} onClick={() => handleRedirect('/wishlist')} />
        <FaBoxOpen className={styles.icon} onClick={() => handleRedirect('/orders')} />
        <FaUser className={styles.icon} onClick={() => handleRedirect('/profile')} />
        {userType === 'owner' && (
          <FaPlusSquare className={styles.icon} onClick={() => handleRedirect('/add-product')} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
