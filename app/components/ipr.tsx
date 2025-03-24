import React from 'react';
import Spline from '@splinetool/react-spline/next';

const Ipr = () => {
  return (
    <div className="w-full text-white grid grid-cols-1 md:grid-cols-2 min-h-screen bg-gradient-to-t from-black via-gray-900 to-black relative overflow-hidden">
      
      {/* Left Side - Spline Viewer */}
      <div className="flex justify-center items-center p-6 md:p-12">
        <div className="w-full h-[300px] md:h-[500px] bg-transparent">
          <Spline
            scene="https://prod.spline.design/exvciKtABsnGAtbR/scene.splinecode"
          />
        </div>
      </div>

      {/* Right Side - Text Content */}
      <div className="flex flex-col justify-center items-start p-6 md:p-12 space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold text-[#4363d7]">
          Empowering Your Intellectual Property with AI Tools Powered by Gemini
        </h1>
        <p className="text-lg md:text-2xl text-indigo-300">
          Every idea is unique — and protecting your individual intellectual property begins with tools that respect and amplify your creativity. Gemini-powered tools are designed to enhance your capabilities while ensuring your innovations remain yours. With advanced AI performance, seamless integration, and real-time adaptability, these tools empower you to create, innovate, and protect what matters most — your intellect, your vision, your rights.
        </p>
      </div>

    </div>
  );
};

export default Ipr;
