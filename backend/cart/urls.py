from django.urls import path
from . import views

urlpatterns = [
    path('', views.CartListView.as_view(), name='cart-list'),
    path('add/', views.AddToCartView.as_view(), name='add-to-cart'),
    path('remove/<int:item_id>/', views.remove_from_cart, name='remove-from-cart'),
    path('checkout/', views.checkout, name='checkout'),
    path('orders/', views.OrderHistoryView.as_view(), name='order-history'),
]