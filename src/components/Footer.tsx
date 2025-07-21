"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-8 mt-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-6">
        
        {/* Logo */}
        <Link href="/">
            <Image 
              src="/images/logo.png" 
              alt="Coussin Baby Logo" 
              width={150} 
              height={50} 
              className="h-10 w-auto cursor-pointer"
            />
        </Link>
        
        {/* Legal Links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          <Link href="/mentions-legales" className="hover:text-gray-900 transition-colors">Mentions légales</Link>
          <Link href="/cgv" className="hover:text-gray-900 transition-colors">CGV</Link>
          <Link href="/politique-de-confidentialite" className="hover:text-gray-900 transition-colors">Confidentialité</Link>
          <Link href="/retours" className="hover:text-gray-900 transition-colors">Retours</Link>
          <Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
        </nav>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Coussin Baby. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

