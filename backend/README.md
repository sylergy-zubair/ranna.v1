# Ranna Backend API V1.0

A Node.js REST API backend for the Ranna Indian cuisine platform, focused on menu management functionality.

## Features

- 🍽️ Full menu retrieval with caching
- 🔍 Advanced filtering (spice level, categories, dish types, allergens, calorie range)
- ⚡ Redis caching for performance
- 🛡️ Security middleware and rate limiting
- 📊 MongoDB with Mongoose ODM
- 🖼️ AWS S3 integration for image storage

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Redis (optional, will continue without it)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the development server:
```bash
npm run dev
```

4. Seed the database (optional):
```bash
npm run seed
```

## API Endpoints

### Menu & Filtering

- `GET /api/v1/menu` - Get full menu
- `GET /api/v1/menu/filtered` - Get filtered menu with query parameters
- `GET /api/v1/menu/filter-options` - Get available filter options
- `GET /api/v1/health` - Health check

### Query Parameters for Filtered Menu

- `spiceLevel`: number (1, 2, 3, 4)
- `categories`: string[] (comma-separated)
- `dishTypes`: string[] (Meat,Vegetarian,Vegan)
- `allergens`: string[] (exclusion filter)
- `calorieRange`: string (300-400, etc.)

### Example Requests

```bash
# Get full menu
curl http://localhost:5000/api/v1/menu

# Filter by spice level
curl "http://localhost:5000/api/v1/menu/filtered?spiceLevel=2"

# Multiple filters
curl "http://localhost:5000/api/v1/menu/filtered?categories=Traditional%20Curry&dishTypes=Meat,Vegetarian&calorieRange=300-400"
```

## Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ranna
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:3000
```

## Project Structure

```
src/
├── config/          # Database and service configurations
├── controllers/     # Route handlers
├── middleware/      # Custom middleware
├── models/          # Mongoose schemas
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Helper functions and constants
├── data/           # Database seeding
└── app.js          # Express app setup
```

## Development

- `npm run dev` - Start with nodemon for auto-restart
- `npm run seed` - Populate database with sample data
- `npm test` - Run tests

## Technology Stack

- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Redis
- **File Storage**: AWS S3
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
