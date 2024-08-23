'use client'
// app/layout.js or your relevant layout file
import { usePathname } from 'next/navigation';
import Navbar from './navbar/page';

import { LoadingProvider } from '../context/loadingContext';

export default function Layout({ children }) {
  const pathname = usePathname();
  
  console.log("this is from the layout.js :"+ pathname)
// Check if the current path is '/login' or '/registration'
const shouldShowNavbar = !pathname.startsWith('/Login')&&!pathname.startsWith('/forgotPassword') && !pathname.startsWith('/registration') && !pathname.startsWith("/404");

  return (
    <>
     <LoadingProvider>
      {shouldShowNavbar && <Navbar />}
      <main>{children}</main>
      </LoadingProvider>
    </>
  );
}
