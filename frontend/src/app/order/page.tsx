import Link from 'next/link';

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Now</h1>
          <p className="text-xl text-gray-600">Choose your preferred ordering method</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Ordering Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Online Ordering */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📱</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Online Ordering</h2>
            <p className="text-gray-600 mb-6">
              Browse our full menu, customize your order, and pay securely online for pickup or delivery.
            </p>
            <Link
              href="/menu"
              className="inline-block px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Order Online
            </Link>
          </div>

          {/* Phone Orders */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📞</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Phone Orders</h2>
            <p className="text-gray-600 mb-6">
              Call us directly for personal service and expert recommendations from our team.
            </p>
            <a
              href="tel:+15551234567"
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              (555) 123-4567
            </a>
          </div>

          {/* Walk-in */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🚪</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dine In</h2>
            <p className="text-gray-600 mb-6">
              Experience our warm atmosphere and fresh food prepared right in front of you.
            </p>
            <div className="text-sm text-gray-500">
              <p className="font-semibold">Hours:</p>
              <p>Mon-Fri: 11:00 AM - 10:00 PM</p>
              <p>Sat-Sun: 10:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Delivery Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Areas</h3>
              <div className="space-y-2 text-gray-700">
                <p>• Within 5 miles radius: FREE delivery</p>
                <p>• 5-10 miles radius: $3.99 delivery fee</p>
                <p>• 10+ miles: Please call to check availability</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Times</h3>
              <div className="space-y-2 text-gray-700">
                <p>• Estimated time: 30-45 minutes</p>
                <p>• Peak hours (6-8 PM): 45-60 minutes</p>
                <p>• Minimum order: $25 for delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg mb-6">
            Experience the authentic taste of India with our carefully crafted menu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              Browse Menu
            </Link>
            <a
              href="tel:+15551234567"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
