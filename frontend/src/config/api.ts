// API configuration
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL 
  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`
  : '/api/v1'; // Use relative path - works on any domain
