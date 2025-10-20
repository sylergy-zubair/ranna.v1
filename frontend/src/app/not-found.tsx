import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-orange-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>
        
        <div className="mb-8">
          <p className="text-gray-700 mb-6">
            The page you requested might have been moved, deleted, or doesn&apos;t exist.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/menu"
              className="px-8 py-3 border-2 border-orange-600 text-orange-600 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link href="/menu" className="text-orange-600 hover:text-orange-700">
              Menu
            </Link>
            <Link href="/our-story" className="text-orange-600 hover:text-orange-700">
              Our Story
            </Link>
            <Link href="/contact" className="text-orange-600 hover:text-orange-700">
              Contact
            </Link>
            <Link href="/order" className="text-orange-600 hover:text-orange-700">
              Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
