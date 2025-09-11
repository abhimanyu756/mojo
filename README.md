# EcoFinds - Sustainable Marketplace

A Django + React application for buying and selling eco-friendly products.

## Team Details

**Team Name:** Mojo

**Team Members:**
- Abhimanyu Kumar - 2023
- Chetan Tiwari - 2024
- Atul Kumar Pandey - 2024

**Project Demo Video:** [https://www.youtube.com/watch?v=znq0CdZYRqw&t=16s](https://www.youtube.com/watch?v=znq0CdZYRqw&t=16s)

**Event:** Odoo X NMIT Hackathon Project

## Project Overview

### Overall Vision
The overarching vision for EcoFinds is to create a vibrant and trusted platform that revolutionizes the way people buy and sell pre-owned goods. It aims to foster a culture of sustainability by extending the lifecycle of products, reducing waste, and providing an accessible and convenient alternative to purchasing new items. EcoFinds envisions becoming the go-to destination for a conscious community seeking unique finds and responsible consumption.

### Mission
The mission for the hackathon team is to develop a user-friendly and engaging desktop and mobile application that serves as a central hub for buying and selling second-hand items. EcoFinds should leverage intuitive design and essential features to connect buyers and sellers efficiently, promoting a circular economy and making sustainable choices easier for everyone. This involves building a platform that is both functional and inspires trust and community.

## Problem Statement

**Challenge:** "EcoFinds – Empowering Sustainable Consumption through a Second-Hand Marketplace"

Develop a foundational version of EcoFinds, focusing on core user authentication and product listing functionalities. Teams must deliver a functional prototype, accessible via both mobile and desktop interfaces, that allows users to register and log in, create and manage basic product listings (including title, description, category, price, and at least one image placeholder), and browse these listings with basic filtering and search capabilities. The system must employ efficient data structures for managing user and product data, ensuring a stable and responsive user experience.

## Project Structure

```
mojo/
├── backend/          # Django REST API
├── frontend/         # React application
└── README.md
```

## Features & Requirements

### Core Functionality

#### User Authentication
- Simple and secure mechanism for user registration and login (email and password)
- Profile Creation (Basic): Ability for users to set a username
- User Dashboard: Should be able to edit all the fields

#### Product Management
- **Product Listing Creation:** Functionality for users to create new product listings, including:
  - Title
  - Brief description
  - Selection of predefined category
  - Price
  - Placeholder for at least one image
- **Product Listing Management (CRUD - Basic):** Ability for users to view, edit, and delete their own product listings

#### Product Discovery
- **Product Browsing:** A view displaying a list of available product listings with basic information (title, price, and placeholder image)
- **Category Filtering:** Ability to filter product listings by predefined categories
- **Keyword Search:** Basic search functionality allowing users to search listings based on keywords in the title
- **Product Detail View:** A screen/page displaying the full details of a selected product, including title, description, price, category, and the image placeholder

#### Shopping Features
- **Cart:** A screen displaying all the products that are added to the cart
- **Previous Purchase View:** A screen/page displaying the products that were purchased before

## Wireframes

### Login/Sign Up Screen
- **Elements:** App logo, email input, password input, login button, sign-up link/button

### Product Listing Feed Screen
- **Elements:** Header with app title/logo, search bar, category filter options (e.g., as tappable buttons or a dropdown), list of product items (each showing a placeholder image, title, and price), a "+" button to add a new product listing (prominent)

### Add New Product Screen
- **Elements:** Back button, screen title ("Add New Product"), input fields for "Product Title," "Category" (dropdown), "Description" (text area), "Price" (number input), a button labeled "+ Add Image (Placeholder)," and a "Submit Listing" button

### My Listings Screen
- **Elements:** Header with app title/logo, a "+" button to add a new product, a list of the user's listed products (each showing a placeholder image, title, price, and "Edit" and "Delete" buttons)

### Product Detail Screen
- **Elements:** Back button, product image placeholder (larger), product title, price, category, description

### User Dashboard
- **Elements:** Header with app title/logo, image of the user, display all the fields related to the user and also provide the user the ability to edit them

### Cart
- **Elements:** Header with app title/logo, the page should include all the products that are added in the cart. The product should be displayed in the form of cards containing basic information about the product

### Previous Purchase
- **Elements:** This page should contain the list view of the products that were purchased in the past by the current user

**Mockup:** [https://app.excalidraw.com/l/65VNwvy7c4X/FL5ME7rGhsupdate](https://app.excalidraw.com/l/65VNwvy7c4X/FL5ME7rGhsupdate)

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- MySQL Server 5.7+

### Backend Setup (Django)

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up MySQL database**
```bash
# Copy environment file
cp .env.example .env
# Edit .env with your MySQL credentials
# Then run the setup script
python setup_mysql.py
```

5. **Start development server**
```bash
python manage.py runserver
```

### Frontend Setup (React)

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

## Database Configuration

This project uses **MySQL** as the database. For detailed setup instructions, see [MYSQL_SETUP.md](backend/MYSQL_SETUP.md).

### Quick MySQL Setup:
1. Install MySQL Server
2. Create database: `CREATE DATABASE ecofinds;`
3. Update `.env` file with your credentials
4. Run: `python setup_mysql.py`

## Technical Features

- User authentication (JWT)
- Product listing and management
- Shopping cart functionality
- Responsive design with Tailwind CSS
- Image upload and preview
- Category-based product filtering

## API Endpoints

- `/api/auth/` - Authentication endpoints
- `/api/products/` - Product management
- `/api/cart/` - Shopping cart operations

## Development

### Backend (Django)
- REST API with Django REST Framework
- JWT authentication
- MySQL database
- Custom user model

### Frontend (React)
- Modern React with hooks
- Tailwind CSS for styling
- Responsive design
- Image upload with preview

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**EcoFinds - Empowering Sustainable Consumption** 🌱
