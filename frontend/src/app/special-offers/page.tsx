'use client';

import { useState } from 'react';
import Image from 'next/image';
import OrderNowButton from '@/components/OrderNowButton';
import OrderModal from '@/components/OrderModal';

export default function SpecialOffersPage() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const offers = [
    {
      title: "One-Time 25% Discount",
      content: "Use promo code 'Ranna25' when placing your order and get one-time deal of 25% off.",
      details: [
        "• Minimum order value: £20",
        "• Available for dine-in, collection, and delivery",
        "• Offer ends: 30th April 2026",
        "• Further T&Cs apply (see below)"
      ]
    },
    {
      title: "VIP 20% Discount", 
      content: "Become a yearly VIP Loyalty Member and enjoy 20% OFF EVERY ORDER. Just add VIP membership to your cart when placing your order online.",
      details: [
        "• Annual membership fee: £25",
        "• After registration, you'll receive a discount code within 2-3 days, valid at your selected branch from your next order.",
        "• Minimum order value: £20",
        "• Available for dine-in, collection, and delivery",
        "• Further T&Cs apply (see below)"
      ]
    },
    {
      title: "10% Online Discount",
      content: "Use promo code 'online' when placing your order and get 10% off every order until the end of 2026! We love it when you order directly from our website, so this is a little reward to keep you coming back!",
      details: [
        "• Minimum order value: £15",
        "• Available for collection and delivery only",
        "• Offer ends: 31st December 2026",
        "• Further T&Cs apply (see below)"
      ]
    },
    {
      title: "Ranna Rewards",
      content: "Create an account when placing your order and start collecting points straight away.Each order automatically adds points to your balance, and you can redeem them at any time. Please note that each branch runs its own points system.",
      details: [
        "• Available for dine-in, collection, and delivery",
        "• Further T&Cs apply (see below)"
          ]
    }
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">Special Offers</h1>
        </div>
      </section>

      {/* Image-Text Section */}
      <section id="discount-25" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-1">
              <div className="relative h-full w-full rounded-lg overflow-hidden">
                <Image
                  src="/data/img/Ranna25Discount.webp"
                  alt="25% Discount Offer"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{offers[0].title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {offers[0].content}
                </p>
                <div className="mb-6">
                  {offers[0].details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="text-gray-600 text-sm mb-2">
                      {detail}
                    </div>
                  ))}
                </div>
                <OrderNowButton
                  text="PLACE AN ORDER NOW"
                  className="inline-block w-fit bg-red-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-700 transition-colors text-center"
                style={{ backgroundColor: '#FF4036' }}
                  openModal={true}
                  onModalOpen={() => setIsOrderModalOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text-Image Section */}
      <section id="discount-vip" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-50 rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{offers[1].title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {offers[1].content}
                </p>
                <div className="mb-6">
                  {offers[1].details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="text-gray-600 text-sm mb-2">
                      {detail}
                    </div>
                  ))}
                </div>
                <OrderNowButton
                  text="PLACE AN ORDER NOW"
                  className="inline-block w-fit bg-red-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-700 transition-colors text-center"
                style={{ backgroundColor: '#FF4036' }}
                  openModal={true}
                  onModalOpen={() => setIsOrderModalOpen(true)}
                />
              </div>
            </div>
            
            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative h-full w-full rounded-lg overflow-hidden">
              <Image
                  src="/data/img/VIPLoyalty.webp"
                  alt="22% VIP Discount Offer"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image-Text Section */}
      <section id="discount-10" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-1">
              <div className="relative h-full w-full rounded-lg overflow-hidden">
              <Image
                  src="/data/img/Ranna10Discount.webp"
                  alt="10% Online Discount Offer"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Text */}
            <div className="order-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{offers[2].title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {offers[2].content}
                </p>
                <div className="mb-6">
                  {offers[2].details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="text-gray-600 text-sm mb-2">
                      {detail}
                    </div>
                  ))}
                </div>
                <OrderNowButton
                  text="PLACE AN ORDER NOW"
                  className="inline-block w-fit bg-red-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-700 transition-colors text-center"
                style={{ backgroundColor: '#FF4036' }}
                  openModal={true}
                  onModalOpen={() => setIsOrderModalOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text-Image Section */}
      <section id="rewards" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-50 rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{offers[3].title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {offers[3].content}
                </p>
                <div className="mb-6">
                  {offers[3].details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="text-gray-600 text-sm mb-2">
                      {detail}
                    </div>
                  ))}
                </div>
                <OrderNowButton
                  text="PLACE AN ORDER NOW"
                  className="inline-block w-fit bg-red-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-700 transition-colors text-center"
                  style={{ backgroundColor: '#FF4036' }}
                  openModal={true}
                  onModalOpen={() => setIsOrderModalOpen(true)}
                />
              </div>
            </div>
            
            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative h-full w-full rounded-lg overflow-hidden">
              <Image
                  src="/data/img/RannaRewards.webp"
                  alt="Ranna Rewards Offer"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Top Section - Exclusive Offers (Full Width) */}
      <section className="lg:py-16 py-8 bg-gray-50">    
        <div className="py-8 ">
          <div className="flex flex-col lg:flex-row justify-center lg:gap-8 gap-4 items-center px-2">
            <div className="mb-4 lg:mb-0">
              <p className="text-xl text-gray-600">
              For more exclusive special offers, subscribe to our email list.
              </p>
            </div>
            <div className="flex w-full lg:w-auto ">
              <input
                type="email"
                placeholder="jane@email.com"
                className="flex-1 px-4 py-2 bg-white text-gray-900 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button 
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-r-md transition-colors font-semibold"
                style={{ backgroundColor: '#FF4036' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
          </section>

      {/* Terms & Conditions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-start">Terms & Conditions:</h2>
          
          <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
            <div className="space-y-2">
              <p>• Offers exclude Set Meals, Platters, and Combi Meals, seafood and drinks.</p>
              <p>• All discounts above are valid exclusively online.</p>
              <p>• Discounts cannot be combined with any other discount, including Ranna Rewards.</p>
              <p>• Discounts cannot be applied after the transaction is completed. Staff cannot refund money once the payment is processed.</p>
              <p>• Ranna Rewards: £1 = 2 points. Each point is worth 1p.</p>
              <p>• Vouchers and Ranna Club points cannot be exchanged for cash. They are only valid for use on the Ranna website or at the specific store they are assigned to.</p>
            </div>
          </div>
        </div>
      </section>
      
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </div>
  );
}