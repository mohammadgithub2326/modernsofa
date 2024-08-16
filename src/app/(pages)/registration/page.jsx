"use client"
import { useState } from 'react';
import axios from 'axios';
import styles from './register.module.css';

const Register = () => {
    const [message,setMessage]=useState("")
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        type: ''
    });

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
            const response = await axios.post('https://modernsofabackend.onrender.com/api/v1/users/register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert(response.data.message || 'Registration successful!');
            setMessage('Login successful!');
        } catch (error) {
            setMessage(error.response.message);
            alert(error.response?.data?.message || 'An error occurred during registration.');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Registration</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
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
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                <div className={styles.userTypeContainer}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="type"
                            value="customer"
                            checked={formData.type === 'customer'}
                            onChange={handleChange}
                            className={styles.radioInput}
                        />
                        Customer
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="type"
                            value="owner"
                            checked={formData.type === 'owner'}
                            onChange={handleChange}
                            className={styles.radioInput}
                        />
                        Owner
                    </label>
                </div>
                <button type="submit" className={styles.submitButton}>Register</button>
                {message && <p className={styles.message}>{message}</p>}
            </form>
        </div>
    );
};

export default Register;

