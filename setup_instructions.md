# EcoFinds Setup Instructions

## Prerequisites

- Python 3.8+
- Node.js 14+
- MySQL 8.0+
- Git

## Backend Setup (Django)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Create MySQL database:**
   ```sql
   CREATE DATABASE ecofinds;
   ```

6. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update database credentials in `.env`

7. **Update Django settings:**
   - Edit `ecofinds/settings.py`
   - Set `AUTH_USER_MODEL = 'accounts.User'`

8. **Run migrations:**
   ```bash
   python manage.py makemigrations accounts
   python manage.py makemigrations products
   python manage.py makemigrations cart
   python manage.py migrate
   ```

9. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

10. **Load sample data:**
    ```bash
    python setup_data.py
    ```

11. **Start development server:**
    ```bash
    python manage.py runserver
    ```

## Frontend Setup (React)

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

## Testing the Application

1. **Backend API:** http://localhost:8000
2. **Frontend App:** http://localhost:3000
3. **Admin Panel:** http://localhost:8000/admin

## Sample Login Credentials

- **Email:** demo@ecofinds.com
- **Password:** demo123

## Key Features Implemented

✅ User authentication (register/login)
✅ User profile management
✅ Product listing creation (CRUD)
✅ Product browsing with search and filtering
✅ Shopping cart functionality
✅ Order history tracking
✅ Responsive design
✅ Category filtering
✅ Product detail views

## API Endpoints

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `GET /api/auth/profile/` - Get user profile
- `PATCH /api/auth/profile/` - Update user profile
- `GET /api/products/` - List products
- `POST /api/products/create/` - Create product
- `GET /api/products/categories/` - List categories
- `GET /api/products/my-products/` - User's products
- `GET /api/cart/` - Get cart items
- `POST /api/cart/add/` - Add to cart
- `POST /api/cart/checkout/` - Checkout
- `GET /api/cart/orders/` - Order history

## Next Steps for Production

1. Implement image upload functionality
2. Add email notifications
3. Implement payment processing
4. Add product reviews and ratings
5. Implement real-time messaging between buyers/sellers
6. Add advanced search filters
7. Implement user verification system
8. Add analytics and reporting