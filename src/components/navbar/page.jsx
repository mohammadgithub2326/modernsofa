import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHeart, FaBoxOpen, FaUser, FaPlusSquare, FaSignInAlt, FaHome } from 'react-icons/fa';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');
  const [logged_In,setLogged_In] = useState(Boolean)

  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      setUserName(decodedToken.name);
      setUserType(decodedToken.type);
      setLogged_In(true)
    }
  }, []);

  const handleRedirect = (path) => {
    const accessToken = Cookies.get('accessToken');
    router.push(path);
    if (accessToken) {
    } else {
      
      // router.push('/Login');
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brandName}><i>Modren sofa & Furniture</i></div>
      <div className={styles.welcomeNote}>
        {userName ? `Welcome, ${userName}` : 'Welcome'}
      </div>
      <div className={styles.icons}>
        <div className={styles.iconWrapper} onClick={() => handleRedirect('/')}>
          <FaHome className={styles.icon} />
          <span className={styles.iconText}>Home</span>
        </div>
        <div className={styles.iconWrapper} onClick={() => handleRedirect('/wishlist')}>
          <FaHeart className={styles.icon} />
          <span className={styles.iconText}>Wishlist</span>
        </div>
        <div className={styles.iconWrapper} onClick={() => handleRedirect('/orders')}>
          <FaBoxOpen className={styles.icon} />
          <span className={styles.iconText}>Orders</span>
        </div>
        {logged_In === true && (<div className={styles.iconWrapper} onClick={() => handleRedirect('/userProfile')}>
          <FaUser className={styles.icon} />
          <span className={styles.iconText}>Profile</span>
        </div>)}
        
        {userType === 'owner' && (
          <div className={styles.iconWrapper} onClick={() => handleRedirect('/addproduct')}>
            <FaPlusSquare className={styles.icon} />
            <span className={styles.iconText}>Add Product</span>
          </div>
        )}
        <div className={styles.iconWrapper} onClick={() => handleRedirect('/Login')}>
          <FaSignInAlt className={styles.icon} />
          <span className={styles.iconText}>Login</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
