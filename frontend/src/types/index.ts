export interface Nutrition {
  energy_kj: number;
  energy_kcal: number;
  fat: number;
  of_which_saturates: number;
  carbohydrate: number;
  of_which_sugars: number;
  protein: number;
  salt: number;
  total_weight_grams: number;
}

export interface Option {
  option_id: string;
  option_name: string;
  short_description: string;
  detailed_description: string;
  price: number;
  dish_type: string[];
  ingredients: string[];
  allergens: string[];
  calorie_range: string;
  nutrition: Nutrition;
}

export interface Dish {
  dish_id: string;
  dish_title: string;
  spice_level: number;
  image_url?: string;
  is_featured?: boolean;
  options: Option[];
}

export interface Category {
  category_id: string;
  category: string;
  dishes: Dish[];
}

export interface CuisineData {
  _id?: string;
  categories: Category[];
}

export interface FilterState {
  spiceLevel: number | null;
  dishTypes: string[];
  categories: string[];
  allergens: string[];
  calorieRange: string | null;
}

export interface DishCardProps {
  dish: Dish & {
    description: string;
    lowestPrice: number;
  };
  onMoreInfo: (dish: Dish) => void;
}

export interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableOptions: {
    dishTypes: string[];
    categories: string[];
    allergens: string[];
    calorieRanges: string[];
  };
  activeCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export interface MoreInfoModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
}

// Admin types
export interface AdminApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: string[];
  timestamp?: string;
}

export interface CreateDishRequest {
  categoryId: string;
  dishData: Dish;
}

export interface UpdateDishRequest {
  dishId: string;
  dishData: Partial<Dish>;
}

export interface CreateCategoryRequest {
  categoryData: Category;
}

export interface UpdateMenuRequest {
  menuData: CuisineData;
}

// Admin form types
export interface AdminFormState {
  selectedCategory: string | null;
  selectedDish: string | null;
  isEditing: boolean;
  isAddingNewCategory: boolean;
  loading: boolean;
  error: string | null;
}

export interface AdminMenuState {
  menu: CuisineData | null;
  loading: boolean;
  error: string | null;
}
