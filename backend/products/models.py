from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Product(models.Model):
    CONDITION_CHOICES = [
        ('new', 'New'),
        ('like-new', 'Like New'),
        ('good', 'Good'),
        ('fair', 'Fair'),
        ('poor', 'Poor'),
    ]

    # Basic Information
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES, default='good')
    
    # Product Details
    brand = models.CharField(max_length=100, blank=True)
    model = models.CharField(max_length=100, blank=True)
    year_of_manufacture = models.PositiveIntegerField(null=True, blank=True)
    material = models.CharField(max_length=100, blank=True)
    color = models.CharField(max_length=50, blank=True)
    
    # Dimensions & Weight
    length = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, help_text="Length in cm")
    width = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, help_text="Width in cm")
    height = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, help_text="Height in cm")
    weight = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, help_text="Weight in kg")
    
    # Additional Information
    original_packaging = models.BooleanField(default=False)
    manual_included = models.BooleanField(default=False)
    working_condition_description = models.TextField(blank=True)
    
    # System fields
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    alt_text = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.product.title} - Image"