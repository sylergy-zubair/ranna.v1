export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h1>
          <p className="text-xl text-gray-600">The journey of authentic Indian flavors</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Beginning</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Ranna, where every dish tells a story of tradition, family, and the rich culinary heritage of India. 
              Our journey began with a simple dream: to share the authentic flavors of Indian cuisine with the world.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in the heart of our community, Ranna was born from generations of culinary expertise and a deep passion 
              for bringing people together through the universal language of food.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Philosophy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Ranna, we believe that great food starts with great ingredients. We carefully source the finest spices, 
              freshest vegetables, and highest quality meats to create dishes that honor traditional recipes while meeting 
              modern standards of excellence.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Every recipe in our kitchen has been passed down through generations, refined with love, and prepared with 
              the same care and attention that you would find in a traditional Indian home.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
                <p className="text-gray-700 leading-relaxed">
                  We use only the finest ingredients and traditional cooking methods to ensure every dish meets our high standards.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Authenticity</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our recipes stay true to their origins, preserving the authentic flavors that make Indian cuisine so special.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-700 leading-relaxed">
                  We believe food brings people together and are proud to be part of our local community.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-700 leading-relaxed">
                  While staying true to tradition, we embrace modern techniques to enhance quality and service.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Story</h2>
            <p className="text-lg mb-6">
              Be part of the Ranna family and experience the authentic taste of India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/menu"
                className="px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                View Our Menu
              </a>
              <a
                href="/contact"
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
