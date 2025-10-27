import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.herokuapp.com' // Replace with your actual backend URL
    : 'http://localhost:5000');

export async function GET() {
  try {
    console.log('Proxying filter options request to backend:', `${BACKEND_URL}/api/v1/menu/filter-options`);
    
    const response = await fetch(`${BACKEND_URL}/api/v1/menu/filter-options`, {
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
    
    // Return mock filter options for development/testing when backend is unavailable
    console.log('Returning mock filter options due to backend unavailability');
    return NextResponse.json({
      success: true,
      data: {
        categories: ["Starters", "Main Course", "Desserts", "Beverages"],
        dishTypes: ["Vegetarian", "Non-Vegetarian", "Vegan"],
        allergens: ["None", "Nuts", "Dairy", "Gluten", "Soy"],
        spiceLevels: [1, 2, 3, 4, 5],
        calorieRanges: ["Under 300", "300-500", "500-700", "Over 700"]
      }
    });
  }
}
