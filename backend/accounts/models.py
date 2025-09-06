from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom User model where email is the primary identifier for authentication.
    """
    # The 'password' field is already handled by AbstractUser, so we don't need to define it here.
    # Defining it would override Django's built-in password hashing mechanism.

    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
        help_text='Required. Enter a valid email address.'
    )
    # Username is still useful for display purposes or unique profile URLs.
    username = models.CharField(
        max_length=150,
        unique=True,
        help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'
    )
    # Adding optional fields for the user profile.
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    
    userpic = models.ImageField(max_length=500,null=True,blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Set the email field as the unique identifier for logging in.
    USERNAME_FIELD = 'email'
    # 'username' is still required when creating a user, e.g., via createsuperuser command.
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
