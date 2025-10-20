import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Exclusive Offers */}
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Exclusive Offers</h3>
              <p className="text-gray-300 mb-4">
                Subscribe for exclusive vouchers, offers and money off.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              <p className="mb-2">Your Kitchen Away From Home</p>
            </div>
          </div>

          {/* Menu Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/menu" className="text-gray-300 hover:text-white transition-colors">Our Menu</Link></li>
              <li><Link href="/special-offers" className="text-gray-300 hover:text-white transition-colors">Special Offers</Link></li>
              <li><Link href="/order" className="text-gray-300 hover:text-white transition-colors">Order Now</Link></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Read Reviews</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Write a Review</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/our-story" className="text-gray-300 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Find Us</Link></li>
              <li><Link href="/career" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Ranna IC
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy policy</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookies Policy</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
