'use client';

import { useState } from 'react';
import FAQ from '@/components/FAQ';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
    date: '',
    time: '',
    location: '',
    guests: '',
    rating: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (formData.reason === 'review' && !formData.rating) {
      e.preventDefault();
      alert('Please select a star rating for your review.');
      return;
    }

    setIsSubmitting(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
          <h1 className="text-5xl font-bold text-black">Contact Us</h1>
          <p className="text-xl text-gray-600 ">Have a question or a bit of feedback? We&apos;re always happy to listen.</p>
          <p className="text-lg text-gray-500">Drop us a line and we&apos;ll do our best to help.</p>
        </div>
      </section>

 {/* Embedded Store Locator */}
 <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://c1842afadfb9404ba403ddc7e96b0d10.elf.site"
              className="w-full h-[800px] border-0"
              title="Store Locator"
              allow="geolocation"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            {/* Contact Form */}
            <div>
            <div id="form" className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h1>
              
              <form
                action="https://formsubmit.co/customerservice@ranna.co.uk"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="Ranna – Contact Form" />
                <input type="hidden" name="_next" value="https://www.ranna.co.uk/contact?submitted=true" />
                <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
                <input type="hidden" name="rating" value={formData.rating} />
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                    placeholder="Full Name"
                  />
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                    value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                      placeholder="youremail@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                      placeholder="+44 0712345678"
                    />
                  </div>
                </div>

                {/* Reason for Contacting */}
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Contacting *
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    required
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 appearance-none"
                  >
                    <option value="">Select...</option>
                    <option value="general">General Enquiry</option>
                    <option value="booking">Table Reservation</option>
                    <option value="review">Review</option>
                  </select>
                </div>

                {/* Star Rating - Only show when reason is "review" */}
                {formData.reason === 'review' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How would you rate your experience? *
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({...formData, rating: star.toString()})}
                          className={`text-3xl transition-colors duration-200 ${
                            parseInt(formData.rating) >= star 
                              ? 'text-yellow-400' 
                              : 'text-gray-300 hover:text-yellow-400'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    {formData.rating && (
                      <p className="text-sm text-gray-600 mt-2">
                        {formData.rating} star{formData.rating !== '1' ? 's' : ''} selected
                      </p>
                    )}
                  </div>
                )}

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 resize-none"
                    placeholder="Type your message"
                  />
                </div>

                {/* Table Reservations Section - Only show when reason is "booking" */}
                {formData.reason === 'booking' && (
                  <div className="bg-gray-50 border-2 border-red-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Please provide the following information for table reservations:
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date Field */}
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                        Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="date"
                          name="date"
                          required={formData.reason === 'booking'}
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                          placeholder="dd/mm/yyyy"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Time Field */}
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                        Time *
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          id="time"
                          name="time"
                          required={formData.reason === 'booking'}
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                          placeholder="--:--"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Location Selector */}
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                        Location Selector *
                      </label>
                      <select
                        id="location"
                        name="location"
                        required={formData.reason === 'booking'}
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 appearance-none"
                      >
                        <option value="">Select...</option>
                        <option value="old-kent">Old Kent</option>
                        <option value="dalston">Dalston</option>
                        <option value="walthamstow">Walthamstow</option>
                      </select>
                    </div>

                    {/* Number of Guests */}
                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Guests *
                      </label>
                      <input
                        type="number"
                        id="guests"
                        name="guests"
                        required={formData.reason === 'booking'}
                        min="1"
                        max="20"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                        placeholder="Select a number"
                      />
                    </div>
                  </div>
                </div>
                )}

                {/* Send Message Button */}
                 <button
                   type="submit"
                   className="w-fit bg-red-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-700 transition-colors"
                   style={{ backgroundColor: '#FF4036' }}
                 >
                   {isSubmitting ? 'Thank you!' : 'Send Message'}
                 </button>
              </form>
            </div>
            </div>
          </div>
        </div>
      </main>

     

      {/* FAQ Section */}
      <section id="faq"><FAQ /></section>
      
    </div>
  );
}
