from django.urls import path
from .views import get_catogories,get_products,get_details,get_cart,add_to_cart,remove_from_cart,update_cart_quantity,create_orders,register_view,create_admin
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns=[
  path('register/',register_view),
  path('token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
  path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
  path('products/',get_products),
  path('catogories/',get_catogories),
  path('productDetails/<int:pk>/',get_details),
  path('cart/',get_cart),
  path('cart/add/',add_to_cart),
  path('cart/remove/',remove_from_cart),
  path('cart/update/',update_cart_quantity),
  path('orders/create/',create_orders),
  path("create-admin/", create_admin),

]