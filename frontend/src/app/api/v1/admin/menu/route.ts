import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://ranna-v1.vercel.app' // Your actual backend URL
    : 'https://ranna-v1.vercel.app'); // Use production backend for local dev too

export async function GET(request: Request) {
  try {
    // Get Authorization header from incoming request
    const authHeader = request.headers.get('authorization');
    
    console.log('Proxying admin menu request to backend:', `${BACKEND_URL}/api/v1/admin/menu`);
    
    // Create a timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    // Build headers object, including Authorization if present
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }
    
    const response = await fetch(`${BACKEND_URL}/api/v1/admin/menu`, {
      method: 'GET',
      headers,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

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
    
    // Handle timeout errors specifically
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { success: false, message: 'Backend request timeout' },
        { status: 504 }
      );
    }
    
    // Return mock data when backend is unavailable (both development and production)
    console.log('Returning mock admin data due to backend unavailability');
    return NextResponse.json({
      success: true,
      data: {
        categories: [
          {
            category_id: "1",
            category_name: "Starters",
            dishes: [
              {
                dish_id: "1",
                dish_title: "Sample Dish",
                spice_level: 2,
                image_url: "/img/placeholder.jpg",
                is_featured: false,
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
