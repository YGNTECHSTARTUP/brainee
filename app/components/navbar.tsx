import { SignedIn, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
const navItems = [
    { label: "Create A Watermark", href: "/watermark" },
    { label: "Plagiarism Detector", href: "/plagraism" },
    { label: "Chat With Our Chat Bot", href: "/chat-bot" },
  ];
const Navbar = () => {
  return (
    <header className="relative z-10 px-6 py-4  mx-auto min-w-full bg-black">
    <div className="flex items-center justify-between container">
      <div className="flex items-center container">
        <Link href="/" className="text-white text-2xl font-bold ml-16">
          Brainee
        </Link>
        <nav className="hidden ml-12 space-x-8 md:flex cursor-pointer">
{navItems.map((item) => (
<Link
  key={item.label}
  href={item.href}
  className="text-gray-300 hover:text-white transition-colors"
>
  {item.label}
</Link>
))}
</nav>
      </div>
      <div className="flex items-center space-x-4">
       <SignInButton/>
       <SignedIn>
        <UserButton/>
       </SignedIn>
        {/* <Link href="/demo" className="px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-700 transition-colors">
          U
        </Link> */}
      </div>
    </div>
  </header>
  )
}

export default Navbar