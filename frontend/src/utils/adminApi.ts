import { 
  AdminApiResponse, 
  CuisineData, 
  CreateDishRequest, 
  UpdateDishRequest, 
  CreateCategoryRequest, 
  UpdateMenuRequest 
} from '@/types';

const API_BASE = process.env.NODE_ENV === 'production' 
  ? '/api/v1' 
  : 'http://localhost:5000/api/v1';

// Helper function for API calls
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<AdminApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP ${response.status}`);
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
    return apiCall('/admin/menu/dish', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  // Update dish
  updateDish: async (request: UpdateDishRequest): Promise<AdminApiResponse> => {
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
