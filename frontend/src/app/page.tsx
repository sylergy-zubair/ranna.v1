'use client';

import Link from 'next/link';
import ReviewCarousel from '@/components/ReviewCarousel';
import FindUsSection from '@/components/FindUsSection';
import DishCard from '@/components/DishCard';

export default function Home() {
  // Featured dishes for Fan Favourites section
  const featuredDishes = [
    {
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

  const handleMoreInfo = (dish: any) => {
    // For now, just log the dish - you can implement modal later
    console.log('More info for:', dish.dish_title);
  };

  return (
    <div>
      {/* Hero Section 1 */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Made with passion, served with pride</h1>
        </div>
      </section>

      {/* Hero Section 2 */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Quick Heat. big flavour</h2>
        </div>
      </section>

      {/* Hero Section 3 */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">The Indian flavour that keeps you coming back</h2>
        </div>
      </section>

      {/* Hero Section 4 */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/menu"
              className="px-8 py-4 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors text-lg"
              style={{ backgroundColor: '#FF4036' }}
            >
              Menu
            </Link>
            <Link
              href="/special-offers"
              className="px-8 py-4 border-2 text-red-600 rounded-full font-semibold hover:bg-red-600 hover:text-white transition-colors text-lg"
              style={{ borderColor: '#FF4036', color: '#FF4036' }}
            >
              Special Offers
            </Link>
            <Link
              href="#"
              className="px-8 py-4 border-2 border-gray-600 text-gray-600 rounded-full font-semibold hover:bg-gray-600 hover:text-white transition-colors text-lg"
            >
              Find Us
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Special Offers</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: 25% Discount */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Dark background with red bottom */}
              <div className="relative bg-gradient-to-b from-gray-900 to-red-600 h-96">             
                
                {/* More Info Button */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Link
                    href="/special-offers"
                    className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors"
                  >
                    More Info
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: VIP Loyalty Membership */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Yellow background with orange bottom */}
              <div className="relative bg-gradient-to-b from-yellow-400 to-orange-500 h-96">
                              
                
                {/* More Info Button */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Link
                    href="/special-offers"
                    className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors"
                  >
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fan Favourites Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fan Favourites</h2>
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
                    <DishCard dish={dish} onMoreInfo={handleMoreInfo} />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {featuredDishes.map((dish, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 mx-4">
                  <div className="w-80">
                    <DishCard dish={dish} onMoreInfo={handleMoreInfo} />
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