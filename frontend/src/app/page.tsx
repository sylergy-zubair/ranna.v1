'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReviewCarousel from '@/components/ReviewCarousel';
import FindUsSection from '@/components/FindUsSection';
import DishCard from '@/components/DishCard';
import { Dish } from '@/types';
import OrderNowButton from '@/components/OrderNowButton';
import OrderModal from '@/components/OrderModal';

export default function Home() {
  // Featured dishes for Fan Favourites section
  const [featuredDishes, setFeaturedDishes] = useState<(Dish & { description: string; lowestPrice: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
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
      <section className="relative w-full h-[80vh] overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col justify-center items-start h-full text-white text-left max-w-7xl mx-auto px-4 pt-40 sm:px-6 lg:px-8 w-full ">
         <h1 className="lg:text-[92px] text-[48px] font-bold mb-0 leading-tight">MADE WITH <span className="text-red-600">PASSION</span>, <br /> SERVED WITH PRIDE</h1>
        <p className="lg:text-[36px] text-[24px]">The Indian flavour that keeps you coming back</p>
        <OrderNowButton
                  text="PLACE AN ORDER NOW"
                  className="z-10 cursor-pointer inline-block w-fit bg-red-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-700 transition-colors text-center"
                  style={{ backgroundColor: '#FF4036' }}
                  openModal={true}
                  onModalOpen={() => setIsOrderModalOpen(true)}
                />
      </div>
      
      </section>



      {/* Hero Section 4 */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              href="/menu"
              className="px-6 py-2 sm:px-8 sm:py-2 bg-[#333333] text-white rounded-full font-semibold text-base sm:text-lg flex items-center gap-2 sm:gap-3 w-40 sm:w-auto justify-center"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
              </svg>
              Menu
            </Link>
            <Link
              href="/special-offers"
              className="px-6 py-2 sm:px-8 sm:py-2 bg-[#333333] text-white rounded-full font-semibold text-base sm:text-lg flex items-center gap-2 sm:gap-3 w-40 sm:w-auto justify-center whitespace-nowrap"
            >
              Special Offers
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 sm:px-8 sm:py-2 bg-[#333333] text-white rounded-full font-semibold text-base sm:text-lg flex items-center gap-2 sm:gap-3 w-40 sm:w-auto justify-center"
            >
              Find Us
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="lg:text-6xl text-4xl font-bold text-gray-900 mb-16 text-center lg:text-left">Special Offers</h2>
          
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
          <div className="lg:text-left text-center mb-12">
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

      {/* Order Modal */}
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </div>
  );
}