// API configuration
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL 
  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`
  : process.env.NODE_ENV === 'production' 
  ? 'https://ranna-v1.vercel.app/api' 
  : 'http://localhost:5000/api/v1';
