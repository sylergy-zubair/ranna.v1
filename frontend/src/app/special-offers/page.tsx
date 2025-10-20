import Link from 'next/link';

export default function SpecialOffersPage() {
  const offers = [
    {
      title: "Lunch Special",
      description: "Get 20% off on all lunch orders between 11:00 AM - 3:00 PM",
      discount: "20% OFF",
      validUntil: "Valid until December 31, 2024",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-200"
    },
    {
      title: "Family Feast",
      description: "Order 4 or more dishes and get FREE delivery",
      discount: "FREE DELIVERY",
      validUntil: "Valid all days",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200"
    },
    {
      title: "Weekend Special",
      description: "Buy 2 main courses, get 1 appetizer FREE",
      discount: "BUY 2 GET 1 FREE",
      validUntil: "Weekends only",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200"
    },
    {
      title: "Student Discount",
      description: "Show your student ID and get 15% off on all orders",
      discount: "15% OFF",
      validUntil: "Valid for students only",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Special Offers</h1>
          <p className="text-xl text-gray-600">Great deals on authentic Indian cuisine</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Current Offers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Current Offers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offers.map((offer, index) => (
              <div
                key={index}
                className={`${offer.bgColor} ${offer.borderColor} border-2 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-2xl font-bold ${offer.textColor}`}>{offer.title}</h3>
                  <span className={`px-4 py-2 rounded-full ${offer.textColor} ${offer.bgColor} font-bold border ${offer.borderColor}`}>
                    {offer.discount}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  {offer.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">{offer.validUntil}</span>
                  <Link
                    href="/menu"
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors ${offer.textColor} border ${offer.borderColor} hover:bg-white`}
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms & Conditions</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              <strong>Important:</strong> All offers are subject to terms and conditions. Please read the details carefully.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Offers cannot be combined unless specifically stated.</li>
              <li>Valid on select items only. See menu for details.</li>
              <li>Delivery areas may be restricted for certain offers.</li>
              <li>Management reserves the right to modify or cancel offers at any time.</li>
              <li>Valid for dine-in and takeaway orders unless otherwise specified.</li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Save?</h2>
          <p className="text-lg mb-6">
            Don't miss out on these amazing offers. Order now and experience the authentic taste of India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              View Menu & Order
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
