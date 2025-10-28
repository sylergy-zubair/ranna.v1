'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Category, Dish, AdminMenuState, AdminFormState } from '@/types';
import { adminApi } from '@/utils/adminApi';
import { DISH_TYPES, ALLERGENS } from '@/utils/constants';
import AdminSidebar from '@/components/admin/AdminSidebar';
import CategoryForm from '@/components/admin/CategoryForm';
import DishForm from '@/components/admin/DishForm';
import MenuView from '@/components/admin/MenuView';

// Helper function to clean dish data before sending to backend
const cleanDishData = (dish: Dish): Dish => ({
  ...dish,
  is_featured: dish.is_featured || false, // Explicitly preserve is_featured
  options: dish.options.map(option => ({
    ...option,
    dish_type: option.dish_type.filter(type => 
      type && type.trim() && DISH_TYPES.includes(type.trim())
    ),
    allergens: option.allergens.filter(allergen =>
      allergen && allergen.trim() && ALLERGENS.includes(allergen.trim())
    ),
    short_description: option.short_description?.trim() || '',
    detailed_description: option.detailed_description?.trim() || ''
  }))
});

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [menuState, setMenuState] = useState<AdminMenuState>({
    menu: null,
    loading: true,
    error: null,
  });

  const [formState, setFormState] = useState<AdminFormState>({
    selectedCategory: null,
    selectedDish: null,
    isEditing: false,
    isAddingNewCategory: false,
    loading: false,
    error: null,
  });

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      setAuthLoading(false);
    }
  }, [router]);

  // Load menu data on mount (only if authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      loadMenu();
    }
  }, [isAuthenticated]);

  const loadMenu = async () => {
    setMenuState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      console.log('🔄 Loading menu data...');
      const response = await adminApi.getMenu();
      console.log('📡 Menu API response:', response);
      
      if (response.success && response.data) {
        console.log('✅ Menu loaded successfully, categories:', response.data.categories?.length);
        setMenuState({
          menu: response.data,
          loading: false,
          error: null,
        });
      } else {
        console.error('❌ Menu load failed:', response.error || response.message);
        setMenuState({
          menu: null,
          loading: false,
          error: response.error || response.message || 'Failed to load menu',
        });
      }
    } catch (error) {
      console.error('❌ Menu load error:', error);
      setMenuState({
        menu: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setFormState(prev => ({
      ...prev,
      selectedCategory: categoryId,
      selectedDish: null,
      isEditing: false,
      isAddingNewCategory: false,
      error: null,
    }));
  };

  const handleDishSelect = (dishId: string | null) => {
    setFormState(prev => ({
      ...prev,
      selectedDish: dishId,
      isEditing: dishId !== 'new' && dishId !== null,                        //isEditing: true,
      isAddingNewCategory: false,
      error: null,
    }));
  };

  const handleCategorySave = async (categoryData: Category) => {
    setFormState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Clean dish data before sending to prevent validation errors
      const cleanedCategoryData: Category = {
        ...categoryData,
        dishes: categoryData.dishes.map(cleanDishData)
      };

      console.log('💾 Saving category:', cleanedCategoryData);
      let response;
      if (formState.isEditing && formState.selectedCategory) {
        // Update existing category (implement if needed)
        response = await adminApi.addCategory({ categoryData: cleanedCategoryData });
      } else {
        // Add new category
        response = await adminApi.addCategory({ categoryData: cleanedCategoryData });
      }

      console.log('📡 Category save response:', response);

      if (response.success) {
        console.log('✅ Category saved successfully, refreshing menu...');
        await loadMenu(); // Refresh menu
        setFormState(prev => ({
          ...prev,
          loading: false,
          isEditing: false,
          isAddingNewCategory: false,
          selectedCategory: null,
        }));
      } else {
        console.error('❌ Category save failed:', response.error || response.message);
        setFormState(prev => ({
          ...prev,
          loading: false,
          error: response.error || response.message || 'Failed to save category',
        }));
      }
    } catch (error) {
      console.error('❌ Category save error:', error);
      setFormState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  };

  const handleDishSave = async (categoryId: string, dishData: Dish) => {
    setFormState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Clean dish data before sending to prevent validation errors
      const cleanedDishData = cleanDishData(dishData);
      
      let response;
      if (formState.isEditing && formState.selectedDish) {
        // Update existing dish
        response = await adminApi.updateDish({
          dishId: formState.selectedDish,
          dishData: cleanedDishData,
        });
      } else {
        // Add new dish
        response = await adminApi.addDish({
          categoryId,
          dishData: cleanedDishData,
        });
      }

      if (response.success) {
        await loadMenu(); // Refresh menu
        setFormState(prev => ({
          ...prev,
          loading: false,
          isEditing: false,
          selectedDish: null,
        }));
      } else {
        setFormState(prev => ({
          ...prev,
          loading: false,
          error: response.error || response.message || 'Failed to save dish',
        }));
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  };

  const handleDeleteDish = async (dishId: string) => {
    if (!confirm('Are you sure you want to delete this dish?')) {
      return;
    }

    setFormState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await adminApi.deleteDish(dishId);

      if (response.success) {
        await loadMenu(); // Refresh menu
        setFormState(prev => ({
          ...prev,
          loading: false,
          selectedDish: null,
        }));
      } else {
        setFormState(prev => ({
          ...prev,
          loading: false,
          error: response.error || response.message || 'Failed to delete dish',
        }));
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeleteCategory = async (categoryId: string, categoryName: string) => {
    setFormState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await adminApi.deleteCategory(categoryId);

      if (response.success) {
        await loadMenu(); // Refresh menu
        setFormState(prev => ({
          ...prev,
          loading: false,
          selectedCategory: null,
          selectedDish: null,
          isEditing: false,
        }));
      } else {
        setFormState(prev => ({
          ...prev,
          loading: false,
          error: response.error || response.message || 'Failed to delete category',
        }));
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  };

  // Get selected category data
  const selectedCategoryData = menuState.menu?.categories.find(
    cat => cat.category_id === formState.selectedCategory
  );

  // Get selected dish data
  const selectedDishData = selectedCategoryData?.dishes.find(
    dish => dish.dish_id === formState.selectedDish
  );

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (menuState.loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu data...</p>
        </div>
      </div>
    );
  }

  if (menuState.error) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Menu</h2>
          <p className="text-gray-600 mb-4">{menuState.error}</p>
          <button
            onClick={loadMenu}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
              <p className="text-gray-600">Manage your restaurant menu</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={loadMenu}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                disabled={menuState.loading}
              >
                Refresh
              </button>
              <button
                onClick={() => {
                  if (confirm('Clear all cached data?')) {
                    adminApi.clearCache();
                  }
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Clear Cache
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-sm border-r border-gray-200 overflow-y-auto">
          <AdminSidebar
            menu={menuState.menu}
            selectedCategory={formState.selectedCategory}
            selectedDish={formState.selectedDish}
            onCategorySelect={handleCategorySelect}
            onDishSelect={handleDishSelect}
            onNewCategory={() => setFormState(prev => ({ 
              ...prev, 
              selectedCategory: null, 
              selectedDish: null, 
              isEditing: false,
              isAddingNewCategory: true 
            }))}
            onCategoryDelete={handleDeleteCategory}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {formState.error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{formState.error}</p>
            </div>
          )}

          {!formState.selectedCategory && !formState.selectedDish && !formState.isAddingNewCategory && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🍽️</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Menu Management</h2>
              <p className="text-gray-600 mb-6">
                Select a category from the sidebar to manage dishes, or add a new category.
              </p>
              <MenuView menu={menuState.menu} />
            </div>
          )}

          {((formState.selectedCategory && !formState.selectedDish) || formState.isAddingNewCategory) && (
            <CategoryForm
              category={selectedCategoryData || null}
              isEditing={!!selectedCategoryData && !formState.isAddingNewCategory}
              loading={formState.loading}
              onSave={handleCategorySave}
              onNewDish={() => setFormState(prev => ({ 
                ...prev, 
                selectedDish: 'new',
                isAddingNewCategory: false
              }))}
              onCancel={formState.isAddingNewCategory ? () => setFormState(prev => ({
                ...prev,
                isAddingNewCategory: false,
                selectedCategory: null,
                selectedDish: null,
                error: null
              })) : undefined}
            />
          )}

          {(formState.selectedDish && selectedCategoryData) && (
            <DishForm
              category={selectedCategoryData}
              dish={selectedDishData || null}
              isEditing={formState.isEditing && !!selectedDishData}
              loading={formState.loading}
              onSave={(dishData) => handleDishSave(selectedCategoryData.category_id, dishData)}
              onDelete={formState.selectedDish !== 'new' ? handleDeleteDish : undefined}
              onBack={() => setFormState(prev => ({ 
                ...prev, 
                selectedDish: null 
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
