# Database Migration Plan: MongoDB → PostgreSQL

## Overview

This document outlines the complete migration strategy from MongoDB document storage to PostgreSQL relational database for the Ranna food ordering platform. The current data structure is already prepared with UUID identifiers for seamless migration.

## Current Data Structure

Our MongoDB document structure is already migration-ready:

```json
{
  "_id": "menu-collection",
  "categories": [
    {
      "category_id": "a04ed04f-6194-4878-bdb0-9e6f456a74df",
      "category": "Traditional Curry",
      "dishes": [
        {
          "dish_id": "4f8d60b5-fb59-44c5-988b-17f16e39b949",
          "dish_title": "Bhuna",
          "spice_level": 2,
          "pairings": ["Naan Bread", "Basmati Rice", "Raita"],
          "options": [
            {
              "option_id": "c0680b34-aa5e-414a-b891-b1f1df5926c2",
              "option_name": "Chicken",
              "description": "...",
              "detailed_description": "...",
              "price": 10.95,
              "dish_type": ["Meat"],
              "ingredients": [...],
              "allergens": ["None"],
              "calorie_range": "300-400",
              "nutrition": {...}
            }
          ]
        }
      ]
    }
  ]
}
```

## Migration Strategy

### Phase 1: Database Schema Design

#### 1. Core Menu Tables

```sql
-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Dishes table
CREATE TABLE dishes (
    id UUID PRIMARY KEY,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    spice_level INTEGER CHECK (spice_level >= 1 AND spice_level <= 3),
    pairings JSONB, -- Store as JSON array
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Dish options table
CREATE TABLE dish_options (
    id UUID PRIMARY KEY,
    dish_id UUID NOT NULL REFERENCES dishes(id) ON DELETE CASCADE,
    option_name VARCHAR(255) NOT NULL,
    description TEXT,
    detailed_description TEXT,
    image_url VARCHAR(500),
    price DECIMAL(10,2) NOT NULL,
    dish_type TEXT[] NOT NULL, -- Array of strings
    ingredients TEXT[] NOT NULL,
    allergens TEXT[] NOT NULL,
    calorie_range VARCHAR(20),
    nutrition JSONB NOT NULL, -- Store nutrition object as JSON
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. Additional Tables for Full Application

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    delivery_address JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    dish_id UUID NOT NULL REFERENCES dishes(id),
    option_id UUID NOT NULL REFERENCES dish_options(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Phase 2: Migration Scripts

#### 1. Data Extraction Script (MongoDB → JSON)

```javascript
// migration/extract-mongodb-data.js
const { MongoClient } = require('mongodb');
const fs = require('fs');

async function extractMenuData() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  
  const db = client.db('ranna');
  const menuData = await db.collection('menus').findOne({});
  
  // Write to file for processing
  fs.writeFileSync('./migration/menu-data.json', JSON.stringify(menuData, null, 2));
  
  await client.close();
  console.log('✅ Menu data extracted from MongoDB');
}

extractMenuData();
```

#### 2. Data Transformation Script

```javascript
// migration/transform-data.js
const fs = require('fs');

function transformMenuData() {
  const menuData = JSON.parse(fs.readFileSync('./migration/menu-data.json', 'utf8'));
  const transformed = {
    categories: [],
    dishes: [],
    dish_options: []
  };

  menuData.categories.forEach(category => {
    // Transform categories
    transformed.categories.push({
      id: category.category_id,
      name: category.category
    });

    category.dishes.forEach(dish => {
      // Transform dishes
      transformed.dishes.push({
        id: dish.dish_id,
        category_id: category.category_id,
        title: dish.dish_title,
        spice_level: dish.spice_level,
        pairings: JSON.stringify(dish.pairings)
      });

      dish.options.forEach(option => {
        // Transform options
        transformed.dish_options.push({
          id: option.option_id,
          dish_id: dish.dish_id,
          option_name: option.option_name,
          description: option.description,
          detailed_description: option.detailed_description,
          image_url: option.image_url,
          price: option.price,
          dish_type: JSON.stringify(option.dish_type),
          ingredients: JSON.stringify(option.ingredients),
          allergens: JSON.stringify(option.allergens),
          calorie_range: option.calorie_range,
          nutrition: JSON.stringify(option.nutrition)
        });
      });
    });
  });

  // Write transformed data
  fs.writeFileSync('./migration/transformed-data.json', JSON.stringify(transformed, null, 2));
  console.log('✅ Data transformed successfully');
}

transformMenuData();
```

#### 3. PostgreSQL Import Script

```javascript
// migration/import-to-postgres.js
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/ranna'
});

async function importToPostgreSQL() {
  const transformedData = JSON.parse(fs.readFileSync('./migration/transformed-data.json', 'utf8'));
  
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Insert categories
    for (const category of transformedData.categories) {
      await client.query(
        'INSERT INTO categories (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name',
        [category.id, category.name]
      );
    }
    
    // Insert dishes
    for (const dish of transformedData.dishes) {
      await client.query(
        `INSERT INTO dishes (id, category_id, title, spice_level, pairings) 
         VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET
         category_id = EXCLUDED.category_id,
         title = EXCLUDED.title,
         spice_level = EXCLUDED.spice_level,
         pairings = EXCLUDED.pairings`,
        [dish.id, dish.category_id, dish.title, dish.spice_level, dish.pairings]
      );
    }
    
    // Insert dish options
    for (const option of transformedData.dish_options) {
      await client.query(
        `INSERT INTO dish_options (id, dish_id, option_name, description, detailed_description, 
         image_url, price, dish_type, ingredients, allergens, calorie_range, nutrition) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT (id) DO UPDATE SET
         dish_id = EXCLUDED.dish_id,
         option_name = EXCLUDED.option_name,
         description = EXCLUDED.description,
         detailed_description = EXCLUDED.detailed_description,
         image_url = EXCLUDED.image_url,
         price = EXCLUDED.price,
         dish_type = EXCLUDED.dish_type,
         ingredients = EXCLUDED.ingredients,
         allergens = EXCLUDED.allergens,
         calorie_range = EXCLUDED.calorie_range,
         nutrition = EXCLUDED.nutrition`,
        [
          option.id, option.dish_id, option.option_name, option.description,
          option.detailed_description, option.image_url, option.price,
          option.dish_type, option.ingredients, option.allergens,
          option.calorie_range, option.nutrition
        ]
      );
    }
    
    await client.query('COMMIT');
    console.log('✅ Data imported to PostgreSQL successfully');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

importToPostgreSQL().finally(() => pool.end());
```

### Phase 3: Application Code Updates

#### 1. Update ORM/Query Layer

```typescript
// src/repositories/MenuRepository.ts
import { PrismaClient } from '@prisma/client';

export class MenuRepository {
  constructor(private prisma: PrismaClient) {}

  async getFullMenu() {
    return await this.prisma.category.findMany({
      include: {
        dishes: {
          include: {
            options: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
  }

  async getDishById(dishId: string) {
    return await this.prisma.dish.findUnique({
      where: { id: dishId },
      include: {
        options: true,
        category: true
      }
    });
  }

  async getFilteredDishes(filters: FilterState) {
    // Build complex filtering logic for all filter types
    const where: any = {};
    const optionFilters: any[] = [];

    // 1. Spice level filter (single select) - Direct dish property
    if (filters.spiceLevel !== null) {
      where.spice_level = filters.spiceLevel;
    }

    // 2. Categories filter (multi-select) - Need to map category names to UUIDs
    if (filters.categories.length > 0) {
      const categoryIds = await this.mapCategoryNamesToIds(filters.categories);
      if (categoryIds.length > 0) {
        where.category_id = { in: categoryIds };
      } else {
        // No matching categories found, return empty result
        return [];
      }
    }

    // 3. Dish types filter (multi-select) - Check if any option has matching types
    if (filters.dishTypes.length > 0) {
      optionFilters.push({
        some: {
          dish_type: {
            hasSome: filters.dishTypes // PostgreSQL array overlap operator
          }
        }
      });
    }

    // 4. Calorie range filter (single select) - Check if any option matches
    if (filters.calorieRange !== null) {
      optionFilters.push({
        some: {
          calorie_range: filters.calorieRange
        }
      });
    }

    // 5. Allergens filter (multi-select EXCLUSION) - Exclude if any option has these allergens
    if (filters.allergens.length > 0) {
      optionFilters.push({
        none: {
          allergens: {
            hasSome: filters.allergens // Exclude dishes with these allergens
          }
        }
      });
    }

    // Combine all option-based filters with AND logic
    if (optionFilters.length > 0) {
      where.options = { AND: optionFilters };
    }

    return await this.prisma.dish.findMany({
      where,
      include: {
        options: true,
        category: true
      },
      orderBy: [
        { category: { name: 'asc' } },
        { title: 'asc' }
      ]
    });
  }

  // Helper method to map category names to UUIDs
  private async mapCategoryNamesToIds(categoryNames: string[]): Promise<string[]> {
    const categories = await this.prisma.category.findMany({
      where: { 
        name: { 
          in: categoryNames 
        } 
      },
      select: { id: true }
    });
    return categories.map(cat => cat.id);
  }

  // Get available filter options for the frontend
  async getAvailableFilterOptions() {
    const [categories, allOptions] = await Promise.all([
      // Get all categories with their names
      this.prisma.category.findMany({
        select: { name: true },
        orderBy: { name: 'asc' }
      }),
      
      // Get all dish options for extracting unique values
      this.prisma.dishOption.findMany({
        select: {
          dish_type: true,
          allergens: true,
          calorie_range: true
        }
      })
    ]);

    // Extract unique values
    const dishTypes = new Set<string>();
    const allergens = new Set<string>();
    const calorieRanges = new Set<string>();

    allOptions.forEach(option => {
      if (option.dish_type) {
        option.dish_type.forEach(type => dishTypes.add(type));
      }
      if (option.allergens) {
        option.allergens.forEach(allergen => {
          if (allergen !== 'None') {
            allergens.add(allergen);
          }
        });
      }
      if (option.calorie_range) {
        calorieRanges.add(option.calorie_range);
      }
    });

    return {
      categories: categories.map(cat => cat.name),
      dishTypes: Array.from(dishTypes).sort(),
      allergens: Array.from(allergens).sort(),
      calorieRanges: Array.from(calorieRanges).sort()
    };
  }
}
```

#### 2. Update API Endpoints

```typescript
// src/controllers/MenuController.ts
import { Request, Response } from 'express';

interface FilterQueryParams {
  spiceLevel?: string;
  dishTypes?: string;
  categories?: string;
  allergens?: string;
  calorieRange?: string;
}

interface FilterState {
  spiceLevel: number | null;
  dishTypes: string[];
  categories: string[];
  allergens: string[];
  calorieRange: string | null;
}

export class MenuController {
  constructor(private menuRepo: MenuRepository) {}

  async getMenu(req: Request, res: Response) {
    try {
      const menu = await this.menuRepo.getFullMenu();
      res.json({ success: true, data: menu });
    } catch (error) {
      console.error('Error fetching menu:', error);
      res.status(500).json({ error: 'Failed to fetch menu' });
    }
  }

  async getFilteredMenu(req: Request<{}, {}, {}, FilterQueryParams>, res: Response) {
    try {
      // Parse and validate query parameters
      const filters = this.parseFilterParams(req.query);
      
      const dishes = await this.menuRepo.getFilteredDishes(filters);
      res.json({ success: true, data: dishes });
    } catch (error) {
      console.error('Error filtering menu:', error);
      res.status(500).json({ error: 'Failed to filter menu' });
    }
  }

  async getFilterOptions(req: Request, res: Response) {
    try {
      const options = await this.menuRepo.getAvailableFilterOptions();
      res.json({ success: true, data: options });
    } catch (error) {
      console.error('Error fetching filter options:', error);
      res.status(500).json({ error: 'Failed to fetch filter options' });
    }
  }

  private parseFilterParams(query: FilterQueryParams): FilterState {
    return {
      spiceLevel: query.spiceLevel ? parseInt(query.spiceLevel) : null,
      dishTypes: query.dishTypes ? query.dishTypes.split(',') : [],
      categories: query.categories ? query.categories.split(',') : [],
      allergens: query.allergens ? query.allergens.split(',') : [],
      calorieRange: query.calorieRange || null
    };
  }
}
```

#### 3. Prisma Schema Updates

Create or update your `prisma/schema.prisma` file to match the PostgreSQL schema:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Category {
  id        String   @id @default(uuid()) @db.Uuid
  name      String   @unique
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  dishes    Dish[]
  
  @@map("categories")
}

model Dish {
  id          String   @id @default(uuid()) @db.Uuid
  categoryId  String   @map("category_id") @db.Uuid
  title       String
  spiceLevel  Int      @map("spice_level") // 1-3
  pairings    Json?    // JSON array
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  
  category    Category   @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  options     DishOption[]
  
  @@map("dishes")
}

model DishOption {
  id                  String   @id @default(uuid()) @db.Uuid
  dishId              String   @map("dish_id") @db.Uuid
  optionName          String   @map("option_name")
  description         String?
  detailedDescription String?  @map("detailed_description")
  imageUrl            String?  @map("image_url")
  price               Decimal  @db.Decimal(10, 2)
  dishType            String[] @map("dish_type") // Array of dish types
  ingredients         String[] // Array of ingredients
  allergens           String[] // Array of allergens
  calorieRange        String?  @map("calorie_range")
  nutrition           Json     // JSON object with nutrition info
  createdAt           DateTime @default(now()) @map("created_at")
  updatedAt           DateTime @updatedAt @map("updated_at")
  
  dish Dish @relation(fields: [dishId], references: [id], onDelete: Cascade)
  
  @@map("dish_options")
}
```

#### 4. Frontend API Updates

Update your frontend data loading to use the new API endpoints:

```typescript
// frontend/src/utils/apiUtils.ts
export class MenuAPI {
  private baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

  async getFullMenu() {
    const response = await fetch(`${this.baseURL}/menu`);
    const result = await response.json();
    return result.data;
  }

  async getFilteredDishes(filters: FilterState) {
    const params = new URLSearchParams();
    
    if (filters.spiceLevel !== null) {
      params.append('spiceLevel', filters.spiceLevel.toString());
    }
    if (filters.dishTypes.length > 0) {
      params.append('dishTypes', filters.dishTypes.join(','));
    }
    if (filters.categories.length > 0) {
      params.append('categories', filters.categories.join(','));
    }
    if (filters.allergens.length > 0) {
      params.append('allergens', filters.allergens.join(','));
    }
    if (filters.calorieRange !== null) {
      params.append('calorieRange', filters.calorieRange);
    }

    const response = await fetch(`${this.baseURL}/menu/filter?${params}`);
    const result = await response.json();
    return result.data;
  }

  async getFilterOptions() {
    const response = await fetch(`${this.baseURL}/menu/filter-options`);
    const result = await response.json();
    return result.data;
  }
}
```

### Phase 4: Migration Execution Plan

#### Pre-Migration Checklist

- [ ] **Backup MongoDB data**
  ```bash
  mongodump --db ranna --out ./backup/mongodb-$(date +%Y%m%d)
  ```

- [ ] **Set up PostgreSQL instance**
  ```bash
  # Docker setup
  docker run --name ranna-postgres -e POSTGRES_DB=ranna -e POSTGRES_USER=ranna -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15
  ```

- [ ] **Create database schema**
  ```bash
  psql -h localhost -U ranna -d ranna -f schema.sql
  ```

- [ ] **Install migration dependencies**
  ```bash
  npm install pg prisma @types/pg
  ```

#### Migration Execution Steps

1. **Preparation (5 minutes)**
   ```bash
   # Create migration directory
   mkdir -p migration
   
   # Set environment variables
   export DATABASE_URL="postgresql://user:password@localhost:5432/ranna"
   export MONGODB_URI="mongodb://localhost:27017/ranna"
   ```

2. **Data Extraction (2 minutes)**
   ```bash
   node migration/extract-mongodb-data.js
   ```

3. **Data Transformation (1 minute)**
   ```bash
   node migration/transform-data.js
   ```

4. **Database Import (5 minutes)**
   ```bash
   node migration/import-to-postgres.js
   ```

5. **Verification (2 minutes)**
   ```bash
   # Verify data integrity
   psql -h localhost -U ranna -d ranna -c "SELECT COUNT(*) FROM categories;"
   psql -h localhost -U ranna -d ranna -c "SELECT COUNT(*) FROM dishes;"
   psql -h localhost -U ranna -d ranna -c "SELECT COUNT(*) FROM dish_options;"
   ```

### Phase 5: Testing & Validation

#### 1. Data Integrity Tests

```javascript
// migration/validate-migration.js
async function validateMigration() {
  const client = await pool.connect();
  
  try {
    // Check category count
    const categoryCount = await client.query('SELECT COUNT(*) FROM categories');
    console.log(`Categories migrated: ${categoryCount.rows[0].count}`);
    
    // Check dish count
    const dishCount = await client.query('SELECT COUNT(*) FROM dishes');
    console.log(`Dishes migrated: ${dishCount.rows[0].count}`);
    
    // Check options count
    const optionCount = await client.query('SELECT COUNT(*) FROM dish_options');
    console.log(`Options migrated: ${optionCount.rows[0].count}`);
    
    // Verify relationships
    const orphanedDishes = await client.query(`
      SELECT COUNT(*) FROM dishes d 
      LEFT JOIN categories c ON d.category_id = c.id 
      WHERE c.id IS NULL
    `);
    
    const orphanedOptions = await client.query(`
      SELECT COUNT(*) FROM dish_options o 
      LEFT JOIN dishes d ON o.dish_id = d.id 
      WHERE d.id IS NULL
    `);
    
    console.log(`Orphaned dishes: ${orphanedDishes.rows[0].count}`);
    console.log(`Orphaned options: ${orphanedOptions.rows[0].count}`);
    
  } finally {
    client.release();
  }
}
```

#### 2. Filtering Logic Testing

Create comprehensive tests for all filtering scenarios:

```javascript
// migration/test-filtering.js
const { PrismaClient } = require('@prisma/client');

async function testAllFilters() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🧪 Testing all filter combinations...');
    
    // Test 1: Spice Level Filter
    console.log('\n1. Testing Spice Level Filter:');
    const mildDishes = await prisma.dish.findMany({
      where: { spice_level: 1 },
      include: { options: true, category: true }
    });
    console.log(`Found ${mildDishes.length} mild dishes`);
    
    // Test 2: Category Filter
    console.log('\n2. Testing Category Filter:');
    const categoryIds = await prisma.category.findMany({
      where: { name: { in: ['Traditional Curry'] } },
      select: { id: true }
    });
    const categoryDishes = await prisma.dish.findMany({
      where: { category_id: { in: categoryIds.map(c => c.id) } },
      include: { options: true, category: true }
    });
    console.log(`Found ${categoryDishes.length} Traditional Curry dishes`);
    
    // Test 3: Dish Types Filter
    console.log('\n3. Testing Dish Types Filter:');
    const meatDishes = await prisma.dish.findMany({
      where: {
        options: {
          some: {
            dish_type: { hasSome: ['Meat'] }
          }
        }
      },
      include: { options: true, category: true }
    });
    console.log(`Found ${meatDishes.length} dishes with Meat options`);
    
    // Test 4: Calorie Range Filter
    console.log('\n4. Testing Calorie Range Filter:');
    const lowCalDishes = await prisma.dish.findMany({
      where: {
        options: {
          some: {
            calorie_range: '100-200'
          }
        }
      },
      include: { options: true, category: true }
    });
    console.log(`Found ${lowCalDishes.length} dishes with 100-200 calorie options`);
    
    // Test 5: Allergens Filter (Exclusion)
    console.log('\n5. Testing Allergens Filter (Exclusion):');
    const allergenFreeDishes = await prisma.dish.findMany({
      where: {
        options: {
          none: {
            allergens: { hasSome: ['Dairy'] }
          }
        }
      },
      include: { options: true, category: true }
    });
    console.log(`Found ${allergenFreeDishes.length} dishes without Dairy allergens`);
    
    // Test 6: Combined Filters
    console.log('\n6. Testing Combined Filters:');
    const combinedResult = await prisma.dish.findMany({
      where: {
        AND: [
          { spice_level: 2 },
          { category_id: { in: categoryIds.map(c => c.id) } },
          {
            options: {
              some: {
                dish_type: { hasSome: ['Meat'] }
              }
            }
          }
        ]
      },
      include: { options: true, category: true }
    });
    console.log(`Found ${combinedResult.length} medium spicy Traditional Curry dishes with Meat options`);
    
    console.log('\n✅ All filter tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Filter testing failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAllFilters();
```

#### 3. API Endpoint Testing

```bash
# Test all API endpoints with proper filtering
echo "Testing full menu endpoint..."
curl -s http://localhost:3001/api/menu | jq '.data | length'

echo "Testing filter options endpoint..."
curl -s http://localhost:3001/api/menu/filter-options | jq '.data'

echo "Testing single spice level filter..."
curl -s "http://localhost:3001/api/menu/filter?spiceLevel=2" | jq '.data | length'

echo "Testing category filter..."
curl -s "http://localhost:3001/api/menu/filter?categories=Traditional%20Curry" | jq '.data | length'

echo "Testing dish types filter..."
curl -s "http://localhost:3001/api/menu/filter?dishTypes=Meat,Vegetarian" | jq '.data | length'

echo "Testing calorie range filter..."
curl -s "http://localhost:3001/api/menu/filter?calorieRange=200-300" | jq '.data | length'

echo "Testing allergens exclusion filter..."
curl -s "http://localhost:3001/api/menu/filter?allergens=Dairy" | jq '.data | length'

echo "Testing combined filters..."
curl -s "http://localhost:3001/api/menu/filter?spiceLevel=2&categories=Traditional%20Curry&dishTypes=Meat" | jq '.data | length'
```

#### 4. Performance Testing

```javascript
// migration/performance-test.js
async function testFilterPerformance() {
  const prisma = new PrismaClient();
  
  try {
    console.log('⚡ Testing filter performance...');
    
    const startTime = Date.now();
    
    // Test complex combined query
    await prisma.dish.findMany({
      where: {
        AND: [
          { spice_level: 2 },
          {
            options: {
              some: {
                dish_type: { hasSome: ['Meat', 'Vegetarian'] }
              }
            }
          },
          {
            options: {
              none: {
                allergens: { hasSome: ['Dairy', 'Gluten'] }
              }
            }
          }
        ]
      },
      include: {
        options: true,
        category: true
      }
    });
    
    const endTime = Date.now();
    console.log(`Complex filter query took: ${endTime - startTime}ms`);
    
    // Performance should be under 200ms for complex filters
    if (endTime - startTime > 200) {
      console.warn('⚠️  Filter performance is slower than expected. Consider adding more indexes.');
    } else {
      console.log('✅ Filter performance is acceptable.');
    }
    
  } finally {
    await prisma.$disconnect();
  }
}
```

### Phase 6: Rollback Plan

If migration fails or issues are discovered:

```bash
# Rollback steps
1. Stop application
2. Restore from MongoDB backup: mongorestore ./backup/mongodb-YYYYMMDD
3. Update application environment to point back to MongoDB
4. Restart application
```

### Migration Timeline

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Schema Setup | 30 minutes | PostgreSQL instance |
| Data Extraction | 5 minutes | MongoDB access |
| Data Transformation | 10 minutes | Data structure validation |
| Database Import | 15 minutes | PostgreSQL instance |
| Testing & Validation | 20 minutes | Application setup |
| **Total** | **80 minutes** | All systems operational |

## Risk Mitigation

### High-Risk Areas
1. **Data loss during migration**
   - **Mitigation**: Complete backup before migration
   
2. **Application downtime**
   - **Mitigation**: Blue-green deployment strategy
   
3. **Performance degradation**
   - **Mitigation**: Database indexing and query optimization

### Rollback Triggers
- Data integrity validation fails
- Application performance drops >20%
- Critical errors in production logs

## Post-Migration Optimization

### Database Indexes
```sql
-- Performance indexes
CREATE INDEX idx_dishes_category_id ON dishes(category_id);
CREATE INDEX idx_dish_options_dish_id ON dish_options(dish_id);
CREATE INDEX idx_dish_options_price ON dish_options(price);
CREATE INDEX idx_dish_options_dish_type ON dish_options USING GIN(dish_type);
CREATE INDEX idx_dish_options_allergens ON dish_options USING GIN(allergens);
```

### Monitoring
- Set up database performance monitoring
- Configure alerts for slow queries
- Monitor application response times

This migration plan ensures a smooth transition from MongoDB to PostgreSQL while maintaining data integrity and minimizing downtime.
