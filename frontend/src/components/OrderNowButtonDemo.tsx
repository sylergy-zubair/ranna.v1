'use client';

import OrderNowButton from './OrderNowButton';

/**
 * Demo component showcasing all OrderNowButton variants and options
 * This can be used as a reference for implementing the button in different contexts
 */
export default function OrderNowButtonDemo() {
  return (
    <div className="p-8 bg-gray-50 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">OrderNowButton Component Demo</h1>
      
      {/* Variants */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <OrderNowButton variant="primary" />
          <OrderNowButton variant="secondary" />
          <OrderNowButton variant="outline" />
          <OrderNowButton variant="ghost" />
          <OrderNowButton variant="gradient" />
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <OrderNowButton size="sm" />
          <OrderNowButton size="md" />
          <OrderNowButton size="lg" />
          <OrderNowButton size="xl" />
        </div>
      </section>

      {/* Colors */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Colors</h2>
        <div className="flex flex-wrap gap-4">
          <OrderNowButton color="orange" />
          <OrderNowButton color="red" />
          <OrderNowButton color="blue" />
          <OrderNowButton color="green" />
          <OrderNowButton color="gray" />
          <OrderNowButton color="white" />
        </div>
      </section>

      {/* Effects */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Effects</h2>
        <div className="flex flex-wrap gap-4">
          <OrderNowButton shadow />
          <OrderNowButton glowEffect />
          <OrderNowButton pulseEffect />
          <OrderNowButton bounce />
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">With Icons</h2>
        <div className="flex flex-wrap gap-4">
          <OrderNowButton 
            icon="🛒" 
            iconPosition="left"
            text="Cart"
          />
          <OrderNowButton 
            icon="📱" 
            iconPosition="right"
            text="Order via App"
          />
          <OrderNowButton 
            icon="🚚"
            text="Delivery"
            color="blue"
          />
        </div>
      </section>

      {/* States */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">States</h2>
        <div className="flex flex-wrap gap-4">
          <OrderNowButton />
          <OrderNowButton disabled />
          <OrderNowButton loading />
        </div>
      </section>

      {/* Full Width */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Full Width</h2>
        <OrderNowButton fullWidth />
      </section>

      {/* Custom Usage Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Custom Examples</h2>
        
        {/* Hero Section Button */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-8 rounded-lg mb-4">
          <h3 className="text-white text-xl mb-4">Hero Section Style</h3>
          <OrderNowButton 
            variant="outline"
            color="white"
            size="xl"
            fullWidth
            glowEffect
            text="Get Started Today"
          />
        </div>

        {/* Card Button */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-900 text-xl mb-4">Card Style</h3>
          <div className="flex gap-3">
            <OrderNowButton 
              variant="primary" 
              size="lg"
              glowEffect
              text="Order Now"
            />
            <OrderNowButton 
              variant="outline" 
              size="lg"
              text="Learn More"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
