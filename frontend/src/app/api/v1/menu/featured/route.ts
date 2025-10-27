import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.herokuapp.com' // Replace with your actual backend URL
    : 'http://localhost:5000');

export async function GET() {
  try {
    console.log('Proxying featured dishes request to backend:', `${BACKEND_URL}/api/v1/menu/featured`);
    
    const response = await fetch(`${BACKEND_URL}/api/v1/menu/featured`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error('Backend API error:', response.status, response.statusText);
      return NextResponse.json(
        { success: false, message: `Backend API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Backend API response received:', data.success ? 'Success' : 'Failed');
    
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Error proxying to backend:', error);
    
    // Return mock featured dishes when backend is unavailable
    console.log('Returning mock featured dishes due to backend unavailability');
    return NextResponse.json({
      success: true,
      data: [
        {
          dish_id: "1",
          dish_title: "Featured Dish 1",
          spice_level: 3,
          image_url: "/img/placeholder.jpg",
          is_featured: true,
          description: "A delicious featured dish",
          lowestPrice: 12.99,
          options: [
            {
              option_name: "Regular",
              price: 12.99,
              dish_type: ["Vegetarian"],
              allergens: ["None"],
              short_description: "A delicious featured dish",
              detailed_description: "This is a featured dish for testing purposes",
              ingredients: "Featured ingredients"
            }
          ]
        },
        {
          dish_id: "2",
          dish_title: "Featured Dish 2",
          spice_level: 2,
          image_url: "/img/placeholder.jpg",
          is_featured: true,
          description: "Another delicious featured dish",
          lowestPrice: 15.99,
          options: [
            {
              option_name: "Regular",
              price: 15.99,
              dish_type: ["Non-Vegetarian"],
              allergens: ["Dairy"],
              short_description: "Another delicious featured dish",
              detailed_description: "This is another featured dish for testing purposes",
              ingredients: "More featured ingredients"
            }
          ]
        }
      ]
    });
  }
}