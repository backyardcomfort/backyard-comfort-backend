# API Documentation

## Base URL

```
https://backyard-comfort-backend.vercel.app/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

## Endpoints

### Products

#### List Products

```http
GET /api/products?category=van-life-essentials&skip=0&take=20
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "sku": "BC-001",
      "name": "Premium Solar Panel 100W",
      "slug": "premium-solar-panel-100w",
      "price": "299.99",
      "salePrice": null,
      "images": [],
      "thumbnail": null,
      "rating": 4.5,
      "reviewCount": 12,
      "category": "Off Grid Living",
      "isFeatured": true
    }
  ],
  "pagination": {
    "skip": 0,
    "take": 20,
    "total": 145
  }
}
```

#### Get Product

```http
GET /api/products/{id}
```

#### Create Product (Admin)

```http
POST /api/products
Content-Type: application/json
Authorization: Bearer {token}

{
  "sku": "BC-001",
  "name": "Premium Solar Panel 100W",
  "slug": "premium-solar-panel-100w",
  "description": "High-efficiency solar panel",
  "category": "Off Grid Living",
  "price": "299.99",
  "cost": "150.00",
  "stock": 50
}
```

#### Update Product (Admin)

```http
PUT /api/products/{id}
Content-Type: application/json
Authorization: Bearer {token}

{
  "price": "349.99",
  "stock": 45
}
```

---

### Orders

#### Create Order

```http
POST /api/orders
Content-Type: application/json

{
  "userId": "user-id",
  "items": [
    {
      "productId": "product-id",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Portland",
    "state": "OR",
    "country": "US",
    "postalCode": "97201"
  },
  "billingAddress": {
    "street": "123 Main St",
    "city": "Portland",
    "state": "OR",
    "country": "US",
    "postalCode": "97201"
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "order-id",
    "orderNumber": "BC123456789",
    "userId": "user-id",
    "status": "pending",
    "paymentStatus": "pending",
    "subtotal": "299.99",
    "total": "299.99",
    "items": [
      {
        "id": "item-id",
        "productId": "product-id",
        "quantity": 1,
        "price": "299.99",
        "total": "299.99"
      }
    ]
  }
}
```

#### Get Order

```http
GET /api/orders/{id}
```

#### Get User Orders

```http
GET /api/orders?userId={userId}
```

---

### AI

#### Generate Setup

```http
POST /api/ai-setup
Content-Type: application/json

{
  "budget": 1500,
  "useCase": "van_life",
  "experienceLevel": "intermediate",
  "climate": "temperate",
  "spaceSize": "small"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "essentials": [...],
    "upgrades": [...],
    "premiumUpgrades": [...],
    "budgetAlternatives": [...],
    "starterKit": {...},
    "totalEstimate": 1450.00
  }
}
```

#### Chat with Assistant

```http
POST /api/ai-assistant
Content-Type: application/json

{
  "message": "I'm looking for solar panels for my van"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "response": "Great! To help you find the perfect solar panel..."
  }
}
```

---

### PayPal

#### Create Order

```http
POST /api/paypal/create-order
Content-Type: application/json

{
  "orderId": "BC123456789",
  "amount": 299.99,
  "currency": "USD"
}
```

#### Capture Order

```http
POST /api/paypal/capture-order
Content-Type: application/json

{
  "paypalOrderId": "paypal-order-id"
}
```

#### Webhook

```http
POST /api/paypal/webhook
Content-Type: application/json

{
  "event_type": "PAYMENT.CAPTURE.COMPLETED",
  "resource": {...}
}
```

---

### Health

#### Check API Status

```http
GET /api/health
```

Response:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2024-01-01T00:00:00Z",
    "environment": "production"
  }
}
```

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Rate Limiting

- 100 requests per 15 minutes per IP
- Rate limit info in response headers

## CORS

CORS is enabled for frontend origin(s).
