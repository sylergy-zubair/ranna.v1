import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.herokuapp.com' // Replace with your actual backend URL
    : 'http://localhost:5000');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Proxying create dish request to backend:', `${BACKEND_URL}/api/v1/admin/menu/dish`);
    
    const response = await fetch(`${BACKEND_URL}/api/v1/admin/menu/dish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log('Proxying update dish request to backend:', `${BACKEND_URL}/api/v1/admin/menu/dish`);
    
    const response = await fetch(`${BACKEND_URL}/api/v1/admin/menu/dish`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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
