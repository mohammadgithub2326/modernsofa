
"use client"
import { useState } from 'react';
import axios from 'axios';
import styles from './LoginPage.module.css';
import cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router=useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://modern-sofa.onrender.com/api/v1/users/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // handle success (e.g., store token, redirect, etc.)
     

        console.log(response.data);
        alert(response.data.message);
        console.log(cookies.set(accessToken, response.data.tokens.accessToken));
        cookies.set(refreshToken, response.data.tokens.refreshToken);
        router.push('/home');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;
