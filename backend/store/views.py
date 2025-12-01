from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product,Catogory,CartItem,Cart
from .serializers import ProductSerializer,CatogorySerializer,CartItemSerializer,CartSerializer
from rest_framework import status

@api_view(['GET'])
def get_products(request):
  products=Product.objects.all()
  serializer=ProductSerializer(products,many=True)
  return Response(serializer.data)

@api_view(['GET'])
def get_catogories(request):
  catogories=Catogory.objects.all()
  serializer=CatogorySerializer(catogories,many=True)
  return Response(serializer.data)


@api_view(['GET'])
def get_details(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['GET'])
def get_cart(request):
  cart,created=Cart.objects.get_or_create(user=None)
  serializer=CartSerializer(cart)
  return Response(serializer.data)

@api_view(['POST'])
def add_to_cart(request):
  product_id=request.data.get('product_id')

  # get product from database, NOT from request.data
  product = get_object_or_404(Product, id=product_id)

  cart,created=Cart.objects.get_or_create(user=None)
  item,created=CartItem.objects.get_or_create(cart=cart,product=product)
  if not created:
    item.quantity+=1
    item.save()
  return Response({'message':'product added to cart',"cart":CartSerializer(cart).data})
  


@api_view(['POST'])
def remove_from_cart(request):
  item_id=request.data.get('item_id')
  CartItem.objects.filter(id=item_id).delete()
  return Response({'message':'product removed from cart'})
