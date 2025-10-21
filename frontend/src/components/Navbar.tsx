'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import OrderNowButton from './OrderNowButton';
import OrderModal from './OrderModal';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/img/Ranna_new_LOGO-For-Sign.png"
              alt="Ranna Logo"
              width={154}
              height={99}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/menu" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/menu') 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Menu
            </Link>
            <Link 
              href="/our-story" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/our-story') 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Our Story
            </Link>
            <Link 
              href="/special-offers" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/special-offers') 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Special Offers
            </Link>
            <Link 
              href="/contact" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Contact
            </Link>
            <OrderNowButton
              size="md"
              variant="primary"
              color="orange"
              openModal={true}
              onModalOpen={() => setIsOrderModalOpen(true)}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-orange-600 focus:outline-none"
              aria-label="Open main menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <Link 
              href="/menu" 
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/menu') 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Menu
            </Link>
            <Link 
              href="/our-story" 
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/our-story') 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Our Story
            </Link>
            <Link 
              href="/special-offers" 
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/special-offers') 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Special Offers
            </Link>
            <Link 
              href="/contact" 
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/contact') 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Contact
            </Link>
            <OrderNowButton
              size="md"
              variant="primary"
              color="orange"
              fullWidth
              openModal={true}
              onModalOpen={() => {
                closeMobileMenu();
                setIsOrderModalOpen(true);
              }}
            />
          </div>
          </div>
        )}
      </div>
    </nav>
    
    <OrderModal 
      isOpen={isOrderModalOpen} 
      onClose={() => setIsOrderModalOpen(false)} 
    />
    </>
  );
}
