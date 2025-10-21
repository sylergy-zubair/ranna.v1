import { 
  AdminApiResponse, 
  CuisineData, 
  CreateDishRequest, 
  UpdateDishRequest, 
  CreateCategoryRequest, 
  UpdateMenuRequest 
} from '@/types';
import { API_BASE } from '@/config/api';

// Helper function for API calls
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<AdminApiResponse<T>> {
  try {
    // Add cache-busting for GET requests to ensure fresh data
    let url = `${API_BASE}${endpoint}`;
    if (!options.method || options.method === 'GET') {
      const separator = endpoint.includes('?') ? '&' : '?';
      url += `${separator}_t=${Date.now()}`;
    }
    
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      // Log the full error response for debugging
      console.error('API Error Response:', data);
      console.error('Response Status:', response.status);
      
      // Include validation details if available
      const errorMessage = data.details ? 
        `${data.message || data.error || 'Validation error'}: ${data.details.join(', ')}` :
        data.message || data.error || `HTTP ${response.status}`;
      
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('API call error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    };
  }
}

// Admin API functions
export const adminApi = {
  // Get full menu for admin
  getMenu: async (): Promise<AdminApiResponse<CuisineData>> => {
    return apiCall<CuisineData>('/admin/menu');
  },

  // Add new dish
  addDish: async (request: CreateDishRequest): Promise<AdminApiResponse> => {
    // Debug: Log the request data to see what dish types are being sent
    console.log('AddDish request:', JSON.stringify(request, null, 2));
    return apiCall('/admin/menu/dish', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  // Update dish
  updateDish: async (request: UpdateDishRequest): Promise<AdminApiResponse> => {
    // Debug: Log the request data to see what dish types are being sent
    console.log('UpdateDish request:', JSON.stringify(request, null, 2));
    return apiCall('/admin/menu/dish', {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  },

  // Delete dish
  deleteDish: async (dishId: string): Promise<AdminApiResponse> => {
    return apiCall(`/admin/menu/dish/${dishId}`, {
      method: 'DELETE',
    });
  },

  // Add new category
  addCategory: async (request: CreateCategoryRequest): Promise<AdminApiResponse> => {
    return apiCall('/admin/menu/category', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  // Delete category
  deleteCategory: async (categoryId: string): Promise<AdminApiResponse> => {
    return apiCall(`/admin/menu/category/${categoryId}`, {
      method: 'DELETE',
    });
  },

  // Update entire menu
  updateMenu: async (request: UpdateMenuRequest): Promise<AdminApiResponse> => {
    return apiCall('/admin/menu', {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  },

  // Clear cache
  clearCache: async (): Promise<AdminApiResponse> => {
    return apiCall('/admin/cache/clear', {
      method: 'POST',
    });
  },
};
