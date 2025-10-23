export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Cookies Policy – Ranna</strong></p>
            <p>Effective Date: 1 October 2025</p>
          </div>
          <p className="text-gray-700 mt-6">
            At <strong>Ranna</strong>, we use cookies and similar tracking technologies to enhance your experience, analyse site usage, and personalise content. This Cookie Policy explains what cookies are, how we use them, and how you can manage your preferences.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          
          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Cookies and How They Benefit You</h2>
            <p className="text-gray-700 mb-4">
              Our website uses cookies, as almost all websites do, to help provide you with the best experience we can. Cookies are small text files that are placed on your device when you browse websites.
            </p>
            <p className="text-gray-700 mb-4">Our cookies help us:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Make our website work as you'd expect</li>
              <li>Save you from logging in every time you visit</li>
              <li>Remember your settings during and between visits</li>
              <li>Improve the speed and security of the site</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. What We Do Not Use Cookies For</h2>
            <p className="text-gray-700 mb-4">We do not use cookies to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Collect any personally identifiable information (without your express permission)</li>
              <li>Collect sensitive information (without your express permission)</li>
              <li>Pass data to advertising networks</li>
              <li>Pass personally identifiable data to third parties</li>
              <li>Pay sales commissions</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Granting Us Permission to Use Cookies</h2>
            <p className="text-gray-700">
              If your browser is set to accept cookies, we take this – and your continued use of our website – as consent for us to use cookies. If you do not want cookies, you can disable them in your browser (see Section 6).
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Types of Cookies We Use</h2>
            
            <h3 className="text-lg font-bold text-gray-900 mb-3">a) Website Function Cookies – our own cookies</h3>
            <p className="text-gray-700 mb-4">We use these to make our website work, including:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Shopping basket and checkout</li>
              <li>Determining if you are logged in</li>
              <li>Remembering if you accepted our terms and conditions</li>
              <li>Tailoring content to your needs</li>
            </ul>
            <p className="text-gray-700 mb-6">
              These cookies are essential – if you disable them, our website may not function properly.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mb-3">b) Anonymous Visitor Statistics Cookies – analytics cookies</h3>
            <p className="text-gray-700 mb-4">We use Google Analytics to collect visitor statistics such as:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>How many people visited our website</li>
              <li>What technology they used (e.g. Windows, iOS)</li>
              <li>How long they spent on the site and which pages they viewed</li>
              <li>Whether they have visited before or how they found us</li>
            </ul>
            <p className="text-gray-700 mb-6">
              This helps us improve our website and services. Analytics cookies are anonymous.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mb-3">c) Third-Party Function Cookies</h3>
            <p className="text-gray-700">
              Our website may include third-party functionality (for example, embedded YouTube videos or social media plugins). These may set their own cookies. Disabling them may break certain website functions.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Turning Cookies Off</h2>
            <p className="text-gray-700 mb-4">
              You can usually switch cookies off by adjusting your browser settings to stop accepting cookies. However, doing so may limit the functionality of our website and many others, since cookies are a standard part of modern websites.
            </p>
            <p className="text-gray-700">
              For more information about cookies or how to disable them, visit:<br />
              <a href="https://www.allaboutcookies.org" className="text-red-600 hover:text-red-700 underline" target="_blank" rel="noopener noreferrer">
                www.allaboutcookies.org
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
