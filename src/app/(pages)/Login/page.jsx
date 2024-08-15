"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies
import styles from './LoginPage.module.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://modern-sofa-backend.onrender.com/api/v1/users/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                // Save tokens to cookies
                Cookies.set('accessToken', response.data.accessToken, { secure: true, sameSite: 'Strict' });
                Cookies.set('refreshToken', response.data.refreshToken, { secure: true, sameSite: 'Strict' });

                setMessage('Login successful!');
                
                // Redirect to home page
                router.push('/home');
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.submitButton}>Login</button>
                {message && <p className={styles.message}>{message}</p>}
            </form>
        </div>
    );
};

export default Login;
