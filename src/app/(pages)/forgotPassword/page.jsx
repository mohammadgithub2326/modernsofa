'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './forgotPassword.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://modernsofabk.onrender.com/api/v1/users/forgot-password', { email, newPassword });
    //   const response = await axios.post('http://localhost:5000/api/v1/users/forgot-password', { email, newPassword });
      
      if (response.data.success) {
        alert('Your password has been changed successfully.');
        router.push('/Login');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error changing password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Forgot Password</h1>
        <input
          className={styles.input}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.passwordContainer}>
          <input
            className={styles.input}
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button className={styles.submitButton} type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
