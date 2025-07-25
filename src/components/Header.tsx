import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full p-2">
      <nav className="container mx-auto flex justify-center items-center bg-white/80 backdrop-blur-md rounded-xl p-2 shadow-lg">
        <Link href="/">
          <Image 
            src="/images/logo.png"
            alt="CoussinBébé Logo"
            width={180} 
            height={100}
            priority
          />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
