'use client';

import { useState } from 'react';

export default function CareerPage() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const jobOpenings = [
    {
      title: "Head Chef",
      department: "Kitchen",
      location: "Main Location",
      type: "Full-time",
      description: "Lead our kitchen team and maintain the highest standards of authentic Indian cuisine.",
      requirements: [
        "5+ years experience in Indian cuisine",
        "Culinary degree or equivalent experience",
        "Leadership and team management skills",
        "Knowledge of food safety and hygiene standards"
      ],
      responsibilities: [
        "Oversee kitchen operations",
        "Train and develop kitchen staff",
        "Maintain quality standards",
        "Menu development and optimization"
      ]
    },
    {
      title: "Restaurant Manager",
      department: "Operations",
      location: "Main Location",
      type: "Full-time",
      description: "Manage daily restaurant operations and ensure exceptional customer service.",
      requirements: [
        "3+ years restaurant management experience",
        "Strong leadership and communication skills",
        "Knowledge of inventory and cost management",
        "Customer service excellence"
      ],
      responsibilities: [
        "Daily operations management",
        "Staff scheduling and training",
        "Customer service oversight",
        "Inventory and cost control"
      ]
    },
    {
      title: "Delivery Driver",
      department: "Delivery",
      location: "Multiple Locations",
      type: "Part-time/Full-time",
      description: "Join our delivery team and bring delicious food to our customers.",
      requirements: [
        "Valid driver's license",
        "Clean driving record",
        "Reliable vehicle",
        "Customer service orientation"
      ],
      responsibilities: [
        "Safe and timely food delivery",
        "Customer interaction",
        "Order verification",
        "Vehicle maintenance"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-600">Be part of the Ranna family</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why Work With Us */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Work at Ranna?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Great Team</h3>
              <p className="text-gray-600">
                Join a supportive team that values collaboration and mutual respect.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth Opportunities</h3>
              <p className="text-gray-600">
                Advance your career with training programs and promotion opportunities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍛</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Passion for Food</h3>
              <p className="text-gray-600">
                Work with people who share your passion for authentic Indian cuisine.
              </p>
            </div>
          </div>
        </div>

        {/* Current Openings */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Current Openings</h2>
          
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedJob(selectedJob === index ? null : index)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <span>📍 {job.location}</span>
                        <span>🏢 {job.department}</span>
                        <span>⏰ {job.type}</span>
                      </div>
                      <p className="text-gray-700">{job.description}</p>
                    </div>
                    <div className="ml-4">
                      <span className={`inline-block w-6 h-6 rounded-full border-2 border-gray-400 transition-transform ${selectedJob === index ? 'rotate-90' : ''}`}>
                        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                
                {selectedJob === index && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h4>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h4>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                          {job.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                          href={`mailto:careers@ranna.com?subject=Application for ${job.title}`}
                          className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors text-center"
                        >
                          Apply Now
                        </a>
                        <a
                          href="/contact"
                          className="px-6 py-3 border-2 border-orange-600 text-orange-600 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors text-center"
                        >
                          Ask Questions
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Application Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Apply</h3>
              <p className="text-gray-600 text-sm">Send us your resume and cover letter</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Review</h3>
              <p className="text-gray-600 text-sm">We review your application carefully</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Interview</h3>
              <p className="text-gray-600 text-sm">Meet with our team for an interview</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Join</h3>
              <p className="text-gray-600 text-sm">Welcome to the Ranna family!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
