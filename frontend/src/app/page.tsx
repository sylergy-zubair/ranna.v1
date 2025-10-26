'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReviewCarousel from '@/components/ReviewCarousel';
import FindUsSection from '@/components/FindUsSection';
import DishCard from '@/components/DishCard';
import { Dish } from '@/types';

export default function Home() {
  // Featured dishes for Fan Favourites section
  const [featuredDishes, setFeaturedDishes] = useState<(Dish & { description: string; lowestPrice: number })[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured dishes from API
  useEffect(() => {
    const fetchFeaturedDishes = async () => {
      try {
        const response = await fetch('/api/v1/menu/featured');
        const data = await response.json();
        
        if (data.success && data.data) {
          // Transform featured dishes to match DishCardProps structure
          const transformedDishes = data.data.map((dish: Dish) => ({
            ...dish,
            description: dish.options?.[0]?.short_description || '',
            lowestPrice: Math.min(...(dish.options?.map((option) => option.price) || [0]))
          }));
          setFeaturedDishes(transformedDishes);
        } else {
          console.log('No featured dishes found, using fallback');
          // Fallback to empty array if no featured dishes
          setFeaturedDishes([]);
        }
      } catch (error) {
        console.error('Error fetching featured dishes:', error);
        setFeaturedDishes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedDishes();
  }, []);

  // More Info Modal handlers
  const handleMoreInfo = (dish: Dish) => {
    // TODO: Implement modal functionality
    console.log('More info clicked for dish:', dish.dish_title);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={(e) => {
            console.log('Video error, using fallback background');
            // Hide video and show fallback
            const video = e.target as HTMLVideoElement;
            video.style.display = 'none';
          }}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/data/vdo/HeroVideo.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-red-800 z-0"></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Made with passion, served with pride</h1>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Quick Heat. big flavour</h2>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">The Indian flavour that keeps you coming back</h2>
        </div>
      </section>



      {/* Hero Section 4 */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/menu"
              className="px-8 py-2 bg-[#333333] text-white rounded-full font-semibold text-lg flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
              </svg>
              Menu
            </Link>
            <Link
              href="/special-offers"
              className="px-8 py-2 bg-[#333333] text-white rounded-full font-semibold text-lg flex items-center gap-3"
            >
            
              Special Offers
            </Link>
            <Link
              href="/contact"
              className="px-8 py-2 bg-[#333333] text-white rounded-full font-semibold text-lg flex items-center gap-3"
            >
             
              Find Us
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold text-gray-900 mb-16 text-left">Special Offers</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         

             {/* Card 1:10% Online Discount*/}
             <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/data/img/Ranna10Discount.webp"
                  alt="VIP Loyalty Membership"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    console.log('Image failed to load:', e);
                    // You could set a fallback image here
                  }}
                />
              </div>
              {/* More Info Button */}
              <div>
                <Link
                  href="/special-offers"
                  className="inline-block bg-red-600 text-white px-8 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors text-lg"
                  style={{ backgroundColor: '#FF4036' }}
                >
                  More Info
                </Link>
              </div>
            </div>

               {/* Card 2: 25% Discount */}
               <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/data/img/Ranna25Discount.webp"
                  alt="25% Discount Offer"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    console.log('Image failed to load:', e);
                  }}
                />
          </div>
              {/* More Info Button */}
              <div>
                <Link
                  href="/special-offers"
                  className="inline-block bg-red-600 text-white px-8 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors text-lg"
                  style={{ backgroundColor: '#FF4036' }}
                >
                  More Info
                </Link>
              </div>
            </div>

            {/* Card 3: VIP Loyalty Membership */}
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/data/img/VIPLoyalty.webp"
                  alt="VIP Loyalty Membership"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    console.log('Image failed to load:', e);
                  }}
                />
              </div>
              {/* More Info Button */}
              <div>
                <Link
                  href="/special-offers"
                  className="inline-block bg-red-600 text-white px-8 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors text-lg"
                  style={{ backgroundColor: '#FF4036' }}
                >
                  More Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fan Favourites Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fan Favourites</h2>
            <p className="text-lg text-gray-600">Our most loved dishes, handpicked by our chefs</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : featuredDishes.length > 0 ? (
            <div className="relative overflow-hidden">
              {/* Scrolling Container */}
              <div className="flex animate-scroll">
                {/* First set of dishes */}
                {featuredDishes.map((dish, index) => (
                  <div key={`first-${index}`} className="flex-shrink-0 mx-4">
                    <div className="w-80">
                      <DishCard dish={dish} onMoreInfo={handleMoreInfo} />
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {/* {featuredDishes.map((dish, index) => (
                  <div key={`second-${index}`} className="flex-shrink-0 mx-4">
                    <div className="w-80">
                      <DishCard dish={dish} onMoreInfo={handleMoreInfo} />
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No featured dishes available at the moment.</p>
              <p className="text-gray-400 text-sm mt-2">Check back later for our chef&apos;s recommendations!</p>
            </div>
          )}
        </div>
      </section>

      {/* What Our Customers Say Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ReviewCarousel />
        </div>
      </section>

      {/* Find Us Section */}
      <FindUsSection />
    </div>
  );
}