# Ranna Backend V1.0 - Current Implementation Plan

## Overview
A Node.js REST API backend for the Ranna Indian cuisine ordering platform, focused on menu management functionality. Designed for rapid development and deployment using MongoDB, Redis caching, and AWS S3 for file storage.

## Technology Stack

### Core Technologies
- **Runtime**: Node.js with Express.js
- **Language**: JavaScript/TypeScript
- **Database**: MongoDB (primary) + Mongoose ODM
- **Caching**: Redis
- **File Storage**: AWS S3 (images)
- **Validation**: Joi/Zod
- **Documentation**: Swagger/OpenAPI

## Database Schema (MongoDB Collections)

### 1. Menu Collection
```javascript
// Collection: menus
{
  _id: ObjectId(),
  categories: [
    {
      category_id: String, // UUID format for future PostgreSQL compatibility
      category: String, // "Traditional Curry", "Tandoori", etc.
      dishes: [
        {
          dish_id: String, // UUID format
          dish_title: String,
          spice_level: Number, // 1-4
          image_url: String, // S3 URL moved to dish level
          options: [
            {
              option_id: String, // UUID format
              option_name: String,
              short_description: String,
              detailed_description: String,
              price: Number,
              dish_type: [String], // ["Meat", "Vegetarian", "Vegan"]
              ingredients: [String],
              allergens: [String],
              calorie_range: String,
              nutrition: {
                energy_kj: Number,
                energy_kcal: Number,
                fat: Number,
                of_which_saturates: Number,
                carbohydrate: Number,
                of_which_sugars: Number,
                protein: Number,
                salt: Number,
                total_weight_grams: Number
              }
            }
          ]
        }
      ]
    }
  ],
  updated_at: Date,
  created_at: Date
}
```


## API Endpoints

### Menu & Filtering
```
GET    /api/v1/menu                   - Get full menu
GET    /api/v1/menu/filtered          - Get filtered menu
  Query params:
  - spiceLevel: number (1, 2, 3, 4)
  - categories: string[] (comma-separated)
  - dishTypes: string[] (comma-separated: Meat,Vegetarian,Vegan)
  - allergens: string[] (comma-separated, exclusion filter)
  - calorieRange: string (300-400, etc.)
```

### Admin (Future Phase)
```
GET    /api/v1/admin/menu             - Manage menu items
POST   /api/v1/admin/menu             - Add new menu item
PUT    /api/v1/admin/menu/:id         - Update menu item
DELETE /api/v1/admin/menu/:id         - Delete menu item
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js              # MongoDB connection
│   │   ├── redis.js                 # Redis connection
│   │   └── aws.js                   # AWS S3 configuration
│   ├── controllers/
│   │   └── menuController.js        # Menu and filtering endpoints
│   ├── middleware/
│   │   ├── validate.js              # Request validation
│   │   ├── cors.js                  # CORS configuration
│   │   ├── errorHandler.js          # Global error handler
│   │   └── rateLimiter.js           # Rate limiting
│   ├── models/
│   │   └── Menu.js                  # Menu mongoose schema
│   ├── routes/
│   │   └── menu.js                  # Menu routes
│   ├── services/
│   │   ├── menuService.js           # Menu business logic
│   │   └── cacheService.js          # Redis caching logic
│   ├── utils/
│   │   ├── validators.js            # Input validation schemas
│   │   ├── filters.js               # Menu filtering logic
│   │   ├── helpers.js               # Utility functions
│   │   └── constants.js             # App constants
│   ├── data/
│   │   └── seed.js                  # Database seeding script
│   └── app.js                       # Express app setup
├── tests/
│   ├── unit/
│   └── integration/
├── docs/
│   └── api.md                       # API documentation
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Implementation Details

### 1. Menu Controller & Filtering
```javascript
// controllers/menuController.js
const getMenu = async (req, res) => {
  try {
    // Check cache first
    const cached = await cacheService.get('menu:full');
    if (cached) {
      return res.json({ success: true, data: cached });
    }

    // Fetch from MongoDB
    const menu = await Menu.findOne();
    
    // Cache for 1 hour
    await cacheService.set('menu:full', menu, 3600);
    
    res.json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
};

const getFilteredMenu = async (req, res) => {
  try {
    const { spiceLevel, categories, dishTypes, allergens, calorieRange } = req.query;
    
    // Create cache key from filters
    const cacheKey = `menu:filtered:${JSON.stringify(req.query)}`;
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return res.json({ success: true, data: cached });
    }

    const menu = await Menu.findOne();
    const filteredDishes = filterService.filterDishes(menu, req.query);
    
    // Cache for 30 minutes
    await cacheService.set(cacheKey, filteredDishes, 1800);
    
    res.json({ success: true, data: filteredDishes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter menu' });
  }
};
```

### 2. Filtering Logic
```javascript
// utils/filters.js
const filterDishes = (menuData, filters) => {
  const allDishes = menuData.categories.flatMap(category => 
    category.dishes.map(dish => ({
      ...dish,
      category: category.category
    }))
  );

  return allDishes.filter(dish => {
    // Spice level filter
    if (filters.spiceLevel && dish.spice_level !== parseInt(filters.spiceLevel)) {
      return false;
    }
    
    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      const selectedCategories = filters.categories.split(',');
      if (!selectedCategories.includes(dish.category)) {
        return false;
      }
    }
    
    // Dish type filter
    if (filters.dishTypes && filters.dishTypes.length > 0) {
      const selectedTypes = filters.dishTypes.split(',');
      const hasMatchingType = dish.options.some(option => 
        option.dish_type.some(type => selectedTypes.includes(type))
      );
      if (!hasMatchingType) return false;
    }
    
    // Calorie range filter
    if (filters.calorieRange) {
      const hasMatchingCalories = dish.options.some(option => 
        option.calorie_range === filters.calorieRange
      );
      if (!hasMatchingCalories) return false;
    }
    
    // Allergen exclusion filter
    if (filters.allergens && filters.allergens.length > 0) {
      const excludedAllergens = filters.allergens.split(',');
      const hasExcludedAllergen = dish.options.some(option => 
        option.allergens.some(allergen => excludedAllergens.includes(allergen))
      );
      if (hasExcludedAllergen) return false;
    }
    
    return true;
  });
};
```

### 3. Redis Caching Service
```javascript
// services/cacheService.js
const redis = require('../config/redis');

const get = async (key) => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
};

const set = async (key, value, ttl = 3600) => {
  try {
    await redis.setex(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error('Cache set error:', error);
  }
};

const del = async (key) => {
  try {
    await redis.del(key);
  } catch (error) {
    console.error('Cache delete error:', error);
  }
};

module.exports = { get, set, del };
```

### 4. MongoDB Models
```javascript
// models/Menu.js
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  option_id: { type: String, required: true },
  option_name: { type: String, required: true },
  short_description: String,
  detailed_description: String,
  price: { type: Number, required: true },
  dish_type: [String],
  ingredients: [String],
  allergens: [String],
  calorie_range: String,
  nutrition: {
    energy_kj: Number,
    energy_kcal: Number,
    fat: Number,
    of_which_saturates: Number,
    carbohydrate: Number,
    of_which_sugars: Number,
    protein: Number,
    salt: Number,
    total_weight_grams: Number
  }
});

const dishSchema = new mongoose.Schema({
  dish_id: { type: String, required: true },
  dish_title: { type: String, required: true },
  spice_level: { type: Number, min: 1, max: 4 },
  image_url: String,
  options: [optionSchema]
});

const categorySchema = new mongoose.Schema({
  category_id: { type: String, required: true },
  category: { type: String, required: true },
  dishes: [dishSchema]
});

const menuSchema = new mongoose.Schema({
  categories: [categorySchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Menu', menuSchema);
```

## Environment Configuration

```env
# Server
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000

# Database
MONGODB_URI=mongodb://localhost:27017/ranna
REDIS_URL=redis://localhost:6379

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET_NAME=ranna-images-dev
AWS_REGION=eu-west-2

# CORS
FRONTEND_URL=http://localhost:3000
```

## Key Features for V1.0

### 1. Menu Management
- ✅ Full menu retrieval with caching
- ✅ Advanced filtering (spice level, categories, dish types, allergens, calorie range)
- ✅ Real-time menu updates
- ✅ Image URL management via S3

### 2. Performance & Caching
- ✅ Redis caching for menu data
- ✅ Response compression
- ✅ Rate limiting
- ✅ Connection pooling

## Development Timeline

### Week 1: Core Setup
- [ ] Project initialization
- [ ] MongoDB setup and models
- [ ] Redis integration
- [ ] Basic Express server

### Week 2: Menu & Filtering
- [ ] Menu controller and routes
- [ ] Filtering logic implementation
- [ ] Caching implementation
- [ ] API testing

### Week 3: Testing & Optimization
- [ ] API testing and validation
- [ ] Performance optimization
- [ ] Caching improvements
- [ ] Testing and debugging

### Week 4: Polish & Deploy
- [ ] Error handling
- [ ] Input validation
- [ ] API documentation
- [ ] Deployment setup
- [ ] Production testing

## Phase 2.0 Migration Path

This V1.0 implementation sets up the foundation for easy migration to the comprehensive V2.0 plan:

1. **Database Schema**: UUID fields and structure are PostgreSQL-ready
2. **API Design**: RESTful endpoints match V2.0 specification  
3. **Service Layer**: Clear separation allows easy addition of V2.0 services (authentication, orders, payments, cart)

The V1.0 MongoDB implementation can coexist with V2.0 PostgreSQL during migration, ensuring zero downtime.

## Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "redis": "^4.6.0",
    "joi": "^17.11.0",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.0",
    "compression": "^1.7.4",
    "dotenv": "^16.3.1",
    "aws-sdk": "^2.1480.0",
    "multer": "^1.4.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "jest": "^29.7.0",
    "supertest": "^6.3.0"
  }
}
```

This plan provides a solid foundation for the current needs while ensuring smooth transition to the comprehensive V2.0 architecture when needed.
