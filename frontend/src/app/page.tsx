'use client';

import Link from 'next/link';
import Image from 'next/image';
import ReviewCarousel from '@/components/ReviewCarousel';
import FindUsSection from '@/components/FindUsSection';
import DishCard from '@/components/DishCard';

interface FeaturedDish {
  dish_id: string;
  dish_title: string;
  image_url: string;
  spice_level: number;
  options: Array<{
    price: number;
    short_description: string;
  }>;
  category: string;
  description: string;
  lowestPrice: number;
}

export default function Home() {
  // Featured dishes for Fan Favourites section
  const featuredDishes: FeaturedDish[] = [
    {
      dish_id: "featured-1",
      dish_title: "Butter Chicken",
      image_url: "/data/img/butter-chicken.jpg",
      spice_level: 2,
      options: [{
        price: 12.99,
        short_description: "Creamy tomato-based curry with tender chicken pieces"
      }],
      category: "Curries",
      description: "Creamy tomato-based curry with tender chicken pieces",
      lowestPrice: 12.99
    },
    {
      dish_id: "featured-6",
      dish_title: "Lamb Biryani",
      image_url: "/data/img/lamb-biryani.jpg", 
      spice_level: 3,
      options: [{
        price: 14.99,
        short_description: "Fragrant basmati rice with tender lamb and aromatic spices"
      }],
      category: "Rice Dishes",
      description: "Fragrant basmati rice with tender lamb and aromatic spices",
      lowestPrice: 14.99
    },
    {
      dish_id: "featured-7",
      dish_title: "Paneer Tikka",
      image_url: "/data/img/paneer-tikka.jpg",
      spice_level: 2,
      options: [{
        price: 8.99,
        short_description: "Grilled cottage cheese with aromatic spices"
      }],
      category: "Starters",
      description: "Grilled cottage cheese with aromatic spices",
      lowestPrice: 8.99
    },
    {
      dish_id: "featured-2",
      dish_title: "Chicken Tikka Masala",
      image_url: "/data/img/chicken-tikka-masala.jpg",
      spice_level: 2,
      options: [{
        price: 13.99,
        short_description: "Tender chicken in rich tomato and cream sauce"
      }],
      category: "Curries",
      description: "Tender chicken in rich tomato and cream sauce",
      lowestPrice: 13.99
    },
    {
      dish_id: "featured-3",
      dish_title: "Dal Makhani",
      image_url: "/data/img/dal-makhani.jpg",
      spice_level: 1,
      options: [{
        price: 9.99,
        short_description: "Creamy black lentils with butter and cream"
      }],
      category: "Vegetarian",
      description: "Creamy black lentils with butter and cream",
      lowestPrice: 9.99
    },
    {
      dish_id: "featured-4",
      dish_title: "Chicken Karahi",
      image_url: "/data/img/chicken-karahi.jpg",
      spice_level: 4,
      options: [{
        price: 15.99,
        short_description: "Spicy chicken curry cooked in a traditional karahi"
      }],
      category: "Curries",
      description: "Spicy chicken curry cooked in a traditional karahi",
      lowestPrice: 15.99
    },
    {
      dish_id: "featured-5",
      dish_title: "Naan Bread",
      image_url: "/data/img/naan-bread.jpg",
      spice_level: 1,
      options: [{
        price: 3.99,
        short_description: "Freshly baked traditional Indian bread"
      }],
      category: "Bread",
      description: "Freshly baked traditional Indian bread",
      lowestPrice: 3.99
    }
  ];

  const handleMoreInfo = (dish: { dish_title: string }) => {
    // For now, just log the dish - you can implement modal later
    console.log('More info for:', dish.dish_title);
  };

    return (
    <div>
      {/* Hero Section 1 */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Made with passion, served with pride</h1>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Quick Heat. big flavour</h2>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">The Indian flavour that keeps you coming back</h2>

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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Card 1: 25% Discount */}
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/data/img/Ranna25Discount.webp"
                  alt="25% Discount Offer"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
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

            {/* Card 2: VIP Loyalty Membership */}
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/data/img/VIPLoyalty.webp"
                  alt="VIP Loyalty Membership"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <h2 className="text-6xl font-bold text-gray-900 mb-4">Fan Favourites</h2>
            <p className="text-xl text-gray-600">Our most loved dishes</p>
          </div>

          {/* Continuous Scrolling Dishes */}
          <div className="relative overflow-hidden">
            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
            
            {/* Scrolling Container */}
            <div className="flex animate-scroll">
              {/* First set of dishes */}
              {featuredDishes.map((dish, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 mx-4">
                  <div className="w-80">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <DishCard dish={dish as any} onMoreInfo={handleMoreInfo} />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {featuredDishes.map((dish, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 mx-4">
                  <div className="w-80">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <DishCard dish={dish as any} onMoreInfo={handleMoreInfo} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Carousel */}
      <ReviewCarousel />

      {/* Find Us Section */}
      <FindUsSection />
    </div>
  );
}