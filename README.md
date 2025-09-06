# EcoFinds - Sustainable Marketplace

A Django + React application for buying and selling eco-friendly products.

## Project Structure

```
mojo/
├── backend/          # Django REST API
├── frontend/         # React application
└── README.md
```

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

## Features

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

## Team Mojo

Odoo X NMIT Hackathon Project
