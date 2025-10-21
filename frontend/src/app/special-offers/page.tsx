import Link from 'next/link';

export default function SpecialOffersPage() {
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
    }
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">Special Offers</h1>
          <p className="text-xl text-gray-600 mb-8">
            For more exclusive special offers, subscribe to our email list.
          </p>
        </div>
      </section>

      {/* Image-Text Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative h-96 w-full bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-orange-100 to-red-100">
                  <span className="text-2xl text-gray-600 font-semibold">Special Offer 1 Image</span>
                </div>
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
                <Link
                  href="/order"
                  className="inline-block w-full text-center px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  PLACE AN ORDER NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text-Image Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="order-1 lg:order-1">
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
                <Link
                  href="/order"
                  className="inline-block w-full text-center px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  PLACE AN ORDER NOW
                </Link>
              </div>
            </div>
            
            {/* Image */}
            <div className="order-2 lg:order-2">
              <div className="relative h-96 w-full bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-red-100 to-orange-100">
                  <span className="text-2xl text-gray-600 font-semibold">Special Offer 2 Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image-Text Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative h-96 w-full bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-orange-100 to-red-100">
                  <span className="text-2xl text-gray-600 font-semibold">Special Offer 3 Image</span>
                </div>
              </div>
            </div>
            
            {/* Text */}
            <div className="order-1 lg:order-2">
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
                <Link
                  href="/order"
                  className="inline-block w-full text-center px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  PLACE AN ORDER NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Terms & Conditions:</h2>
          
          <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
            <div className="space-y-4">
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
    </div>
  );
}