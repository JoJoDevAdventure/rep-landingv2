'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 md:py-6 fixed top-0 left-0 right-0 z-50">
      <div className={`md:hidden absolute bg-black/50 top-0 h-screen w-screen left-0 transition-all duration-500 ${isOpen ? "opacity-100": "opacity-0"} ${!isOpen && "hidden"} z-0`}/>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center text-xl font-bold">
          <Image src="/rep-logo.svg" alt="ReplicaIDE" width={120} height={40} />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Dropdown title="Products" />
          <Dropdown title="Solutions" />
          <Dropdown title="Why Replicaide?" />
          <Dropdown title="Resources" />
          <Link href="/enterprise" className="hover:text-p1">Enterprise</Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="bg-p1 text-white px-4 py-2 rounded-lg">Get a demo</button>
          <button className="border border-p1 text-p1 px-4 py-2 rounded-lg">Contact</button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden z-20" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "" : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Sidebar */}

        <div className={`md:hidden fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg p-6 transition-all duration-500 ${isOpen ? "right-0" : "-right-[1000px]"}`}>
          <button className="mb-4" onClick={() => setIsOpen(false)}>
            <X size={30} />
          </button>
          <nav className="flex flex-col space-y-4">
            <Dropdown title="Products" mobile />
            <Dropdown title="Solutions" mobile />
            <Dropdown title="Why Replicaide?" mobile />
            <Dropdown title="Resources" mobile />
            <Link href="/enterprise" className="hover:text-p1">Enterprise</Link>
          </nav>
          <div className="mt-6 flex flex-col space-y-3">
            <button className="bg-p1 text-white px-4 py-2 rounded-lg">Get a demo</button>
            <button className="border border-p1 text-p1 px-4 py-2 rounded-lg">Contact</button>
          </div>
        </div>

    </header>
  );
};

const Dropdown = ({ title, mobile }) => (
  <div className={`relative ${mobile ? 'w-full' : ''}`}>
    <button className="hover:text-p1 flex items-center justify-between w-full">
      {title} <span className="ml-1"> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg> </span>
    </button>
  </div>
);

export default NavBar;
