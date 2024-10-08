"use client"
import { useState } from 'react';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies
import styles from './LoginPage.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLoading } from '../../../context/loadingContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const router = useRouter();
    
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { startLoading, stopLoading } = useLoading();
    console.log("Current Path:", usePathname);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        startLoading();
        try {
            // const response = await axios.post('http://localhost:5000/api/v1/users/login', formData, {
            const response = await axios.post('https://modernsofabk.onrender.com/api/v1/users/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            stopLoading();
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
    const handleforgotpassword = ()=>{
        startLoading();
        router.push("/forgotPassword")
        stopLoading();
    }
    const handleRegistrationRedirect = () =>{
        startLoading();
        router.push('/registration')
        stopLoading();
    }

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
                <div  className={styles.passwordContainer}>

                <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                <span
            className={styles.eyeIcon}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
                    </div>
                <button type="submit" className={styles.submitButton}>Login</button>
                {message && <p className={styles.message}>{message}</p>}
            <div className={styles.forgotPasswordandregistor}>
            <p  className={styles.registrationText}onClick={handleRegistrationRedirect}>
                    <u>Registor user</u>
            </p>
            <p className={styles.forgotpassword} onClick={handleforgotpassword}>
            forgotPassword
            </p>
            </div>
            </form>
        </div>
    );
};

export default Login;
