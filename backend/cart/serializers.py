from rest_framework import serializers
from .models import CartItem, Order, OrderItem
from products.serializers import ProductListSerializer

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'total_price', 'added_at']

class AddToCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['product', 'quantity']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        cart_item, created = CartItem.objects.get_or_create(
            user=validated_data['user'],
            product=validated_data['product'],
            defaults={'quantity': validated_data['quantity']}
        )
        if not created:
            cart_item.quantity += validated_data['quantity']
            cart_item.save()
        return cart_item

class OrderItemSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source='product.title', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_title', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'total_amount', 'status', 'created_at', 'updated_at', 'items']