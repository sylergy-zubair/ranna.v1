'use client';

import Image from 'next/image';
import { ReviewCardProps } from '@/types/review';

export default function ReviewCard({ review }: ReviewCardProps) {
  // Skip rendering if essential data is missing
  if (!review.review || !review.name) {
    return null;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xl ${
          i < rating ? 'text-red-500' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  const formatDate = () => {
    // Generate a random date for demo purposes
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[Math.floor(Math.random() * 12)];
    const year = 2020 + Math.floor(Math.random() * 4);
    return `${month} ${year}`;
  };

  return (
    <div className="relative">
      {/* Review Card */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
        {/* Star Rating */}
        <div className="flex items-center mb-4">
          {renderStars(review.star)}
        </div>

        {/* Review Title */}
        {review.title && (
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {review.title}
            <span className="text-sm font-normal text-gray-600 italic ml-2">
              – {formatDate()}
            </span>
          </h3>
        )}

        {/* Review Text */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          {review.review}
        </p>

        {/* Reviewer Information */}
        <div className="flex items-center">
          {/* Profile Image Placeholder */}
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
            {review.image ? (
              <Image
                src={review.image}
                alt={review.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {review.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Reviewer Details */}
          <div className="flex-1">
            <div className="font-bold text-gray-900">
              {review.name}
            </div>
            {review.review_url && (
              <div className="text-sm text-gray-500">
                <a
                  href={review.review_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 transition-colors"
                >
                  Read on Tripadvisor
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
