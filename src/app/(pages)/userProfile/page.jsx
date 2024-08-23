'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './userProfile.module.css';
import Cookies from 'js-cookie';

import { useLoading } from '../../../context/loadingContext';

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if (!accessToken || !refreshToken) {
      alert('You are not logged in. Please login first.');
      router.push('/Login');
      return;
    }
    startLoading();
    axios.get('https://modernsofabk.onrender.com/api/v1/users/getprofile', {
    // axios.get('http://localhost:5000/api/v1/users/getprofile', {
      headers: {
        'Authorization': accessToken,
        'x-refresh-token': refreshToken,
      }
    })
    .then(response => {

        console.log(response)
      setUserData(response.data.data);
      stopLoading();
    })
    .catch(() => {
      alert('Failed to fetch user profile.');
      router.push('/Login');
    });
  }, []);

  const handleEdit = () => {
    setBuffering(true);
    setTimeout(() => {
      setBuffering(false);
      setEditable(true);
    }, 3000);
  };

  const handleUpdate = () => {
    startLoading();
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    setBuffering(true);
    axios.put('https://modernsofabk.onrender.com/api/v1/users/updateprofile', userData, {
    // axios.put('http://localhost:5000/api/v1/users/updateprofile', userData, {
      headers: {
        'Authorization': accessToken,
        'x-refresh-token': refreshToken,
      }
    })
    .then(() => {
      setBuffering(false);
      stopLoading();
      alert('Profile updated successfully!');
      setEditable(false);
    })
    .catch(() => {
      setBuffering(false);
      alert('Failed to update profile.');
    });
  };

  if (!userData) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome, <input 
                  type="text" 
                  value={userData.name} 
                  disabled={!editable} 
                  onChange={(e) => setUserData({...userData, name: e.target.value})} 
                />
      </h1>
      <div className={styles.info}>
        <label>Email:</label>
        <input 
          type="email" 
          value={userData.email} 
          disabled={!editable} 
          onChange={(e) => setUserData({...userData, email: e.target.value})} 
        />
        <label>Mobile:</label>
        <input 
          type="text" 
          value={userData.mobile} 
          disabled={!editable} 
          onChange={(e) => setUserData({...userData, mobile: e.target.value})} 
        />
        {/* <label>Type:</label> */}
        {/* <input 
          type="text" 
          value={userData.type} 
          disabled={!editable} 
          onChange={(e) => setUserData({...userData, type: e.target.value})} 
        /> */}
      </div>
      <div className={styles.buttons}>
        {!editable && (
          <button className={styles.editButton} onClick={handleEdit}>
            {buffering ? 'Loading...' : 'Edit Profile'}
          </button>
        )}
        {editable && (
          <button className={styles.updateButton} onClick={handleUpdate}>
            {buffering ? 'Updating...' : 'Update Profile'}
          </button>
        )}
      </div>
    </div>
  );
}
