
import Image from 'next/image';

export default function OurStoryPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 italic">
            Being your appetite to life with <span className="italic">Ranna</span>
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
        </div>
      </section>

      {/* Image-Text Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                <Image
                  src="/img/33.png"
                  alt="Our Story - Ranna Restaurant"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                <p>
                  At Ranna, we blend age-old Indian traditions with modern creativity to bring you a memorable dining experience. Every dish is prepared with genuine care, fresh ingredients, and a deep respect for flavour.
                </p>
                
                <p>
                  The word Ranna originated from Bangladesh and means &apos;cooking&apos;. In 2013, two friends came together and decided that Ranna was the straight-to-the-point name to represent their vision and cuisine culture.
                </p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Vision</h2>
              <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                <p>
                  We are actively building our reputation across London as a brand recognised for delivering the authentic taste of India to people&apos;s homes.
                </p>
                
                <p>
                  Over the next decade, we see that growing even further on the strength of our excellence, reliability, and cultural connection.
                </p>
                
                <p>
                  We have a community of loyal customers, dedicated staff, and shared purpose, bringing about lasting moments over great food.
                </p>
              </div>
            </div>
            
            {/* Image */}
            <div className="order-2 lg:order-2">
            <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                <Image
                  src="/img/11.png"
                  alt="Our Story - Ranna Restaurant"
                  fill
                  className="object-cover"
                />
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
            <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                <Image
                  src="/img/22.png"
                  alt="Our Story - Ranna Restaurant"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Text */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
              <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                <p>
                  We want to earn the title of your kitchen away from home - bringing the vibrant flavours of authentic Indian cuisine to our community with a steadfast commitment to quality, cleanliness, outstanding customer service, and timeliness.
                </p>
                
                <p>
                  Our seamless takeaway and dining experience, where each plate reflects our passion for great food and respect for our customers&apos; time, is already highly rated. We aim to always serve with care, fresh ingredients, and a dedication to getting everything right.
                </p>
                
                <p>
                  We welcome your suggestions on how we can continue to improve at <strong>customerservice@ranna.co.uk</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}