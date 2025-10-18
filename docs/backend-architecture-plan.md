# Ranna Backend Architecture Plan - V2.0

## Overview
A comprehensive, scalable, RESTful API backend for the Ranna Indian cuisine ordering platform, designed to handle advanced menu management, orders, user authentication, real-time updates, and enterprise features. This is the long-term architecture plan.

**Note**: This is the V2.0 comprehensive plan. For immediate implementation, see `backend-v1-plan.md` which focuses on the current stack: Node.js + Express + MongoDB + Redis + AWS S3.

## Technology Stack

### Core Technologies
- **Runtime**: Node.js with Express.js / NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL (primary) + Redis (caching)
- **ORM**: Prisma / TypeORM
- **Authentication**: JWT + Passport.js
- **File Storage**: AWS S3 / Cloudinary (for images)
- **Payment**: Stripe API
- **Email**: SendGrid / AWS SES
- **Real-time**: Socket.io (for order tracking)

### Alternative Stack (Modern)
- **Runtime**: Node.js with Fastify
- **Database**: PostgreSQL + Supabase
- **ORM**: Drizzle ORM
- **Authentication**: NextAuth.js / Clerk
- **Deployment**: Vercel / Railway

## Database Schema

### Core Tables

#### 1. Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'customer', -- customer, admin, chef
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. Addresses
```sql
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  postcode VARCHAR(20) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3. Categories
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 4. Dishes
```sql
CREATE TABLE dishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  spice_level INTEGER CHECK (spice_level BETWEEN 1 AND 3),
  pairings TEXT[], -- Array of pairing suggestions
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 5. Dish_Options
```sql
CREATE TABLE dish_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dish_id UUID REFERENCES dishes(id) ON DELETE CASCADE,
  option_name VARCHAR(100) NOT NULL,
  description TEXT,
  detailed_description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  calorie_range VARCHAR(20),
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 6. Option_Metadata
```sql
CREATE TABLE option_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  option_id UUID REFERENCES dish_options(id) ON DELETE CASCADE,
  dish_types TEXT[], -- ['Meat', 'Vegetarian', etc.]
  ingredients TEXT[],
  allergens TEXT[],
  calories INTEGER,
  protein DECIMAL(5, 2),
  carbs DECIMAL(5, 2),
  fat DECIMAL(5, 2),
  fiber DECIMAL(5, 2)
);
```

#### 7. Orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  order_number VARCHAR(20) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, preparing, ready, delivered, cancelled
  subtotal DECIMAL(10, 2) NOT NULL,
  delivery_fee DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  delivery_address_id UUID REFERENCES addresses(id),
  special_instructions TEXT,
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  payment_intent_id VARCHAR(255), -- Stripe payment intent
  estimated_delivery_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 8. Order_Items
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  dish_option_id UUID REFERENCES dish_options(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 9. Cart
```sql
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  dish_option_id UUID REFERENCES dish_options(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, dish_option_id)
);
```

#### 10. Reviews
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  dish_id UUID REFERENCES dishes(id),
  order_id UUID REFERENCES orders(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/logout            - Logout user
POST   /api/auth/refresh           - Refresh JWT token
POST   /api/auth/forgot-password   - Request password reset
POST   /api/auth/reset-password    - Reset password
GET    /api/auth/me                - Get current user
```

### Menu
```
GET    /api/menu                   - Get full menu (categories + dishes)
GET    /api/categories             - Get all categories
GET    /api/categories/:id         - Get category by ID
GET    /api/dishes                 - Get all dishes (with filters)
GET    /api/dishes/:id             - Get dish by ID with options
GET    /api/dishes/:id/options     - Get all options for a dish
```

### Cart
```
GET    /api/cart                   - Get user's cart
POST   /api/cart/items             - Add item to cart
PUT    /api/cart/items/:id         - Update cart item quantity
DELETE /api/cart/items/:id         - Remove item from cart
DELETE /api/cart                   - Clear cart
```

### Orders
```
GET    /api/orders                 - Get user's orders (with pagination)
GET    /api/orders/:id             - Get order details
POST   /api/orders                 - Create new order
PUT    /api/orders/:id/cancel      - Cancel order
GET    /api/orders/:id/track       - Track order status
```

### Payments
```
POST   /api/payments/intent        - Create payment intent (Stripe)
POST   /api/payments/confirm       - Confirm payment
POST   /api/payments/webhook       - Stripe webhook handler
```

### User Profile
```
GET    /api/users/profile          - Get user profile
PUT    /api/users/profile          - Update user profile
GET    /api/users/addresses        - Get user addresses
POST   /api/users/addresses        - Add new address
PUT    /api/users/addresses/:id    - Update address
DELETE /api/users/addresses/:id    - Delete address
```

### Reviews
```
GET    /api/dishes/:id/reviews     - Get reviews for a dish
POST   /api/orders/:id/review      - Submit review for order
PUT    /api/reviews/:id            - Update review
DELETE /api/reviews/:id            - Delete review
```

### Admin
```
GET    /api/admin/orders           - Get all orders (with filters)
PUT    /api/admin/orders/:id       - Update order status
GET    /api/admin/dishes           - Manage dishes
POST   /api/admin/dishes           - Create dish
PUT    /api/admin/dishes/:id       - Update dish
DELETE /api/admin/dishes/:id       - Delete dish
GET    /api/admin/analytics        - Get sales analytics
```

## Business Logic Layer

### Services

#### 1. MenuService
```typescript
class MenuService {
  async getFullMenu(filters?: MenuFilters): Promise<Menu>
  async getDishById(dishId: string): Promise<Dish>
  async searchDishes(query: string): Promise<Dish[]>
  async filterDishes(filters: FilterState): Promise<Dish[]>
  async getDishAvailability(dishId: string): Promise<boolean>
}
```

#### 2. OrderService
```typescript
class OrderService {
  async createOrder(orderData: CreateOrderDTO): Promise<Order>
  async calculateOrderTotal(items: CartItem[]): Promise<OrderTotal>
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order>
  async cancelOrder(orderId: string): Promise<Order>
  async getOrderHistory(userId: string, pagination: Pagination): Promise<Order[]>
  async trackOrder(orderId: string): Promise<OrderTracking>
}
```

#### 3. CartService
```typescript
class CartService {
  async getCart(userId: string): Promise<Cart>
  async addToCart(userId: string, item: CartItemDTO): Promise<Cart>
  async updateQuantity(userId: string, itemId: string, quantity: number): Promise<Cart>
  async removeFromCart(userId: string, itemId: string): Promise<Cart>
  async clearCart(userId: string): Promise<void>
  async validateCart(userId: string): Promise<CartValidation>
}
```

#### 4. PaymentService
```typescript
class PaymentService {
  async createPaymentIntent(amount: number, currency: string): Promise<PaymentIntent>
  async confirmPayment(paymentIntentId: string): Promise<Payment>
  async refundPayment(paymentId: string, amount?: number): Promise<Refund>
  async handleWebhook(event: StripeEvent): Promise<void>
}
```

#### 5. NotificationService
```typescript
class NotificationService {
  async sendOrderConfirmation(order: Order): Promise<void>
  async sendOrderStatusUpdate(order: Order): Promise<void>
  async sendDeliveryNotification(order: Order): Promise<void>
  async sendEmail(to: string, template: string, data: any): Promise<void>
  async sendSMS(phone: string, message: string): Promise<void>
}
```

## Middleware

### 1. Authentication Middleware
```typescript
const authenticate = async (req, res, next) => {
  // Verify JWT token
  // Attach user to request
  // Handle token expiration
}
```

### 2. Authorization Middleware
```typescript
const authorize = (roles: string[]) => {
  return async (req, res, next) => {
    // Check user role
    // Allow/deny access
  }
}
```

### 3. Validation Middleware
```typescript
const validate = (schema: ZodSchema) => {
  return async (req, res, next) => {
    // Validate request body/params
    // Return validation errors
  }
}
```

### 4. Rate Limiting
```typescript
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests'
});
```

### 5. Error Handler
```typescript
const errorHandler = (err, req, res, next) => {
  // Log error
  // Format error response
  // Send appropriate status code
}
```

## Caching Strategy

### Redis Cache
```typescript
// Cache menu data (TTL: 1 hour)
await redis.setex('menu:full', 3600, JSON.stringify(menu));

// Cache user cart (TTL: 24 hours)
await redis.setex(`cart:${userId}`, 86400, JSON.stringify(cart));

// Cache dish details (TTL: 30 minutes)
await redis.setex(`dish:${dishId}`, 1800, JSON.stringify(dish));

// Invalidate cache on updates
await redis.del('menu:full');
```

## Real-time Features (Socket.io)

### Order Tracking
```typescript
// Server-side
io.on('connection', (socket) => {
  socket.on('subscribe:order', (orderId) => {
    socket.join(`order:${orderId}`);
  });
});

// Emit order updates
io.to(`order:${orderId}`).emit('order:update', {
  status: 'preparing',
  estimatedTime: '20 minutes'
});

// Client-side
socket.on('order:update', (data) => {
  // Update UI with new order status
});
```

## Security Measures

### 1. Input Validation
- Use Zod/Joi for schema validation
- Sanitize all user inputs
- Prevent SQL injection with parameterized queries

### 2. Authentication
- Bcrypt for password hashing (12 rounds)
- JWT with short expiration (15 minutes)
- Refresh tokens with longer expiration (7 days)
- HTTP-only cookies for tokens

### 3. Authorization
- Role-based access control (RBAC)
- Resource-level permissions
- API key for admin operations

### 4. Data Protection
- HTTPS only
- CORS configuration
- Rate limiting
- Request size limits
- Helmet.js for security headers

### 5. Payment Security
- PCI compliance via Stripe
- Never store card details
- Webhook signature verification
- Idempotency keys for payments

## File Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── stripe.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── menu.controller.ts
│   │   ├── cart.controller.ts
│   │   ├── order.controller.ts
│   │   └── payment.controller.ts
│   ├── services/
│   │   ├── menu.service.ts
│   │   ├── cart.service.ts
│   │   ├── order.service.ts
│   │   ├── payment.service.ts
│   │   └── notification.service.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── dish.model.ts
│   │   ├── order.model.ts
│   │   └── cart.model.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validate.middleware.ts
│   │   └── error.middleware.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── menu.routes.ts
│   │   ├── cart.routes.ts
│   │   ├── order.routes.ts
│   │   └── admin.routes.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── email.ts
│   │   └── validators.ts
│   ├── types/
│   │   └── index.ts
│   └── app.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
│   ├── unit/
│   └── integration/
├── .env.example
├── package.json
└── tsconfig.json
```

## Environment Variables

```env
# Server
NODE_ENV=production
PORT=5000
API_URL=https://api.ranna.com

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ranna
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET_NAME=ranna-images
AWS_REGION=eu-west-2

# Email
SENDGRID_API_KEY=your-api-key
FROM_EMAIL=noreply@ranna.com

# Frontend
FRONTEND_URL=https://ranna.com
```

## Deployment

### Docker Setup
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
  
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ranna
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## Performance Optimization

### 1. Database Indexing
```sql
CREATE INDEX idx_dishes_category ON dishes(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_dish_options_dish ON dish_options(dish_id);
```

### 2. Query Optimization
- Use eager loading for related data
- Implement pagination for large datasets
- Use database views for complex queries
- Implement connection pooling

### 3. Caching
- Cache frequently accessed menu data
- Cache user sessions
- Implement CDN for static assets
- Use Redis for real-time data

## Monitoring & Logging

### Tools
- **Logging**: Winston / Pino
- **Monitoring**: Datadog / New Relic
- **Error Tracking**: Sentry
- **APM**: Application Performance Monitoring
- **Metrics**: Prometheus + Grafana

### Key Metrics
- API response times
- Error rates
- Database query performance
- Cache hit rates
- Order completion rates
- Payment success rates

## Testing Strategy

### Unit Tests
```typescript
describe('OrderService', () => {
  it('should calculate order total correctly', async () => {
    const items = [/* cart items */];
    const total = await orderService.calculateOrderTotal(items);
    expect(total.subtotal).toBe(30.85);
  });
});
```

### Integration Tests
```typescript
describe('POST /api/orders', () => {
  it('should create a new order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(orderData);
    
    expect(response.status).toBe(201);
    expect(response.body.order).toBeDefined();
  });
});
```

## Future Enhancements

1. **Loyalty Program**: Points system for repeat customers
2. **Recommendations**: AI-based dish recommendations
3. **Inventory Management**: Real-time stock tracking
4. **Delivery Integration**: Third-party delivery service APIs
5. **Multi-language Support**: i18n for menu items
6. **Analytics Dashboard**: Business intelligence and reporting
7. **Mobile App API**: Optimized endpoints for mobile
8. **Subscription Model**: Meal plans and subscriptions
9. **Kitchen Display System**: Real-time order management for kitchen
10. **Table Reservations**: Booking system integration

## Estimated Timeline

- **Phase 1** (2 weeks): Database setup, authentication, basic CRUD
- **Phase 2** (2 weeks): Menu API, cart functionality
- **Phase 3** (2 weeks): Order management, payment integration
- **Phase 4** (1 week): Real-time features, notifications
- **Phase 5** (1 week): Testing, optimization, deployment

**Total**: 8 weeks for MVP
