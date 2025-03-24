
import React from 'react';
import Spline from '@splinetool/react-spline/next';

const Brain = () => {
  return (
    <div className=" w-full -mt-40  text-white grid grid-cols-1 md:grid-cols-2 relative  overflow-hidden bg-gradient-to-tr from-black via-black to-blue-950">
      {/* Left Side - Text Section */}
      <div className="flex flex-col justify-center items-start p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#4363d7] mb-6">
          Tools Powered By Gemini API
        </h1>
        <p className="text-xl md:text-2xl text-indigo-300">
        Tools powered by Gemini deliver next-level performance, intelligence, and adaptability. Whether you&apos;re building smarter workflows, enhancing user experiences, or accelerating innovation, Gemini&apos;s cutting-edge AI capabilities seamlessly integrate into your toolkit. Unlock real-time insights, automate complex tasks, and bring your ideas to life with tools that think, learn, and evolve — powered by the brilliance of Gemini.
        </p>
      </div>

      {/* Right Side - Spline Viewer */}
      <div className="flex flex-col justify-center items-center p-8">
       
        <div className="w-full h-[300px] md:h-[500px]">
          <Spline scene="https://prod.spline.design/SYizn4r2O13urqlW/scene.splinecode" />
        </div>
      </div>
    </div>
  );
};

export default Brain;
