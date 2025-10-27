import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.herokuapp.com' // Replace with your actual backend URL
    : 'http://localhost:5000');

export async function GET(
  request: Request,
  { params }: { params: { dishId: string } }
) {
  try {
    const { dishId } = params;
    console.log('Proxying get dish request to backend:', `${BACKEND_URL}/api/v1/admin/menu/dish/${dishId}`);
    
    const response = await fetch(`${BACKEND_URL}/api/v1/admin/menu/dish/${dishId}`, {
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
    
    return NextResponse.json(
      { success: false, message: 'Failed to connect to backend server' },
      { status: 502 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { dishId: string } }
) {
  try {
    const { dishId } = params;
    console.log('Proxying delete dish request to backend:', `${BACKEND_URL}/api/v1/admin/menu/dish/${dishId}`);
    
    const response = await fetch(`${BACKEND_URL}/api/v1/admin/menu/dish/${dishId}`, {
      method: 'DELETE',
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
    
    return NextResponse.json(
      { success: false, message: 'Failed to connect to backend server' },
      { status: 502 }
    );
  }
}
