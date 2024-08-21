'use client'
// app/layout.js or your relevant layout file
import { usePathname } from 'next/navigation';
import Navbar from './navbar/page';

export default function Layout({ children }) {
  const pathname = usePathname();
  
  console.log("this is from the layout.js :"+ pathname)
// Check if the current path is '/login' or '/registration'
const shouldShowNavbar = !pathname.startsWith('/Login') && !pathname.startsWith('/registration') && !pathname.startsWith("/404");

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
}
