from django.urls import path
from .views import get_catogories,get_products,get_details,get_cart,add_to_cart,remove_from_cart

urlpatterns=[
  path('products/',get_products),
  path('catogories/',get_catogories),
  path('productDetails/<int:pk>/',get_details),
  path('cart/',get_cart),
  path('cart/add/',add_to_cart),
  path('cart/remove/',remove_from_cart),
]