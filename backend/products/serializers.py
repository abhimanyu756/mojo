from rest_framework import serializers
from .models import Product, Category, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'is_primary']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    seller_name = serializers.CharField(source='seller.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'price', 'quantity', 'category', 'category_name',
            'condition', 'brand', 'model', 'year_of_manufacture', 'material', 'color',
            'length', 'width', 'height', 'weight', 'original_packaging', 'manual_included',
            'working_condition_description', 'seller', 'seller_name', 'is_available', 
            'images', 'uploaded_images', 'created_at', 'updated_at'
        ]
        read_only_fields = ['seller', 'created_at', 'updated_at']

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        validated_data['seller'] = self.context['request'].user
        
        product = super().create(validated_data)
        
        # Handle image uploads
        for i, image in enumerate(uploaded_images):
            ProductImage.objects.create(
                product=product,
                image=image,
                is_primary=(i == 0)  # First image is primary
            )
        
        return product

class ProductListSerializer(serializers.ModelSerializer):
    seller_name = serializers.CharField(source='seller.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'price', 'category_name', 'condition',
            'seller_name', 'is_available', 'primary_image', 'created_at'
        ]

    def get_primary_image(self, obj):
        primary_image = obj.images.filter(is_primary=True).first()
        if primary_image and primary_image.image:
            return self.context['request'].build_absolute_uri(primary_image.image.url)
        return None