import Link from 'next/link';
import OrderNowButton from './OrderNowButton';

export default function FindUsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Find Us Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-gray-500 text-sm">Map Image</span>
              </div>
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
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-gray-500 text-sm">Restaurant Image</span>
              </div>
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
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="text-gray-500 text-sm">Delivery Image</span>
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Online</h3>
              <p className="text-gray-600 mb-6">
                Order direct for freshly cooked curries with our exclusive online offers.
              </p>
              <OrderNowButton
                text="Order Now"
                className="inline-block w-fit bg-red-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-700 transition-colors text-center"
                style={{ backgroundColor: '#FF4036' }}
                openModal={true}
                onModalOpen={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
