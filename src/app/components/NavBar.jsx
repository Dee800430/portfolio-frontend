"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Download } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/#home" },
    { name: "Projects", href: "/#projects" },
   
    { name: "Login", href: "/login" },
  ];

  const profileAvatar = (
    <div className="flex h-full w-full items-center justify-center bg-cyan-500 text-sm font-bold text-black">
      DR
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            Deepanshu<span className="text-cyan-400"></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-cyan-400 transition duration-300 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}

            

            {/* Profile Icon */}
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
              {profileAvatar}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="flex flex-col px-6 py-5 space-y-5">

            {/* Mobile Profile */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400">
                {profileAvatar}
              </div>

              <div>
                <h2 className="text-white font-semibold">
                  Deepanshu Rana
                </h2>
                <p className="text-gray-400 text-sm">
                  Java Full Stack Developer
                </p>
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-cyan-400 transition text-base"
              >
                {item.name}
              </Link>
            ))}

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              download
              className="w-fit flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 rounded-full font-semibold transition duration-300"
            >
              <Download size={18} />
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
