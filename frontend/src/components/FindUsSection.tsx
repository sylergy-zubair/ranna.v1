import Link from 'next/link';

export default function FindUsSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
          <p className="text-lg text-gray-600">
            We have multiple Ranna locations across London. Find your nearest branch.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dine In */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dine In</h3>
              <p className="text-gray-600 mb-6">
                Freshly prepared meals in a modern curry house atmosphere.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Make a Reservation
            </Link>
          </div>

          {/* Order Online */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Online</h3>
              <p className="text-gray-600 mb-6">
                Order direct for freshly cooked curries with our exclusive online offers.
              </p>
            </div>
            <Link
              href="/order"
              className="inline-block px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
