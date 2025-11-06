import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://ranna-v1.vercel.app' // Your actual backend URL
    : 'https://ranna-v1.vercel.app'); // Use production backend for local dev too

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await params;
    // Get Authorization header from incoming request
    const authHeader = request.headers.get('authorization');
    
    console.log('Proxying delete category request to backend:', `${BACKEND_URL}/api/v1/admin/menu/category/${categoryId}`);
    
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
    
    const response = await fetch(`${BACKEND_URL}/api/v1/admin/menu/category/${categoryId}`, {
      method: 'DELETE',
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
    
    return NextResponse.json(
      { success: false, message: 'Failed to connect to backend server' },
      { status: 502 }
    );
  }
}
