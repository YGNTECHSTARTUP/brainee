
import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="relative  overflow-hidden bg-gradient-to-br from-black via-black to-blue-950">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(30,64,175,0.3),transparent_70%)]"></div>

      {/* Navigation */}
      <header className="relative z-10 px-6 py-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-white text-2xl font-bold">
              Brainee
            </Link>
            <nav className="hidden ml-12 space-x-8 md:flex">
              {["watermark","Plagrasigm Detector","Chat With Our Chat Bot"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="px-4 py-2 text-white hover:text-gray-200 transition-colors">
              Log In
            </Link>
            {/* <Link href="/demo" className="px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-700 transition-colors">
              U
            </Link> */}
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-32 mx-auto text-center max-w-7xl">
        <h1 className="max-w-4xl mx-auto text-4xl font-bold text-white md:text-5xl lg:text-6xl">
       <span className="text-[#7681e1]">
       Protect What You Create
        </span>
          <br />
          <span className="text-[#6f7cf3]">AI-Powered Intellectual</span>
          <br />
          <span className="text-[#c084fc]">
          Property Protection
          </span>

        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-300">
        We provide the tools, intelligence, and secure infrastructure to safeguard your content, detect plagiarism, and enforce usage rights 
          <br />
          all in real-time, at global scale.
        </p>
        <div className="flex flex-col mt-10 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Link
            href="/demo"
            className="flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-900 bg-white rounded-md hover:bg-gray-100 transition-colors"
          >
          Use This Product Now
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link
            href="/build"
            className="px-8 py-3 text-lg font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
          >
            Chat with Our Ai assitant
          </Link>
        </div>

        {/* Partners Section */}
        <div className="w-full mt-24">
         
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {/* Partner logos */}
           
            {/* <div className="h-6 text-white">
              <span className="text-xl font-bold">Gemini</span>
            </div> */}
            {/* <div className="h-6 text-white">
              <span className="text-xl font-bold">Huggingface</span>
            </div> */}
           
          </div>
        </div>
   
      </main>
    </div>
  )
}

