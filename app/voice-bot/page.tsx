import Spline from '@splinetool/react-spline';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-32 mx-auto text-center max-w-7xl min-h-screen bg-gradient-to-br from-[#1e1e2e] to-[#2a2a3a]">
      
      <div className="backdrop-blur-lg bg-white/10 rounded-xl p-10 shadow-lg">
      <Link href={"/"}>
       <ArrowLeft/>
        </Link> 
        <h1 className="max-w-4xl mx-auto text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          <span className="text-[#7681e1]">Coming Soon</span>
          <br />
          <span className="text-[#6f7cf3]">Our AI-Powered Voice Assistant</span>
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-300">
          Experience the future of voice interaction with our intelligent, real-time AI assistant.
        </p>
        <div className="mt-10 w-full max-w-4xl">
          <Spline scene="https://prod.spline.design/dXA1djhS7zy5oV9Z/scene.splinecode" />
        </div>
      </div>
    </main>
  );
};

export default Page;
