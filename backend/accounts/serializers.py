from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator
from django.db.models import Q
from .models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    Handles validation for email, username, and password confirmation.
    """
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="A user with that email already exists.")]
    )
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="A user with that username already exists.")]
    )
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password_confirm', 'first_name', 'last_name')

    def validate(self, attrs):
        """
        Check that the two password entries match.
        """
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        """
        Create and return a new user instance, given the validated data.
        """
        # Remove the confirmation password, as it's not part of the User model.
        validated_data.pop('password_confirm')
        # Use create_user to handle password hashing.
        user = User.objects.create_user(**validated_data)
        return user

class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for user login. Validates user credentials using email or username.
    """
    login = serializers.CharField(
        label="Email or Username"
    )
    password = serializers.CharField(
        label="Password",
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """
        Validate the user's credentials for login with email or username.
        """
        login = attrs.get('login')
        password = attrs.get('password')
        user = None

        if login and password:
            # Allow case-insensitive login for both email and username
            try:
                user_obj = User.objects.get(Q(email__iexact=login) | Q(username__iexact=login))
                # check_password handles the hashing and comparison
                if user_obj.check_password(password):
                    user = user_obj
            except User.DoesNotExist:
                # Run the same validation error for not found user
                pass

            # If user is not found or password does not match
            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
            
            # Check if the user account is active
            if not user.is_active:
                msg = 'User account is disabled.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "login" (email or username) and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model, used for displaying and updating profile data.
    """
    class Meta:
        model = User
        # Include the new 'phone' and 'address' fields.
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'phone', 'address')
        # Make email and username read-only on profile updates to prevent changes.
        read_only_fields = ('id', 'email', 'username')

