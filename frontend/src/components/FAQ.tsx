'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string | string[];
}

interface FAQSection {
  Title: string;
  questions: FAQItem[];
}

const faqData: FAQSection[] = [
  {
    Title: "About Ranna",
    questions: [
      {
        question: "What does Ranna mean?",
        answer: "The word Ranna originated from Bangladesh and means cooking. Two friends came together over three months in 2013 and decided that Ranna was the straight-to-the-point name to represent their vision and cuisine culture."
      },
      {
        question: "What are the Core Values of Ranna?",
        answer: [
          "Quality -- Every dish is made with fresh, carefully sourced ingredients and precise cooking methods to ensure excellence.",
          "Customer Service -- We go the extra mile to make every interaction warm, respectful, and memorable.",
          "Cleanliness -- Our kitchens undergo strict daily checks to maintain top hygiene and safety standards.",
          "Time -- We value your time, preparing and delivering food promptly without compromising quality."
        ]
      }
    ]
  },
  {
    Title: "Cuisine & Menu",
    questions: [
      {
        question: "What type of cuisine do you serve?",
        answer: "We specialise in authentic Indian cuisine, offering dishes from across the Indian subcontinent, including vegetarian, vegan, meat and fish options."
      },
      {
        question: "Do you offer vegetarian and vegan options?",
        answer: "Yes! Our menu has a wide range of vegetarian and vegan dishes, clearly marked for easy selection. If you have dietary restrictions, please let us know."
      },
      {
        question: "How do you prepare food for vegan customers?",
        answer: "We use separate gravy without cream, milk, or yogurt. We substitute in boiled rice for pilau rice (as pilau contains ghee). Vegan dishes may differ slightly in taste but remain high in quality and flavour."
      },
      {
        question: "What is the difference between vegan and vegetarian at Ranna?",
        answer: "Vegetarian dishes may include dairy or eggs. Vegan dishes exclude all animal products, including dairy, eggs, honey and the like."
      },
      {
        question: "What is Quorn, and how do you use it?",
        answer: "Quorn is a high-protein, meat-free alternative made from mycoprotein, often used in place of meat. At Ranna, we offer several Quorn-based dishes, listed in our menu."
      },
      {
        question: "Is your food spicy?",
        answer: "Spice levels vary by dish, but you can request your preferred spice level when ordering. If unsure, our team can recommend dishes for you."
      },
      {
        question: "Do you accommodate dietary restrictions?",
        answer: "Yes, we offer vegetarian, vegan, and gluten-free options. Please tell us about any requirements when ordering. Our menu also clearly marks dietary options."
      },
      {
        question: "Can I customise my dish?",
        answer: "Absolutely! We accommodate ingredient substitutions and dietary needs whenever possible. Some customisations may have extra charges, which staff will confirm before completing your order."
      },
      {
        question: "What is the difference between vegan and vegetarian set meals?",
        answer: "Vegetarian set meals may include dairy-based dishes like paneer cheese or raita yoghurt. Vegan set meals exclude all animal products and are prepared with separate gravies where needed."
      },
      {
        question: "What items are gluten-free?",
        answer: "Many curries, biryanis, rice, and tandoori dishes are gluten-free. Please check our menu or inform staff when ordering so we can guide you."
      },
      {
        question: "How does Ranna handle food allergies and intolerances?",
        answer: "We take allergies seriously. Our menu highlights the 14 main allergens, and our staff can advise on suitable dishes. However, all food is prepared in kitchens where allergens are present, so cross-contamination may occur."
      },
      {
        question: "What if I have an allergy?",
        answer: "Always inform staff immediately when ordering. While we take precautions, we cannot guarantee 100% allergen-free meals due to airborne contamination. If you are highly sensitive, we recommend not ordering."
      },
      {
        question: "What desserts, drinks, and raita do you offer?",
        answer: "We offer traditional desserts, refreshing drinks, and varieties of raita yoghurt such as cucumber or onion. Options may vary - please check our menu."
      },
      {
        question: "What is a Combi Meal?",
        answer: "A Combi Meal combines multiple dishes into one set, offering better value and variety. Ideal for sharing or trying different items without ordering full portions."
      }
    ]
  },
  {
    Title: "Dining & Reservations",
    questions: [
      {
        question: "Can I make a reservation?",
        answer: "Yes, you can book a table online or by phone. Note: two branches are takeaway-only and don't accept reservations."
      },
      {
        question: "Do you sell alcohol, or can I bring my own?",
        answer: "No, we don't serve or allow alcohol in the premises. Some restaurants serve refreshing mocktails instead."
      },
      {
        question: "Can I host a private event at your restaurant?",
        answer: "Yes, we cater private events. Please email customerservice@ranna.co.uk to discuss requirements."
      },
      {
        question: "When are you closed during the year?",
        answer: "We are closed on Christmas Day and two Eid days. Some sites may remain open, so please confirm with your local branch."
      },
      {
        question: "What are your hours of operation?",
        answer: "Most branches are open from 4pm to 11pm daily, though hours may vary by location."
      }
    ]
  },
  {
    Title: "Ordering & Delivery",
    questions: [
      {
        question: "Do you offer takeout and delivery services?",
        answer: "Yes, we provide both takeaway and delivery. Please check our website for delivery zones and charges."
      }
    ]
  }
];

export default function FAQ() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  const toggleSection = (sectionTitle: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionTitle)) {
      newOpenSections.delete(sectionTitle);
    } else {
      newOpenSections.add(sectionTitle);
    }
    setOpenSections(newOpenSections);
  };

  const toggleQuestion = (questionKey: string) => {
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(questionKey)) {
      newOpenQuestions.delete(questionKey);
    } else {
      newOpenQuestions.add(questionKey);
    }
    setOpenQuestions(newOpenQuestions);
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">FAQ</h1>
          <p className="text-lg text-gray-600">Have questions? Contact us and we&apos;ll be happy to help.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.Title)}
                className="w-full text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{section.Title}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out ${
                      openSections.has(section.Title) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Questions within section */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openSections.has(section.Title) 
                  ? 'max-h-[2000px] opacity-100 mt-2' 
                  : 'max-h-0 opacity-0'
              }`}>
                <div className="space-y-2">
                  {section.questions.map((item, questionIndex) => {
                    const questionKey = `${section.Title}-${questionIndex}`;
                    return (
                      <div key={questionIndex} className="ml-4">
                        <button
                          onClick={() => toggleQuestion(questionKey)}
                          className="w-full text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 transition-colors duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-md font-medium text-gray-800">{item.question}</h4>
                            <svg
                              className={`w-4 h-4 text-gray-500 transition-transform duration-300 ease-in-out ${
                                openQuestions.has(questionKey) ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>

                        {/* Answer */}
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openQuestions.has(questionKey) 
                            ? 'max-h-[500px] opacity-100 mt-2' 
                            : 'max-h-0 opacity-0'
                        }`}>
                          <div className="ml-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                            {Array.isArray(item.answer) ? (
                              <ul className="space-y-2">
                                {item.answer.map((point, pointIndex) => (
                                  <li key={pointIndex} className="text-gray-700">
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-700">{item.answer}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
