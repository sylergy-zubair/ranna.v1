# Menu Input Page Design

## Overview
A comprehensive admin interface for managing the Ranna Indian cuisine menu data. This page provides a hierarchical, multi-step interface that mirrors the data structure: **Categories → Dishes → Options** with advanced features for bulk operations and data management.

## UI Layout & Navigation

```
┌─────────────────────────────────────────────────────────────┐
│ Header: "Menu Management" [Save All] [Export JSON] [Import] │
├─────────────────────────────────────────────────────────────┤
│ Sidebar:                   │ Main Content Area              │
│ ┌─ Categories ──────────┐  │                               │
│ │ • Traditional Curry   │  │ ┌─ Current: Category Name ─┐  │
│ │ • Tandoori           │  │ │                          │  │
│ │ [+ Add Category]     │  │ │ Form Content Here        │  │
│ └─────────────────────┘  │ │                          │  │
│                           │ └─────────────────────────┘  │
│ ┌─ Quick Actions ─────┐   │                               │
│ │ Bulk Import CSV     │   │                               │
│ │ JSON Backup        │   │                               │
│ │ Preview Frontend   │   │                               │
│ └────────────────────┘   │                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Structure Reference

### Category Structure
```typescript
interface Category {
  category_id: string;        // Auto-generated UUID
  category: string;          // "Traditional Curry", "Tandoori"
  dishes: Dish[];
}
```

### Dish Structure
```typescript
interface Dish {
  dish_id: string;           // Auto-generated UUID
  dish_title: string;        // "Bhuna", "Curry"
  spice_level: number;       // 1-4
  image_url: string;         // S3 URL moved to dish level
  options: Option[];
}
```

### Option Structure
```typescript
interface Option {
  option_id: string;                    // Auto-generated UUID
  option_name: string;                  // "Chicken", "Lamb", "Paneer"
  short_description: string;            // Short description
  detailed_description: string;         // Long description
  price: number;                        // Decimal with £ prefix
  dish_type: string[];                  // ["Meat", "Vegetarian", "Vegan"]
  ingredients: string[];                // Array of ingredients
  allergens: string[];                  // Exclusion filter options
  calorie_range: string;                // "300-400", "0-100", etc.
  nutrition: {
    energy_kj: number;
    energy_kcal: number;
    fat: number;
    of_which_saturates: number;
    carbohydrate: number;
    of_which_sugars: number;
    protein: number;
    salt: number;
    total_weight_grams: number;
  };
}
```

## Feature Sections

### 1. Category Management

#### Category Sidebar
- **Drag & Drop Reordering**: Categories can be reordered by dragging
- **Add/Edit/Delete Actions**: Quick category CRUD operations
- **Visual Indicators**: Show item counts per category

#### Category Form
```jsx
<div className="category-form">
  <Input 
    label="Category Name" 
    value={category}
    placeholder="e.g., Traditional Curry"
    required
  />
  <div className="form-actions">
    <Button variant="primary">Save Category</Button>
    <Button variant="secondary">Cancel</Button>
  </div>
</div>
```

### 2. Dish Management

#### Dish Interface
- **Accordion Layout**: Collapsible sections for each dish
- **Inline Editing**: Click to edit dish properties
- **Bulk Actions**: Multi-select for batch operations
- **Clone Functionality**: Duplicate dishes with variations

#### Dish Form Fields
```jsx
<div className="dish-form">
  <div className="grid grid-cols-2 gap-4">
    <Input 
      label="Dish Title" 
      value={dish_title}
      placeholder="e.g., Bhuna"
      required
    />
    <SpiceLevelSelector 
      label="Spice Level"
      value={spice_level}
      min={1} max={4}
    />
  </div>
  
  <div className="grid grid-cols-1 gap-4">
    <FileUpload 
      label="Dish Image"
      onUpload={handleImageUpload}
      acceptedFormats={["jpg", "jpeg", "png", "webp"]}
      maxSizeMB={5}
    />
    <Input 
      label="Or Image URL" 
      value={image_url}
      placeholder="https://example.com/image.jpg"
    />
  </div>
</div>
```

### 3. Option Management (Most Complex)

#### Option Form Layout
```jsx
<div className="option-form space-y-6">
  {/* Basic Information */}
  <div className="basic-info grid grid-cols-2 gap-4">
    <Input 
      label="Option Name" 
      value={option_name}
      placeholder="e.g., Chicken, Lamb, Paneer"
      required
    />
    <Input 
      label="Price (£)" 
      type="number" 
      step="0.01"
      value={price}
      prefix="£"
      required
    />
  </div>

  {/* Descriptions */}
  <div className="descriptions space-y-4">
    <Textarea 
      label="Short Description" 
      rows={2}
      value={short_description}
      placeholder="Brief description for menu cards"
    />
    <Textarea 
      label="Detailed Description" 
      rows={4}
      value={detailed_description}
      placeholder="Comprehensive description for More Info modal"
    />
  </div>

  {/* Classification & Dietary */}
  <div className="classification grid grid-cols-2 gap-4">
    <MultiSelect 
      label="Dish Type"
      options={["Meat", "Vegetarian", "Vegan"]}
      value={dish_type}
      required
    />
    <MultiSelect 
      label="Allergens (Exclusion Filter)"
      options={["Gluten", "Dairy", "Nuts", "Shellfish", "Soy", "None"]}
      value={allergens}
      helpText="Select allergens to exclude from filtered results"
    />
  </div>

  {/* Ingredients */}
  <TagsInput 
    label="Ingredients"
    value={ingredients}
    suggestions={commonIngredients}
    placeholder="Add ingredients (e.g., Chicken breast, Onions, Garlic)"
  />

  {/* Calorie Range */}
  <Select 
    label="Calorie Range"
    options={[
      "0-100", "100-200", "200-300", "300-400", 
      "400-500", "500-600", "600+"
    ]}
    value={calorie_range}
    required
  />

  {/* Nutrition Facts */}
  <NutritionForm
    label="Nutrition Information"
    value={nutrition}
    onChange={setNutrition}
  />
</div>
```

#### Spice Level Component
```jsx
const SpiceLevelSelector = ({ value, onChange, min = 1, max = 4 }) => (
  <div className="spice-level-selector">
    <label>Spice Level</label>
    <div className="chili-selector flex gap-2">
      {Array.from({ length: max }, (_, i) => i + 1).map(level => (
        <button
          key={level}
          onClick={() => onChange(level)}
          className={`chili-btn ${value >= level ? 'active' : ''}`}
        >
          {Array.from({ length: level }).map((_, i) => (
            <img key={i} src="/data/img/image.png" alt="chili" className="w-4 h-4" />
          ))}
        </button>
      ))}
    </div>
  </div>
);
```

#### Nutrition Form Component
```jsx
const NutritionForm = ({ value, onChange }) => (
  <div className="nutrition-form">
    <h3 className="text-lg font-semibold mb-4">Nutrition Facts</h3>
    <div className="grid grid-cols-3 gap-4">
      <Input 
        label="Energy (kJ)" 
        type="number"
        value={value.energy_kj}
        onChange={(e) => onChange({...value, energy_kj: Number(e.target.value)})}
      />
      <Input 
        label="Energy (kcal)" 
        type="number"
        value={value.energy_kcal}
        onChange={(e) => onChange({...value, energy_kcal: Number(e.target.value)})}
      />
      <Input 
        label="Fat (g)" 
        type="number" 
        step="0.1"
        value={value.fat}
        onChange={(e) => onChange({...value, fat: Number(e.target.value)})}
      />
      <Input 
        label="of which saturates (g)" 
        type="number" 
        step="0.1"
        value={value.of_which_saturates}
        onChange={(e) => onChange({...value, of_which_saturates: Number(e.target.value)})}
      />
      <Input 
        label="Carbohydrate (g)" 
        type="number" 
        step="0.1"
        value={value.carbohydrate}
        onChange={(e) => onChange({...value, carbohydrate: Number(e.target.value)})}
      />
      <Input 
        label="of which sugars (g)" 
        type="number" 
        step="0.1"
        value={value.of_which_sugars}
        onChange={(e) => onChange({...value, of_which_sugars: Number(e.target.value)})}
      />
      <Input 
        label="Protein (g)" 
        type="number" 
        step="0.1"
        value={value.protein}
        onChange={(e) => onChange({...value, protein: Number(e.target.value)})}
      />
      <Input 
        label="Salt (g)" 
        type="number" 
        step="0.1"
        value={value.salt}
        onChange={(e) => onChange({...value, salt: Number(e.target.value)})}
      />
      <Input 
        label="Total Weight (g)" 
        type="number" 
        step="1"
        value={value.total_weight_grams}
        onChange={(e) => onChange({...value, total_weight_grams: Number(e.target.value)})}
      />
    </div>
  </div>
);
```

## Advanced Features

### Bulk Operations

#### Copy/Clone Options
```jsx
const OptionActions = ({ option, onCopy, onEdit, onDelete }) => (
  <div className="option-actions flex gap-2">
    <Button size="sm" onClick={() => onCopy(option)}>
      📋 Copy
    </Button>
    <Button size="sm" variant="secondary" onClick={() => onEdit(option)}>
      ✏️ Edit
    </Button>
    <Button size="sm" variant="danger" onClick={() => onDelete(option)}>
      🗑️ Delete
    </Button>
  </div>
);
```

#### Bulk Edit Interface
- Select multiple options with checkboxes
- Apply common changes (price adjustments, allergen updates)
- Batch image uploads
- Template application

### Data Validation & Helpers

#### Auto-suggestions
```typescript
const commonIngredients = [
  "Chicken breast", "Lamb shoulder", "Paneer", "Onions", "Tomatoes",
  "Ginger", "Garlic", "Cumin", "Coriander", "Turmeric", "Garam masala",
  "Cardamom", "Cloves", "Cinnamon", "Bay leaves", "Mustard seeds"
];

const commonPairings = [
  "Naan Bread", "Basmati Rice", "Raita", "Pickles", "Lassi",
  "Samosa", "Papadum", "Chutney"
];
```

#### Price Calculator
```typescript
const calculateSuggestedPrice = (ingredients: string[], dishType: string[], complexity: number) => {
  let basePrice = 8.95;
  
  // Adjust based on protein type
  if (ingredients.some(ing => ["Lamb", "Goat"].some(protein => ing.includes(protein)))) {
    basePrice += 2.50;
  } else if (ingredients.some(ing => ing.includes("Chicken"))) {
    basePrice += 1.50;
  }
  
  // Complexity adjustment
  basePrice += complexity * 0.75;
  
  return Math.round(basePrice * 100) / 100;
};
```

### Import/Export Features

#### CSV Import Structure
```csv
Category,Dish Title,Option Name,Price,Spice Level,Dish Type,Allergens,Calorie Range,Description
Traditional Curry,Bhuna,Chicken,10.95,2,Meat,None,300-400,"A rich and aromatic curry..."
```

#### JSON Export/Import
- Full menu structure backup
- Version history tracking
- Rollback capabilities

### Real-time Features

#### Auto-save Implementation
```typescript
const useAutoSave = (data: MenuData, delay = 30000) => {
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isDirty) {
        saveMenu(data);
        setIsDirty(false);
        setLastSaved(new Date());
      }
    }, delay);

    return () => clearInterval(timer);
  }, [data, isDirty, delay]);

  return { isDirty, setIsDirty, lastSaved };
};
```

#### Frontend Preview
```jsx
const FrontendPreview = ({ menuData }) => {
  const [previewMode, setPreviewMode] = useState(false);
  
  return (
    <div className="preview-container">
      <div className="preview-header">
        <Button onClick={() => setPreviewMode(!previewMode)}>
          {previewMode ? 'Hide Preview' : 'Preview Frontend'}
        </Button>
      </div>
      {previewMode && (
        <div className="preview-iframe">
          <iframe 
            src={`${FRONTEND_URL}?preview=true&data=${encodeURIComponent(JSON.stringify(menuData))}`}
            width="100%" 
            height="600px"
          />
        </div>
      )}
    </div>
  );
};
```

## User Experience Enhancements

### Visual Design Elements

#### Drag & Drop Implementation
```typescript
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableCategory = ({ category, index, onMove }) => (
  <DragDropContext onDragEnd={handleDragEnd}>
    <Droppable droppableId="categories">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {categories.map((category, index) => (
            <Draggable key={category.category_id} draggableId={category.category_id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="category-item"
                >
                  {category.category}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);
```

#### Progress Indicators
```jsx
const CompletionStatus = ({ category }) => {
  const totalOptions = category.dishes.reduce((sum, dish) => sum + dish.options.length, 0);
  const completedOptions = category.dishes.reduce((sum, dish) => 
    sum + dish.options.filter(opt => 
      opt.option_name && opt.price && opt.description
    ).length, 0
  );

  return (
    <div className="completion-status">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(completedOptions / totalOptions) * 100}%` }}
        />
      </div>
      <span className="progress-text">
        {completedOptions}/{totalOptions} options complete
      </span>
    </div>
  );
};
```

### Keyboard Shortcuts

```typescript
const useKeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            handleNewItem();
            break;
          case 's':
            e.preventDefault();
            handleSave();
            break;
          case 'd':
            e.preventDefault();
            handleDuplicate();
            break;
        }
      }
      
      if (e.key === 'Delete' && selectedItem) {
        handleDelete(selectedItem);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);
};
```

### Search & Filter

```jsx
const MenuSearch = ({ onSearch, onFilter }) => (
  <div className="search-filter-bar">
    <Input 
      placeholder="Search dishes, ingredients, categories..."
      onChange={(e) => onSearch(e.target.value)}
      icon="🔍"
    />
    <Select 
      placeholder="Filter by type"
      options={["All", "Meat", "Vegetarian", "Vegan"]}
      onChange={onFilter}
    />
  </div>
);
```

## Technical Implementation

### State Management

```typescript
interface MenuEditorState {
  categories: Category[];
  selectedCategoryId?: string;
  selectedDishId?: string;
  selectedOptionId?: string;
  isDirty: boolean;
  lastSaved?: Date;
  searchQuery: string;
  filterType: string;
  autoSaveTimer?: NodeJS.Timeout;
}

const useMenuEditor = () => {
  const [state, setState] = useState<MenuEditorState>({
    categories: [],
    isDirty: false,
    searchQuery: '',
    filterType: 'All'
  });

  const updateMenu = useCallback((updates: Partial<MenuEditorState>) => {
    setState(prev => ({ ...prev, ...updates, isDirty: true }));
  }, []);

  return { state, updateMenu };
};
```

### API Integration

```typescript
const useMenuAPI = () => {
  const saveMenu = async (menuData: MenuData) => {
    try {
      await api.post('/api/v1/admin/menu', menuData);
      return { success: true };
    } catch (error) {
      console.error('Failed to save menu:', error);
      return { success: false, error };
    }
  };

  const loadMenu = async () => {
    try {
      const response = await api.get('/api/v1/admin/menu');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error };
    }
  };

  return { saveMenu, loadMenu };
};
```

### File Upload with AWS S3

```typescript
const useImageUpload = () => {
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await api.post('/api/v1/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return { success: true, url: response.data.url };
    } catch (error) {
      return { success: false, error };
    }
  };

  return { uploadImage };
};
```

## Mobile Responsiveness

### Responsive Breakpoints
```css
/* Tablet and below */
@media (max-width: 768px) {
  .menu-editor {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .option-form .grid {
    grid-template-columns: 1fr;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .nutrition-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

This comprehensive menu input page design provides a powerful, user-friendly interface for managing complex menu data while maintaining data integrity and providing efficient workflows for bulk operations.
