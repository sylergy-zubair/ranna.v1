export default function CustomerReviews() {
  const reviews = [
    {
      title: "Best Curry in Bow",
      date: "October 2020",
      content: "Hands down the best curry house in Bow. I order here once a week and it's always delicious and to a very high standard.",
      author: "@seluwy",
      platform: "Read on Tripadvisor"
    },
    {
      title: "Great Indian food",
      date: "November 2019", 
      content: "Three of us loved the quality & quantity. I've eaten Indian food all over the world and have not enjoyed it as much as this.",
      author: "KevGSmith",
      platform: "Read on Tripadvisor"
    },
    {
      title: "Amazing!!",
      date: "July 2015",
      content: "You must order from this place. The saag aloo is the best I've ever had, and the chicken chat purée is just how it should be. Top class A+.",
      author: "We8spurs", 
      platform: "Read on Tripadvisor"
    },
    {
      title: "August 2025",
      date: "August 2025",
      content: "Really great food at very reasonable prices. Bring your appetite with you - the portions are huge! Any of the biryanis are amazing. Highly recommend.",
      author: "Nancy Navin",
      platform: "Read on Google"
    },
    {
      title: "Best Indian in the area",
      date: "",
      content: "Best Indian in the area by far. Chicken tikka balti is the standout dish for me. Highly recommend giving it a go.",
      author: "Mathew Andreucetti",
      platform: "Read on Google"
    },
    {
      title: "Best Indian food in Dalston",
      date: "September 2025", 
      content: "Best Indian food in Dalston. The onion bhajis and peshwari naan are my go-to with any of their delicious curries.",
      author: "Tamar van der Hoek",
      platform: "Read on Google"
    },
    {
      title: "Everything is amazing",
      date: "June 2025",
      content: "Everything I ever order from here is amazing. Each curry has its own individual taste. Order direct from their website - it's much cheaper than Deliveroo.",
      author: "Alex Wernick", 
      platform: "Read on Google"
    },
    {
      title: "Best Indian we have found",
      date: "February 2025",
      content: "Best Indian we have found in London! They even left us a lovely birthday note in our delivery ☺️ 10/10 would recommend Ranna Dalston - worth the money!",
      author: "Louise Friel",
      platform: "Read on Google"
    },
    {
      title: "Fantastic food",
      date: "April 2025",
      content: "Have ordered delivery from Ranna many times over the months - the food is fantastic. Highly recommended!",
      author: "Chris Dunn",
      platform: "Read on Google"
    },
    {
      title: "Quorn magic",
      date: "October 2024",
      content: "Being able to have Quorn with any of the curries is great - they've done something magic with it. We've found our new regular curry house!",
      author: "Richard John",
      platform: "Read on Google"
    },
    {
      title: "Soooo good",
      date: "November 2024", 
      content: "Food is soooo good. The best curry I've had in so long, speedy delivery too. A good treat!",
      author: "Zoe Davies",
      platform: "Read on Google"
    },
    {
      title: "Delicious curry",
      date: "December 2024",
      content: "Delicious curry, highly recommend the Butter Paneer and Sylheti Chicken. Large portions and great value - we'll definitely be ordering again",
      author: "Rachel",
      platform: "Read on Google"
    },
    {
      title: "My favourite",
      date: "November 2024",
      content: "I've settled on Ranna as my favourite after living in N16 for many years. Amazing food, particularly the paneer tikka and chicken karai - but it's all excellent.",
      author: "Catherine Spence", 
      platform: "Read on Google"
    },
    {
      title: "Found our place",
      date: "October 2024",
      content: "Been living in London for a year now and hadn't found a curry place I liked - until now. OMG. The portion sizes are great too.",
      author: "Luci D",
      platform: "Read on Google"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  <strong>{review.title}</strong> {review.date && `– ${review.date}`}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {review.content}
                </p>
                <div className="text-sm">
                  <span className="font-medium">{review.author}</span>
                  <div className="text-gray-500">{review.platform}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
