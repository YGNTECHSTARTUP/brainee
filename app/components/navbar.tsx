'use client';

import { SignedIn, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navItems = [
  { label: 'Create A Watermark', href: '/watermark' },
  { label: 'Plagiarism Detector', href: '/plagiarism' },
  { label: 'Chat With Our Chat Bot', href: '/chat-bot' },
  { label: 'Interact with Our Voice Bot', href: '/voice-bot' },
];

const Navbar = () => {
  return (
    <header className="relative z-10 px-6 py-4 bg-black min-w-full">
      <div className="flex items-center justify-between container mx-auto">
        <Link href="/" className="text-white text-2xl font-bold">
          Brainee
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
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

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="text-white focus:outline-none">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-black text-white">
              <nav className="flex flex-col space-y-4 p-6">
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
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <SignInButton />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;