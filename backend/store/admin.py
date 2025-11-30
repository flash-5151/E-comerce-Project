from django.contrib import admin
from .models import Catogory,Order,Product,OrderItem,UserProfile

admin.site.register(Catogory)
admin.site.register(Order)
admin.site.register(Product)
admin.site.register(OrderItem)
admin.site.register(UserProfile)
