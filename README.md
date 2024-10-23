You're right! I forgot to include the **Vendor Module** in the initial README. Here's the updated **README** file with details on the **Vendor Module**.

---

# Dinamo

**Dinamo** is a backend service built using **NestJS** for user authentication, role-based access control, and basic e-commerce functionality such as product management, vendor management, and cart management. This project leverages JWT authentication for user sessions and includes features like user registration, login, and validation of requests using DTOs with `class-validator`.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Authentication and Guards](#authentication-and-guards)
- [Role-Based Access Control](#role-based-access-control)
- [Swagger API Documentation](#swagger-api-documentation)
- [Validation](#validation)
- [Contributing](#contributing)

## Features

- User registration and login with JWT-based authentication.
- Product management (CRUD operations).
- Vendor management (CRUD operations).
- Cart management with the ability to add/remove products to/from a user's cart.
- Role-based access control (Admin, Vendor, and User roles).
- DTO-based validation for incoming requests.
- Swagger API documentation.

## Technologies Used

- **NestJS**: Framework for building efficient, scalable Node.js server-side applications.
- **MongoDB**: NoSQL database for storing user, product, vendor, and cart data.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **Passport.js**: Middleware for authentication.
- **JWT (JSON Web Token)**: For secure user session management.
- **class-validator**: For DTO validation.
- **class-transformer**: Used for transforming and validating input data.
- **bcrypt**: For hashing and comparing passwords.

## Project Structure

```bash
dinamo/
│
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts   # Authentication Controller
│   │   ├── auth.module.ts       # Authentication Module
│   │   ├── auth.service.ts      # Authentication Service
│   │   ├── jwt.strategy.ts      # JWT Authentication Strategy
│   │   ├── local.strategy.ts    # Local Authentication Strategy
│   │   └── guards/              # Authentication Guards
│   ├── user/
│   │   ├── dto/                 # Data Transfer Objects (DTOs) for User
│   │   ├── user.controller.ts   # User Controller
│   │   ├── user.module.ts       # User Module
│   │   ├── user.service.ts      # User Service
│   │   └── user.schema.ts       # User Schema (Mongoose)
│   ├── product/
│   │   ├── dto/                 # Data Transfer Objects (DTOs) for Product
│   │   ├── product.controller.ts # Product Controller
│   │   ├── product.module.ts     # Product Module
│   │   └── product.service.ts    # Product Service
│   ├── vendor/
│   │   ├── dto/                 # Data Transfer Objects (DTOs) for Vendor
│   │   ├── vendor.controller.ts # Vendor Controller
│   │   ├── vendor.module.ts     # Vendor Module
│   │   └── vendor.service.ts    # Vendor Service
│   ├── cart/
│   │   ├── dto/                  # Data Transfer Objects (DTOs) for Cart
│   │   ├── cart.controller.ts    # Cart Controller
│   │   ├── cart.module.ts        # Cart Module
│   │   └── cart.service.ts       # Cart Service
│   └── main.ts                   # Entry point of the application
├── .env                          # Environment variables
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OmarAhmedOwais/dinamo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd dinamo
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables (see the [Environment Variables](#environment-variables) section).

5. Run the project:

   ```bash
   npm run start:dev
   ```

## Environment Variables

The project requires environment variables to be set in a `.env` file in the project root. Below are the required variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/dinamo-backend
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600s
```

## Usage

### User Registration

```http
POST /auth/register
```

Request Body:

```json
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "strongPassword123"
}
```

### User Login

```http
POST /auth/login
```

Request Body:

```json
{
  "username": "john_doe",
  "password": "strongPassword123"
}
```

Response:

```json
{
  "access_token": "your_jwt_token_here"
}
```

### Products

- Retrieve all products: `GET /products`
- Retrieve a product by ID: `GET /products/:id`
- Create a new product (Admin/Vendor): `POST /products`
- Update a product (Admin/Vendor): `PUT /products/:id`
- Delete a product (Admin): `DELETE /products/:id`

### Vendors

- Retrieve all vendors: `GET /vendors`
- Retrieve a vendor by ID: `GET /vendors/:id`
- Create a new vendor (Admin): `POST /vendors`
- Update a vendor by ID (Admin): `PUT /vendors/:id`
- Delete a vendor (Admin): `DELETE /vendors/:id`

### Carts

- Retrieve user’s cart: `GET /carts/my`
- Add product to cart: `POST /carts/my/add-product/:productId`
- Remove product from cart: `PUT /carts/my/remove-product/:productId`
- Clear cart: `PUT /carts/my/clear`
- Admin retrieves all carts: `GET /carts`

## Authentication and Guards

The application uses **JWT Authentication** for securing routes. You need to include the `Bearer` token in the `Authorization` header to access protected routes.

### Example:

```http
Authorization: Bearer <your_token>
```

The guards used:
- **`JwtAuthGuard`**: Secures routes by verifying JWT tokens.
- **`LocalAuthGuard`**: Used for authenticating users with `username` and `password` during login.

## Role-Based Access Control

The project has roles such as **Admin**, **Vendor**, and **User**.

- **Admin**: Can perform all operations (including managing vendors and products).
- **Vendor**: Can manage their own products.
- **User**: Can add products to their cart and view their cart.

You can extend the role-based access control by adding more roles and guards.

## Swagger API Documentation

The project uses **Swagger** for API documentation. You can access the Swagger UI by navigating to:

```http
http://localhost:3000/api
```

This will show all available endpoints, the required parameters, and sample responses.

## Validation

The application uses **DTOs (Data Transfer Objects)** and **class-validator** for validating incoming requests. Validation rules are defined using decorators like `@IsString()`, `@IsNotEmpty()`, `@IsEmail()`, etc.

For example, `LoginDto` ensures that a valid `username` and `password` are provided:

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'testuser' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}
```

