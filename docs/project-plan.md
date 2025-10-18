# Ranna - Indian Cuisine Frontend Project Plan

## Project Overview
A NextJS-based frontend application for displaying Indian cuisine dishes with advanced filtering capabilities.

## Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Context API / Zustand
- **Data**: JSON file (indian_cuisine.json)

## Project Structure
```
ranna/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── components/
│       ├── DishCard.tsx
│       ├── FilterPanel.tsx
│       ├── SpiceLevelFilter.tsx
│       ├── DishTypeFilter.tsx
│       ├── CategoryFilter.tsx
│       ├── AllergenFilter.tsx
│       ├── CalorieRangeFilter.tsx
│       └── MoreInfoModal.tsx
├── data/
│   └── indian_cuisine.json
├── types/
│   └── index.ts
├── hooks/
│   └── useFilters.ts
├── utils/
│   └── dataUtils.ts
└── docs/
    └── project-plan.md
```

## Core Features

### 1. Main Page Layout
- **Header**: Restaurant name and tagline
- **Filter Panel**: Left sidebar with all filter options
- **Dish Grid**: Right side displaying dish cards
- **Responsive Design**: Mobile-first approach

### 2. Dish Cards
Each card displays:
- **Dish Title**: e.g., "Bhuna", "Rogan Josh"
- **Description**: Moved from dish level to option level
- **Lowest Price**: Minimum price from all options in that dish
- **More Info Button**: Opens modal with all options

### 3. Filter System

#### Filter Types & Behavior:
1. **Spice Level** (Single Select)
   - Options: 1, 2, 3
   - Behavior: Select one spice level

2. **Dish Type** (Multi Select)
   - Options: Meat, Vegetarian, Vegan, Seafood, Creamy, Healthy
   - Behavior: Select multiple types

3. **Categories** (Multi Select)
   - Options: Traditional Curry, Tandoori
   - Behavior: Select multiple categories

4. **Allergens** (Multi Select)
   - Options: None, Dairy, Fish
   - Behavior: Select multiple allergens (exclusion filter)

5. **Calorie Range** (Single Select)
   - Options: 0-100, 100-200, 200-300, 300-400, 400-500, 500-600, 600+
   - Behavior: Select one range

## Data Processing Logic

### 1. Dish Aggregation
- Group options by dish_title
- Calculate minimum price per dish
- Use first option's description for dish card

### 2. Filtering Logic
```typescript
// Filter dishes based on selected criteria
const filteredDishes = dishes.filter(dish => {
  // Spice level match (single)
  if (selectedSpiceLevel && dish.spice_level !== selectedSpiceLevel) return false;
  
  // Category match (multi)
  if (selectedCategories.length > 0 && !selectedCategories.includes(dish.category)) return false;
  
  // Check if any option matches dish_type filters (multi)
  const hasMatchingDishType = dish.options.some(option => 
    selectedDishTypes.some(type => option.dish_type.includes(type))
  );
  if (selectedDishTypes.length > 0 && !hasMatchingDishType) return false;
  
  // Check if any option matches calorie range (single)
  if (selectedCalorieRange && !dish.options.some(option => 
    option.calorie_range === selectedCalorieRange
  )) return false;
  
  // Exclude dishes with selected allergens (multi)
  const hasExcludedAllergen = dish.options.some(option => 
    selectedAllergens.some(allergen => option.allergens.includes(allergen))
  );
  if (selectedAllergens.length > 0 && hasExcludedAllergen) return false;
  
  return true;
});
```

## Component Specifications

### 1. DishCard Component
```typescript
interface DishCardProps {
  dish: {
    dish_title: string;
    description: string;
    spice_level: number;
    lowestPrice: number;
    options: Option[];
  };
  onMoreInfo: (dish: Dish) => void;
}
```

### 2. FilterPanel Component
```typescript
interface FilterState {
  spiceLevel: number | null;
  dishTypes: string[];
  categories: string[];
  allergens: string[];
  calorieRange: string | null;
}
```

### 3. MoreInfoModal Component
- Display all options for selected dish
- Show detailed descriptions, prices, ingredients
- Allow option selection and add to cart

## Styling Guidelines

### 1. Design System
- **Colors**: Warm Indian-inspired palette
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent 8px grid system
- **Components**: Rounded corners, subtle shadows

### 2. Responsive Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### 3. Card Design
- Clean white background
- Subtle border and shadow
- Spice level indicator (color-coded)
- Price prominently displayed
- Hover effects for interactivity

## State Management

### 1. Filter State
```typescript
interface AppState {
  filters: FilterState;
  selectedDish: Dish | null;
  isModalOpen: boolean;
}
```

### 2. Context Provider
- FilterContext for managing filter state
- ModalContext for modal state
- DataContext for dish data

## Performance Considerations

### 1. Data Processing
- Memoize filtered results
- Use useMemo for expensive calculations
- Lazy load modal content

### 2. Rendering Optimization
- Virtual scrolling for large datasets
- Image lazy loading
- Component memoization

## Development Phases

### Phase 1: Setup & Basic Structure
1. Initialize Next.js project
2. Set up TypeScript and Tailwind
3. Create basic layout and routing
4. Implement data loading

### Phase 2: Core Components
1. Build DishCard component
2. Implement basic filtering logic
3. Create filter panel components
4. Add responsive design

### Phase 3: Advanced Features
1. Implement MoreInfoModal
2. Add filter persistence
3. Optimize performance
4. Add animations and transitions

### Phase 4: Polish & Testing
1. Add error handling
2. Implement loading states
3. Add accessibility features
4. Performance testing and optimization

## File Structure Details

### 1. Types Definition (types/index.ts)
```typescript
export interface Option {
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
  dish_title: string;
  spice_level: number;
  pairings: string[];
  options: Option[];
}

export interface Category {
  category: string;
  dishes: Dish[];
}
```

### 2. Utility Functions (utils/dataUtils.ts)
- `getLowestPrice(dish: Dish): number`
- `filterDishes(dishes: Dish[], filters: FilterState): Dish[]`
- `getUniqueValues(data: any[], key: string): string[]`

### 3. Custom Hooks (hooks/useFilters.ts)
- Filter state management
- Filter application logic
- URL state synchronization

## Success Metrics
- Fast initial page load (< 2s)
- Smooth filtering experience
- Mobile-responsive design
- Accessible to screen readers
- Clean, intuitive user interface

## Future Enhancements
- Search functionality
- Favorites system
- Cart functionality
- User reviews and ratings
- Admin panel for data management
- Multi-language support
