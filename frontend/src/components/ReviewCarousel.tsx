'use client';

import { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import { Review } from '@/types/review';

export default function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await fetch('/data/Ranna_reviews.json');
        if (!response.ok) {
          throw new Error('Failed to load reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error('Error loading reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Filter out reviews with missing essential data
  const validReviews = reviews.filter(review => 
    review.review && review.name && review.star > 0
  );

  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error loading reviews: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (validReviews.length === 0) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500">No reviews available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Real reviews from real customers
          </p>
        </div>

        {/* Continuous Scrolling Carousel */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          {/* Scrolling Container */}
          <div className="flex animate-scroll">
            {/* First set of reviews */}
            {validReviews.map((review, index) => (
              <div key={`first-${index}`} className="flex-shrink-0 mx-4">
                <div className="w-80">
                  <ReviewCard review={review} index={index} />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {validReviews.map((review, index) => (
              <div key={`second-${index}`} className="flex-shrink-0 mx-4">
                <div className="w-80">
                  <ReviewCard review={review} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
