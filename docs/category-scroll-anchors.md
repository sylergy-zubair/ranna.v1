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

Add a scroll function in `frontend/src/app/menu/page.tsx` after the `scrollToTop` function:

```typescript
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

Update `frontend/src/components/CategoryButtonFilter.tsx` to accept an optional scroll callback:

```typescript
interface CategoryButtonFilterProps {
  value: string[];
  options: string[];
  onChange: (value: string[]) => void;
  onCategoryClick?: (category: string) => void; // NEW
}

export default function CategoryButtonFilter({ 
  value, 
  options, 
  onChange,
  onCategoryClick 
}: CategoryButtonFilterProps) {
  const toggleOption = (option: string) => {
    const isAdding = !value.includes(option);
    
    if (isAdding) {
      onChange([...value, option]);
      // Scroll only when adding a category (recommended approach)
      if (onCategoryClick) {
        onCategoryClick(option);
      }
    } else {
      // Just remove, no scroll
      onChange(value.filter(item => item !== option));
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => toggleOption(option)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              value.includes(option)
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
  value={filters.categories}
  options={availableOptions.categories}
  onChange={(value) => updateFilters({ ...filters, categories: value })}
  onCategoryClick={scrollToCategory} // NEW
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

## Conflict with Multiple Category Selection

⚠️ **Important Consideration**: Since users can select multiple categories simultaneously, there are potential conflicts when combining scroll behavior with filter toggling.

### Conflict Scenarios

1. **Adding a Category**: 
   - User clicks an unselected category → adds it and scrolls to it
   - Problem: Other selected categories may have dishes before/after, so the scroll may not show all visible dishes

2. **Removing a Category**: 
   - User clicks a selected category → deselects it
   - Question: Should it scroll? Where should it scroll to?

3. **Multiple Selections**: 
   - User has "Starters" and "Main Course" selected
   - User clicks "Desserts" → scrolls to Desserts
   - Problem: Starters and Main Course dishes are still visible, but user scrolled to Desserts

### Recommended Solutions

#### Option 1: Scroll Only When Adding (Recommended) ✅

Scroll only when adding a category filter. When removing, don't scroll.

**Implementation:**

```typescript
const toggleOption = (option: string) => {
  const isAdding = !value.includes(option);
  
  if (isAdding) {
    onChange([...value, option]);
    // Scroll when adding
    if (onCategoryClick) {
      onCategoryClick(option);
    }
  } else {
    // Just remove, no scroll
    onChange(value.filter(item => item !== option));
  }
};
```

**Pros:**
- Intuitive: Adding a filter scrolls to show it
- Removing doesn't need scroll (dishes are already visible)
- Avoids conflicts with multiple selections

**Cons:**
- Inconsistent behavior (sometimes scrolls, sometimes doesn't)

#### Option 2: Always Scroll to Clicked Category

Always scroll to the clicked category, regardless of whether it's being added or removed.

**Implementation:**

```typescript
const toggleOption = (option: string) => {
  if (value.includes(option)) {
    onChange(value.filter(item => item !== option));
  } else {
    onChange([...value, option]);
  }
  
  // Always scroll to clicked category
  if (onCategoryClick) {
    onCategoryClick(option);
  }
};
```

**Pros:**
- Consistent behavior (always scrolls)
- Predictable user experience

**Cons:**
- May scroll away from other selected categories
- Can be jarring when deselecting

#### Option 3: Separate Scroll Action

Keep filter toggle separate from scroll action. Add a "Go to" icon/button next to each category that only scrolls (doesn't toggle filter).

**Pros:**
- Clear separation of concerns
- No conflicts between filtering and scrolling
- Users have explicit control

**Cons:**
- More UI complexity
- Requires additional UI elements

#### Option 4: Scroll to First Selected Category

When multiple categories are selected, scroll to the first one in the list.

**Implementation:**

```typescript
const handleCategoryToggle = (category: string) => {
  const newCategories = value.includes(category)
    ? value.filter(item => item !== category)
    : [...value, category];
  
  updateFilters({ ...filters, categories: newCategories });
  
  // Scroll to first selected category
  if (newCategories.length > 0 && onCategoryClick) {
    onCategoryClick(newCategories[0]);
  }
};
```

**Pros:**
- Always scrolls to a relevant category
- Works with multiple selections

**Cons:**
- May not scroll to the category user just clicked
- Less intuitive

### Recommendation

**Use Option 1 (Scroll Only When Adding)** because:
- ✅ Most intuitive user experience
- ✅ Adding a filter naturally wants to see those dishes
- ✅ Removing doesn't need scroll (dishes are already visible)
- ✅ Avoids conflicts with multiple selections

## Edge Cases to Consider

1. **Category Not Found**: If a category is clicked but has no visible dishes (filtered out), handle gracefully
2. **Special Characters**: Category names with special characters need safe ID generation
3. **Sticky Header**: Account for fixed/sticky headers in scroll offset
4. **Mobile**: Test scroll behavior on mobile devices

## Testing Checklist

- [ ] Click unselected category button adds filter and scrolls to first dish of that category
- [ ] Click selected category button removes filter and does NOT scroll (recommended approach)
- [ ] Multiple categories selected: clicking new category scrolls correctly
- [ ] Multiple categories selected: removing one doesn't scroll
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
❌ **Multiple selection conflicts**: When multiple categories are selected, scrolling may not show all visible dishes (see "Conflict with Multiple Category Selection" section above)  

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

