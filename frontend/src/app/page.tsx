import Link from 'next/link';
import CustomerReviews from '@/components/CustomerReviews';
import FindUsSection from '@/components/FindUsSection';

export default function Home() {
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
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-12">Quick Heat. big flavour</h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/menu"
              className="px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors text-lg"
            >
              Menu
            </Link>
            <Link
              href="/special-offers"
              className="px-8 py-4 border-2 border-orange-600 text-orange-600 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors text-lg"
            >
              Special Offers
            </Link>
            <Link
              href="#"
              className="px-8 py-4 border-2 border-gray-600 text-gray-600 rounded-lg font-semibold hover:bg-gray-600 hover:text-white transition-colors text-lg"
            >
              Find Us
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Special Offers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-4">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500">Special Offer {item}</span>
                  </div>
                  <Link
                    href="/special-offers"
                    className="inline-block px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                  >
                    More Info
                  </Link>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• Naaga</div>
                  <div>• Raita</div>
                  <div>• Raita</div>
                  <div>• Raita</div>
                  <div>• Chutney</div>
                  <div>• Chutney</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fan Favourites Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Fan Favourites</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 rounded-lg shadow-lg p-6">
                <div className="mb-4">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500">Fan Favorite {item}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• Naaga</div>
                  <div>• Raita</div>
                  <div>• Raita</div>
                  <div>• Raita</div>
                  <div>• Chutney</div>
                  <div>• Chutney</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Find Us Section */}
      <FindUsSection />
    </div>
  );
}