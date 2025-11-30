from rest_framework import serializers
from .models import Catogory,Product

class CatogorySerializer(serializers.ModelSerializer):
  class Meta:
    model=Catogory
    fields='__all__'
class ProductSerializer(serializers.ModelSerializer):
  catogory=CatogorySerializer(read_only=True)
  class Meta:
    model=Product
    fields='__all__'