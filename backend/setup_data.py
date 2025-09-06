#!/usr/bin/env python
"""
Sample data setup script for EcoFinds
Run this after migrations to populate the database with sample categories and products
"""

import os
import sys
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecofinds.settings')
django.setup()

from django.contrib.auth import get_user_model
from products.models import Category, Product

User = get_user_model()

def create_sample_data():
    print("Creating sample data...")
    
    # Create sample categories
    categories_data = [
        {'name': 'Electronics', 'description': 'Phones, laptops, gadgets'},
        {'name': 'Clothing', 'description': 'Fashion and apparel'},
        {'name': 'Books', 'description': 'Books and educational materials'},
        {'name': 'Home & Garden', 'description': 'Furniture and home decor'},
        {'name': 'Sports & Outdoors', 'description': 'Sports equipment and outdoor gear'},
        {'name': 'Toys & Games', 'description': 'Children toys and board games'},
    ]
    
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            name=cat_data['name'],
            defaults={'description': cat_data['description']}
        )
        if created:
            print(f"Created category: {category.name}")
    
    # Create a sample user if none exists
    if not User.objects.filter(email='demo@ecofinds.com').exists():
        demo_user = User.objects.create_user(
            email='demo@ecofinds.com',
            username='demo_user',
            password='demo123',
            first_name='Demo',
            last_name='User'
        )
        print(f"Created demo user: {demo_user.email}")
        
        # Create sample products
        electronics = Category.objects.get(name='Electronics')
        clothing = Category.objects.get(name='Clothing')
        books = Category.objects.get(name='Books')
        
        sample_products = [
            {
                'title': 'iPhone 12 - Excellent Condition',
                'description': 'Barely used iPhone 12 with original box and charger. No scratches or damage.',
                'price': 450.00,
                'category': electronics,
                'condition': 'excellent',
                'seller': demo_user
            },
            {
                'title': 'Vintage Leather Jacket',
                'description': 'Classic brown leather jacket, size M. Perfect for fall weather.',
                'price': 75.00,
                'category': clothing,
                'condition': 'good',
                'seller': demo_user
            },
            {
                'title': 'Programming Books Collection',
                'description': 'Set of 5 programming books including Python, JavaScript, and React guides.',
                'price': 35.00,
                'category': books,
                'condition': 'good',
                'seller': demo_user
            }
        ]
        
        for product_data in sample_products:
            product = Product.objects.create(**product_data)
            print(f"Created product: {product.title}")
    
    print("Sample data setup complete!")

if __name__ == '__main__':
    create_sample_data()