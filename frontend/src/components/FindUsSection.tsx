'use client';
import Link from 'next/link';
import Image from 'next/image';
import OrderNowButton from './OrderNowButton';
import OrderModal from '@/components/OrderModal';
import { useState, useEffect } from 'react';

export default function FindUsSection() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Find Us Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-56 bg-gray-200 flex items-center justify-center">
              <Image
                src="/data/img/Find.jpg"
                alt="Find Us - Ranna Locations"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Us</h3>
              <p className="text-gray-600 mb-6">
                We have multiple Ranna locations across London. Find your nearest branch.
              </p>
              <Link
                href="/contact"
                className="inline-block w-fit bg-red-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-700 transition-colors text-center"
                style={{ backgroundColor: '#FF4036' }}
              >
                Find Us
              </Link>
            </div>
          </div>

          {/* Dine In Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-56 bg-gray-200 flex items-center justify-center">
              <Image
                src="/data/img/Dine.jpg"
                alt="Dine In - Ranna Restaurant"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dine In</h3>
              <p className="text-gray-600 mb-6">
                Freshly prepared meals in a modern curry house atmosphere.
              </p>
              <Link
                href="/contact"
                className="inline-block w-fit bg-red-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-700 transition-colors text-center"
                style={{ backgroundColor: '#FF4036' }}
              >
                Make a Reservation
              </Link>
            </div>
          </div>

          {/* Order Online Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-56 bg-gray-200 flex items-center justify-center">
              <Image
                src="/data/img/Delivery.jpg"
                alt="Order Online - Delivery Service"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Online</h3>
              <p className="text-gray-600 mb-6">
                Order direct for freshly cooked curries with our exclusive online offers.
              </p>
              <OrderNowButton
                  text="PLACE AN ORDER NOW"
                  className="z-10 cursor-pointer inline-block w-fit bg-red-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-700 transition-colors text-center"
                  style={{ backgroundColor: '#FF4036' }}
                  openModal={true}
                  onModalOpen={() => setIsOrderModalOpen(true)}
                />
            </div>
          </div>
        </div>
      </div>
      {/* Order Modal */}
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </section>
    
  );
}
