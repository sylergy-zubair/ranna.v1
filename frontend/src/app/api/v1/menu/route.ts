import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://ranna-v1.vercel.app' // Your actual backend URL
    : 'https://ranna-v1.vercel.app'); // Use production backend for local dev too

export async function GET() {
  try {
    console.log('Proxying menu request to backend:', `${BACKEND_URL}/api/v1/menu`);
    
    // Create a timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    const response = await fetch(`${BACKEND_URL}/api/v1/menu`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('Backend API error:', response.status, response.statusText);
      // If backend is not available, throw error to trigger fallback
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Backend API response received:', data.success ? 'Success' : 'Failed');
    
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Error proxying to backend:', error);
    
    // Return mock data when backend is unavailable (both development and production)
    console.log('Returning mock data due to backend unavailability');
    return NextResponse.json({
      success: true,
      data: {
        categories: [
          {
            category_name: "Starters",
            dishes: [
              {
                dish_id: "1",
                dish_title: "Sample Dish",
                spice_level: 2,
                image_url: "/img/placeholder.jpg",
                options: [
                  {
                    option_name: "Regular",
                    price: 8.99,
                    dish_type: ["Vegetarian"],
                    allergens: ["None"],
                    short_description: "A delicious sample dish",
                    detailed_description: "This is a sample dish for testing purposes",
                    ingredients: "Sample ingredients"
                  }
                ]
              }
            ]
          }
        ]
      }
    });
  }
}
