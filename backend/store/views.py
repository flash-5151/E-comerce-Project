from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.contrib.auth.models import User
from .serializers import RegisterSerializer,UserSerializer
from .models import Product,Catogory,CartItem,Cart,Order,OrderItem
from .serializers import ProductSerializer,CatogorySerializer,CartItemSerializer,CartSerializer
from rest_framework import status
from django.contrib.auth.models import User
from django.http import HttpResponse


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
@permission_classes([IsAuthenticated])
def get_cart(request):
    try:
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
  product_id=request.data.get('product_id')
  print(product_id)
  # product=request.data.get(product_id)
  # get product from database, NOT from request.data
  product = get_object_or_404(Product, id=product_id)

  cart,created=Cart.objects.get_or_create(user=request.user)
  item,created=CartItem.objects.get_or_create(cart=cart,product=product)
  if not created:
    item.quantity+=1
    item.save()
  return Response({'message':'product added to cart'})
  
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart_quantity(request):
  item_id=request.data.get('item_id')
  quantity=request.data.get('quantity')

  if not item_id or quantity is  None:
    return Response({'error':'item id and quantity  are required'},status=400)
  try:
    item=CartItem.objects.get(id=item_id)
    if int(quantity)<1:
      item.delete()
      return Response({'error':'Quantity must be atleast 1'},status=400)
    item.quantity=quantity
    item.save()
    serializer=CartItemSerializer(item)
    return Response(serializer.data)
  except CartItem.DoesNotExist:
    return Response({'error':'cart item not found'},status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
  item_id=request.data.get('item_id')
  CartItem.objects.filter(id=item_id).delete()
  return Response({'message':'product removed from cart'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_orders(request):
  try:
    data=request.data
    print(data)
    name=data.get('name')
    address=data.get('address')
    phone=data.get('phone')
    payment_method=data.get('payment_method')
    # validate phone nuber
    if not phone.isdigit() or len(phone)<10:
      return Response({'error':'Invalid phone number'},status=400)
    print("test 1")
    # get user's cart
    cart,created=Cart.objects.get_or_create(user=request.user)
    if not cart.items.exists():
      return Response({'error':'cart is empty'},status=400)
    total=sum(float(item.product.price)* item.quantity for  item in cart.items.all())
    order=Order.objects.create(
      user=request.user,
      total_amount=total,
    )
    print("test 2")
    # create order items
    for item in cart.items.all():
      OrderItem.objects.create(
        order=order,
        product=item.product,
        quantity=item.quantity,
        price=item.product.price,
      )
    print("test 3")
    # clear the cart
    cart.items.all().delete()
    return Response({
      'message':'order created successfully',
      'order_id':order.id,
      })
  
  except Exception as e:
    return Response({'error':str(e)},status=500)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
  serializer=RegisterSerializer(data=request.data)
  print(serializer)
  if serializer.is_valid():
    user=serializer.save()
    return Response({'message':'User created successfully','user':UserSerializer(user).data},status=status.HTTP_201_CREATED)
  return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


def create_admin(request):
    if User.objects.filter(username="admin").exists():
        return HttpResponse("Admin already exists")

    User.objects.create_superuser(
        username="admin",
        email="admin@example.com",
        password="Admin@123"
    )

    return HttpResponse("Admin created successfully")
