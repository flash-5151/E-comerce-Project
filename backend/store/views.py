from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product,Catogory
from .serializers import ProductSerializer,CatogorySerializer
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