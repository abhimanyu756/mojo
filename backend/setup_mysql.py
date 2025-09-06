#!/usr/bin/env python3
"""
MySQL Database Setup Script for EcoFinds
This script helps set up the MySQL database for the EcoFinds project.
"""

import mysql.connector
from mysql.connector import Error
import os
from decouple import config

def create_database():
    """Create the MySQL database if it doesn't exist."""
    try:
        # Database connection parameters
        db_host = config('DB_HOST', default='localhost')
        db_port = config('DB_PORT', default='3306')
        db_user = config('DB_USER', default='root')
        db_password = config('DB_PASSWORD', default='')
        db_name = config('DB_NAME', default='ecofinds')
        
        # Connect to MySQL server (without specifying database)
        connection = mysql.connector.connect(
            host=db_host,
            port=db_port,
            user=db_user,
            password=db_password
        )
        
        if connection.is_connected():
            cursor = connection.cursor()
            
            # Create database if it doesn't exist
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
            print(f"✅ Database '{db_name}' created successfully (or already exists)")
            
            # Grant privileges (optional, for development)
            cursor.execute(f"GRANT ALL PRIVILEGES ON {db_name}.* TO '{db_user}'@'localhost'")
            cursor.execute("FLUSH PRIVILEGES")
            print(f"✅ Privileges granted to user '{db_user}'")
            
    except Error as e:
        print(f"❌ Error while connecting to MySQL: {e}")
        return False
    
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("✅ MySQL connection closed")
    
    return True

def run_migrations():
    """Run Django migrations."""
    print("\n🔄 Running Django migrations...")
    os.system("python manage.py makemigrations")
    os.system("python manage.py migrate")
    print("✅ Migrations completed")

def create_superuser():
    """Prompt to create a superuser."""
    print("\n👤 Create a superuser account:")
    os.system("python manage.py createsuperuser")

def create_sample_categories():
    """Create sample categories for testing."""
    print("\n📦 Creating sample categories...")
    try:
        import django
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecofinds.settings')
        django.setup()
        
        from products.models import Category
        
        sample_categories = [
            {'name': 'Electronics', 'description': 'Electronic devices and gadgets'},
            {'name': 'Furniture', 'description': 'Home and office furniture'},
            {'name': 'Clothing', 'description': 'Clothing and accessories'},
            {'name': 'Books', 'description': 'Books and educational materials'},
            {'name': 'Sports & Outdoors', 'description': 'Sports equipment and outdoor gear'},
            {'name': 'Home & Garden', 'description': 'Home improvement and gardening items'},
            {'name': 'Toys & Games', 'description': 'Toys, games, and entertainment'},
            {'name': 'Automotive', 'description': 'Car parts and automotive accessories'},
        ]
        
        for cat_data in sample_categories:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description']}
            )
            if created:
                print(f"✅ Created category: {category.name}")
            else:
                print(f"📦 Category already exists: {category.name}")
                
    except Exception as e:
        print(f"❌ Error creating categories: {e}")

if __name__ == "__main__":
    print("🚀 Setting up MySQL database for EcoFinds...")
    print("=" * 50)
    
    # Step 1: Create database
    if create_database():
        # Step 2: Run migrations
        run_migrations()
        
        # Step 3: Create sample categories
        create_sample_categories()
        
        # Step 4: Ask if user wants to create superuser
        create_super = input("\n❓ Do you want to create a superuser account? (y/n): ").lower()
        if create_super in ['y', 'yes']:
            create_superuser()
        
        print("\n🎉 MySQL setup completed successfully!")
        print("\n📝 Next steps:")
        print("1. Make sure MySQL server is running")
        print("2. Update your .env file with correct database credentials")
        print("3. Run: python manage.py runserver")
    else:
        print("\n❌ Database setup failed. Please check your MySQL configuration.")