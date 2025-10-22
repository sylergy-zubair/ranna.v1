'use client';

import { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import { Review } from '@/types/review';

export default function ReviewsSection() {
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

  // Filter out reviews with missing essential data
  const validReviews = reviews.filter(review => 
    review.review && review.name && review.star > 0
  );

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

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {validReviews.map((review, index) => (
            <ReviewCard
              key={index}
              review={review}
              index={index}
            />
          ))}
        </div>

        {/* Show message if no valid reviews */}
        {validReviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No reviews available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
