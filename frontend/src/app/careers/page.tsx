'use client';

import { useState } from 'react';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    homeAddress: '',
    phone: '',
    email: '',
    experience: '',
    branch: '',
    position: '',
    timeAvailable: '',
    daysAvailable: [] as string[],
    transportMode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      const day = (e.target as HTMLInputElement).value;
      
      if (name === 'daysAvailable') {
        setFormData(prev => ({
          ...prev,
          daysAvailable: checked 
            ? [...prev.daysAvailable, day]
            : prev.daysAvailable.filter(d => d !== day)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    alert('Thank you for your application! We will get back to you soon.');
    // Reset form
    setFormData({
      fullName: '',
      homeAddress: '',
      phone: '',
      email: '',
      experience: '',
      branch: '',
      position: '',
      timeAvailable: '',
      daysAvailable: [],
      transportMode: ''
    });
  };

  const jobPositions = [
    {
      title: 'Store Manager',
      description: [
        'Oversee daily operations of the branch.',
        'Manage staff schedules, performance, and training.',
        'Ensure compliance with food safety, hygiene, and company policies.',
        'Handle customer service issues and complaints.',
        'Monitor sales, costs, stock control, and cash handling.'
      ]
    },
    {
      title: 'Front House',
      description: [
        'Greet and serve customers in-store, manage orders, and handle payments.',
        'Provide excellent customer service and resolve minor issues.',
        'Ensure the dining/collection area is clean, organised, and welcoming.',
        'Assist with online/phone order management.',
        'Liaise with delivery drivers and kitchen staff.'
      ]
    },
    {
      title: 'Head Chef',
      description: [
        'Lead the kitchen team, plan menus, and oversee food preparation.',
        'Maintain consistency and quality of dishes (curries, rice, tandoori, etc.).',
        'Manage stock levels, ordering, and supplier relations.',
        'Train and supervise chefs and kitchen assistants.',
        'Ensure kitchen hygiene, HACCP standards, and allergen compliance.'
      ]
    },
    {
      title: 'Head Cook/2nd Head Chef',
      description: [
        'Support Head Chef in leading kitchen operations.',
        'Take charge in absence of Head Chef.',
        'Supervise cooking staff and ensure quality control.',
        'Assist in menu planning, prep organisation, and stock management.'
      ]
    },
    {
      title: '2nd Cook',
      description: [
        'Prepare curries, sauces, and sides to standard recipes.',
        'Assist with prep work, cutting, and marination.',
        'Ensure portion control and presentation.',
        'Support senior chefs and maintain hygiene standards.'
      ]
    },
    {
      title: '3rd Cook',
      description: [
        'Assist in preparation of rice, starters, and simpler dishes.',
        'Support senior cooks with bulk cooking and prep.',
        'Maintain kitchen cleanliness and assist with dish-out.',
        'Train under supervision for career progression.'
      ]
    },
    {
      title: 'Tandoori Chef',
      description: [
        'Prepare and cook breads (naan, roti), grilled meats, kebabs, and tandoori dishes.',
        'Manage and maintain the tandoor oven.',
        'Ensure consistency, correct marination, and traditional cooking methods.',
        'Support the Head Chef with menu specials.'
      ]
    },
    {
      title: 'Kitchen Assistant',
      description: [
        'Assist with prep work (chopping vegetables, peeling, cleaning).',
        'Wash dishes, clean kitchen surfaces, and handle waste disposal.',
        'Support chefs during busy service hours.',
        'Maintain hygiene and food safety standards.'
      ]
    },
    {
      title: 'Delivery Driver',
      description: [
        'Deliver food orders to customers safely and promptly.',
        'Handle cash/card-on-delivery payments if applicable.',
        'Provide professional customer service at the doorstep.',
        'Maintain delivery equipment (bags, scooter/car, etc.).',
        'Follow health & safety and traffic regulations.'
      ]
    },
    {
      title: 'Contract Delivery Driver',
      description: [
        'Deliver orders under contract terms, using own vehicle.',
        'Ensure timely delivery and safe handling of food.',
        'Represent Ranna professionally to customers.',
        'Responsible for fuel, insurance, and vehicle upkeep.',
        'Must comply with food handling and hygiene standards.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Careers</h1>
            <p className="text-xl text-gray-600 mb-8">
              Interested in working at Ranna?
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Submit your details below, and we'll get back to you to discuss which of our teams might be a good fit for you.
            </p>
            <div className="mt-8 p-6 bg-orange-50 rounded-lg max-w-4xl mx-auto">
              <p className="text-gray-800">
                At Ranna, we focus on four key values: <strong>Customer Service, Time Management, Cleanliness, and Quality</strong>.
              </p>
              <p className="text-gray-800 mt-2">
                We expect all team members to demonstrate these values in everything they do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Application Form - Full Width Row */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Career</h2>
          <p className="text-gray-600 mb-6">
            <strong>Current Position Available:</strong><br />
            No Position currently available, however you can put forward your interest by filling up the form below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Email */}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Branch Selector */}
              <div>
                <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
                  Branch Selector *
                </label>
                <select
                  id="branch"
                  name="branch"
                  required
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select…</option>
                  <option value="bow">Bow Branch</option>
                  <option value="dalston">Dalston Branch</option>
                  <option value="southwoodford">Southwoodford Branch</option>
                  <option value="old-kent">Old Kent Branch</option>
                  <option value="walthamstow">Walthamstow Branch</option>
                </select>
              </div>

              {/* Position Applying For */}
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                  Position Applying For *
                </label>
                <select
                  id="position"
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select…</option>
                  <option value="store-manager">Store Manager</option>
                  <option value="front-house">Front House</option>
                  <option value="head-chef">Head Chef</option>
                  <option value="head-cook">Head Cook</option>
                  <option value="2nd-cook">2nd Cook</option>
                  <option value="3rd-cook">3rd Cook</option>
                  <option value="tandoori-chef">Tandoori Chef</option>
                  <option value="kitchen-assistant">Kitchen Assistant</option>
                  <option value="delivery-driver">Delivery Driver</option>
                  <option value="contract-delivery-driver">Contract Delivery Driver</option>
                </select>
              </div>

              {/* Time Available */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Time available *</label>
                <div className="space-y-2">
                  {['Part Time', 'Full Time', 'Weekends'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="timeAvailable"
                        value={option.toLowerCase().replace(' ', '-')}
                        checked={formData.timeAvailable === option.toLowerCase().replace(' ', '-')}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Home Address - Full Width */}
            <div>
              <label htmlFor="homeAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Home Address *
              </label>
              <textarea
                id="homeAddress"
                name="homeAddress"
                required
                rows={3}
                value={formData.homeAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Experience - Full Width */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                Experience *
              </label>
              <textarea
                id="experience"
                name="experience"
                required
                rows={4}
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Please describe your relevant experience..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Days Available */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Days available (*Only applicable to part-time positions)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        name="daysAvailable"
                        value={day.toLowerCase()}
                        checked={formData.daysAvailable.includes(day.toLowerCase())}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Driver Mode Transport */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Driver Mode Transport (*select if applying for a driver position)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Bicycle', 'E-Bike', 'Motor Bike', 'Car'].map((mode) => (
                    <label key={mode} className="flex items-center">
                      <input
                        type="radio"
                        name="transportMode"
                        value={mode.toLowerCase().replace(' ', '-')}
                        checked={formData.transportMode === mode.toLowerCase().replace(' ', '-')}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-gray-700">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-red-700 transition-colors"
              style={{ backgroundColor: '#FF4036' }}
            >
              Submit
            </button>
          </form>
        </div>

        {/* Job Positions - 2 Columns, 5 Rows Grid */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Roles at Ranna</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobPositions.map((job, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">#{job.title}</h3>
                <ul className="space-y-2">
                  {job.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700 flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 text-red-600 hover:text-red-700 font-medium">
                  View Job Desc.
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
