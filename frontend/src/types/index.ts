export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Option {
  option_id: string;
  option_name: string;
  description: string;
  detailed_description: string;
  image_url: string;
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
  pairings: string[];
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
}

export interface MoreInfoModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
}
