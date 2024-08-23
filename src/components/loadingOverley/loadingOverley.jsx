import React from 'react';
import Spinner from '../spinner/spinner';
import styles from './loadingOverley.module.css';

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <Spinner />
    </div>
  );
};

export default LoadingOverlay;
