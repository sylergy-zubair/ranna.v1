# Category Scroll Anchors Implementation Guide

## Overview

This document describes **Approach 1: Simple Scroll Anchors** for implementing scroll-to-category functionality in the menu page. When users click on a category button, the page will smoothly scroll to the first dish of that category.

## Difficulty Level

**Easy** - Approximately 15-20 minutes

## Current State

- Dishes are displayed in a flat grid layout
- Category filter buttons exist in `CategoryButtonFilter` component
- Dishes are already sorted by category (dividers between categories indicate this)
- Each dish has a `category` property

## Implementation Steps

### Step 1: Add Scroll Function to Menu Page

Add category scroll helpers in `frontend/src/app/menu/page.tsx` after the modal handlers:

```typescript
const [activeCategory, setActiveCategory] = useState<string | null>(null);

const scrollToCategory = (category: string) => {
  // Create a safe ID from category name (replace spaces/special chars)
  const categoryId = `category-${category.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`;
  const element = document.getElementById(categoryId);
  
  if (element) {
    // Scroll with offset for sticky header
    const offset = 100; // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const handleCategorySelect = (category: string | null) => {
  setActiveCategory(category);

  if (category) {
    scrollToCategory(category);
  }
};
```

### Step 2: Add IDs to First Dish of Each Category

Modify the dishes rendering section to add an ID to the first dish of each category:

**File:** `frontend/src/app/menu/page.tsx`

**Location:** Around line 237, in the `filteredDishes.map()` function

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  {filteredDishes.map((dish, index) => {
    const isLastDishInCategory = 
      index === filteredDishes.length - 1 || 
      filteredDishes[index + 1].category !== dish.category;
    
    // Check if this is the first dish in its category
    const isFirstDishInCategory = 
      index === 0 || 
      filteredDishes[index - 1].category !== dish.category;
    
    // Create safe ID from category name
    const categoryId = isFirstDishInCategory 
      ? `category-${dish.category.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`
      : undefined;
    
    return (
      <Fragment key={`dish-fragment-${index}`}>
        <div id={categoryId}>
          <DishCard
            dish={dish}
            onMoreInfo={handleMoreInfo}
          />
        </div>
        {isLastDishInCategory && index < filteredDishes.length - 1 && (
          <div 
            className="col-span-full my-6 border-b-2 border-gray-300"
          />
        )}
      </Fragment>
    );
  })}
</div>
```

### Step 3: Modify CategoryButtonFilter Component

Update `frontend/src/components/CategoryButtonFilter.tsx` to manage a single active category:

```typescript
interface CategoryButtonFilterProps {
  activeCategory: string | null;
  options: string[];
  onSelect: (category: string | null) => void;
}

export default function CategoryButtonFilter({ 
  activeCategory, 
  options, 
  onSelect,
}: CategoryButtonFilterProps) {
  const toggleOption = (option: string) => {
    if (activeCategory === option) {
      onSelect(null);
      return;
    }

    onSelect(option);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => toggleOption(option)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === option
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### Step 4: Connect Scroll Function to Category Buttons

In `frontend/src/app/menu/page.tsx`, update the CategoryButtonFilter usage:

```typescript
<CategoryButtonFilter
  activeCategory={activeCategory}
  options={availableOptions.categories}
  onSelect={handleCategorySelect}
/>
```

## Alternative: Direct Click Handler

If you want clicking a category to scroll even when it's already selected, you can modify the approach:

**Option A:** Add separate scroll buttons or modify click behavior:

```typescript
const handleCategoryClick = (category: string) => {
  // Always scroll, even if already selected
  scrollToCategory(category);
  
  // Also toggle filter (optional)
  if (!filters.categories.includes(category)) {
    updateFilters({ ...filters, categories: [...filters.categories, category] });
  }
};
```

**Option B:** Use double-click or separate "Go to" button for scrolling.

## Category Selection Behavior

⚠️ **Important Consideration**: The category filter now behaves as a **single-choice selector**. Users can only have one category active at a time; clicking the active category clears the selection.

### Implementation

```typescript
const toggleOption = (option: string) => {
  if (activeCategory === option) {
    onSelect(null); // Deselect current category
    return;
  }

  onSelect(option); // Select only this category
};
```

### Implications

- ✅ Eliminates conflicts introduced by multi-select behavior
- ✅ Scroll handling becomes straightforward—always scroll to the chosen category when it’s selected
- ✅ Deselecting a category simply clears the filter without scrolling
- ❌ Users cannot view multiple categories simultaneously (by design)

## Edge Cases to Consider

1. **Category Not Found**: If a category is clicked but has no visible dishes (filtered out), handle gracefully
2. **Special Characters**: Category names with special characters need safe ID generation
3. **Sticky Header**: Account for fixed/sticky headers in scroll offset
4. **Mobile**: Test scroll behavior on mobile devices

## Testing Checklist

- [ ] Clicking a category selects only that category and scrolls to its first dish
- [ ] Clicking the same category again clears the filter and leaves the scroll position unchanged
- [ ] Scroll offset accounts for sticky header
- [ ] Works on mobile devices
- [ ] Handles categories with special characters in names
- [ ] Smooth scroll animation works correctly
- [ ] Category with no visible dishes (filtered out) handles gracefully

## Benefits of This Approach

✅ **Simple**: Minimal code changes  
✅ **Maintains current layout**: Grid structure unchanged  
✅ **Non-intrusive**: Doesn't require major refactoring  
✅ **Fast to implement**: Can be done in 15-20 minutes  

## Limitations

❌ **No section headers**: Categories don't have visible headers  
❌ **Less obvious**: Users might not realize they've scrolled to a category  
❌ **First dish only**: Scrolls to first dish, not a dedicated section header  
❌ **Single-category view**: Users cannot view multiple categories at once  

## Future Enhancements

If you want to improve this later, consider:

1. **Add visual highlight**: Flash or highlight the target dish briefly
2. **Section headers**: Add category titles above each category group
3. **Scroll indicators**: Show which category is currently in view
4. **Keyboard navigation**: Add keyboard shortcuts for category navigation

## Related Files

- `frontend/src/app/menu/page.tsx` - Main menu page component
- `frontend/src/components/CategoryButtonFilter.tsx` - Category filter buttons
- `frontend/src/components/DishCard.tsx` - Individual dish card component

## Notes

- The scroll offset (`offset = 100`) should match your sticky header height
- Category IDs are generated by replacing spaces with hyphens and removing special characters
- The implementation uses `window.scrollTo` with `behavior: 'smooth'` for smooth scrolling
- Consider adding a small delay before scrolling if you're also filtering, to allow the DOM to update first

