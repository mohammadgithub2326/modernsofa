'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import styles from './orders.module.css';
import { useLoading } from '../../../context/loadingContext';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const { startLoading, stopLoading } = useLoading();
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if (!accessToken || !refreshToken) {
      alert('You are not logged in. Please log in first.');
      router.push('/Login');
      return;
    }
    startLoading();
    axios.get('https://modernsofabk.onrender.com/api/v1/orders/userorders', {
      headers: {
        Authorization: accessToken,
        'x-refresh-token': refreshToken,
      },
    })
    stopLoading()
    .then((response) => {
        console.log(response)
      const { data } = response.data;
      setUsername(data.username);
      setOrders(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      router.push('/Login');
    });
  }, [router]);

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <>
          
          <div className={styles.grid}>
            {orders.map((order) => (
              <div key={order._id} className={styles.card}>
                <div className={styles.productInfo}>
                  <h2 className={styles.productName}>{order.productName}</h2>
                  <p>{order.description}</p>
                  <p>Category: {order.category}</p>
                  <p>Ordered on: {new Date(order.timestamp).toLocaleString()}</p>
                </div>
                <button
                  className={styles.cancelButton}
                  onClick={() => alert("Orders can't be cancelled")}
                >
                  Cancel Order
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;
