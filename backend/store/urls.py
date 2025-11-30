from django.urls import path
from .views import get_catogories,get_products,get_details

urlpatterns=[
  path('products/',get_products),
  path('catogories/',get_catogories),
  path('productDetails/<int:pk>/',get_details)
]