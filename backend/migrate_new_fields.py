#!/usr/bin/env python3
"""
Migration script for new Product model fields
Run this after updating the Product model
"""

import os
import sys
import django
from django.core.management import execute_from_command_line

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecofinds.settings')
    django.setup()
    
    print("🔄 Creating migrations for new Product fields...")
    execute_from_command_line(['manage.py', 'makemigrations', 'products'])
    
    print("🔄 Applying migrations...")
    execute_from_command_line(['manage.py', 'migrate'])
    
    print("✅ Migrations completed successfully!")