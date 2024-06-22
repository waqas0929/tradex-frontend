# B2B Portal

## Overview

B2B Portal is a web application designed to facilitate business-to-business transactions. It includes features for user authentication, product management, order processing, and a user-friendly shopping cart system.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Sign Up, Sign In, Logout)
- User Profile Management
- Product Management (Add, Update, Delete Products)
- Shopping Cart
- Order Management
- Search Functionality
- Responsive Design

## Technologies Used

### Frontend

- React
- Redux (For state management)
- React Router (For navigation)
- Axios (For API requests)
- Formik (For form handling)
- CSS (For styling)

### Backend

- Node.js
- Express.js
- PostgreSQL (Database)
- Sequelize (ORM for PostgreSQL)
- JWT (For authentication)
- Redis (For caching)

## Installation

### Prerequisites

- Node.js
- PostgreSQL
- Redis

### Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/b2b-portal.git
    cd b2b-portal
    ```

2. **Backend Setup:**
    - Navigate to the backend directory:
        ```sh
        cd b2b-be
        ```
    - Install dependencies:
        ```sh
        npm install
        ```
    - Create a `.env` file and configure your environment variables:
        ```plaintext
        DB_NAME=your_db_name
        DB_USERNAME=your_db_username
        DB_PASSWORD=your_db_password
        DB_HOST=your_db_host
        JWT_SECRET_KEY=your_jwt_secret
        REDIS_URL=your_redis_url
        PORT=3000
        ```
    - Run migrations and seed the database:
        ```sh
        npx sequelize-cli db:migrate
        npx sequelize-cli db:seed:all
        ```
    - Start the backend server:
        ```sh
        npm start
        ```

3. **Frontend Setup:**
    - Navigate to the frontend directory:
        ```sh
        cd ../b2b-fe/b2b-portal
        ```
    - Install dependencies:
        ```sh
        npm install
        ```
    - Start the frontend development server:
        ```sh
        npm start
        ```

## Usage

- Access the frontend application at `http://localhost:3001`
- The backend API is available at `http://localhost:3000/api`

### User Authentication

- Sign Up: `/signup`
- Sign In: `/login`

### Product Management

- Add Product: `/add-product`
- View Products: `/products`
- Update Product: `/products/:productId/edit`
- Delete Product: `/products/:productId/delete`

### Shopping Cart

- View Cart: `/cart`
- Add to Cart: `/products/:productId/add-to-cart`
- Remove from Cart: `/cart/:productId/remove`
- Checkout: `/checkout`

### Orders

- View Orders: `/orders`
- Place Order: `/place-order`

## API Endpoints

### Auth

- `POST /api/signup` - User registration
- `POST /api/login` - User login

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Add new product
- `PUT /api/products/:productId` - Update product
- `DELETE /api/products/:productId` - Delete product

### Cart

- `GET /api/cart/:userId` - Get user cart
- `POST /api/cart` - Add to cart
- `DELETE /api/cart/:userId/:productId` - Remove from cart

### Orders

- `GET /api/orders/:userId` - Get user orders
- `POST /api/orders` - Place an order

## Project Structure

 **Clone the repository:**
  
    git clone https://github.com/waqas0929/tradex-frontend.git
    ```