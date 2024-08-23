'use client'
import React, { createContext, useContext, useState } from 'react';
import LoadingOverlay from '../components/loadingOverley/loadingOverley';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
      <LoadingOverlay isLoading={isLoading} />
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
