'use client'

import Register from "@/app/(pages)/registration/page";
import Navbar from "@/components/navbar/page";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import Layout from "@/components/Layout";
import HomePage from "./(pages)/home/page";


export default function Home() {
  const pathname = usePathname()
  console.log("Current Path:", pathname); // Add this line to check the path
    
  return (
  <>
  <HomePage/>
  </>
  );
}
