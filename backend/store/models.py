from django.db import models
from django.contrib.auth.models import User

class Catogory(models.Model):
  name=models.CharField(max_length=340,unique=True)
  slug=models.SlugField(unique=True)
#   A SlugField stores text meant for use in URLs.
# A slug is typically a lowercase, hyphen-separated version of a title, 

  def __str__(self):
    return self.name

class Product (models.Model):
  catogory=models.ForeignKey(Catogory,related_name='products',on_delete=models.CASCADE)
  # Links each product to a category, allows category.products, and deletes products if the category is deleted.

  image=models.ImageField(upload_to='products/',blank=True,null=True)
  # blank=True refers field is not required(*)

  descriptions=models.TextField(blank=True)
  name=models.CharField(max_length=244)
  price=models.DecimalField(max_digits=10,decimal_places=2)
  created_at=models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name
  
class UserProfile(models.Model):
  user=models.OneToOneField(User,on_delete=models.CASCADE)
# Django's built-in User model stores username, email, password, names, and login info.
  
  phone=models.CharField(max_length=13,blank=True)
  address=models.TextField(blank=True)

  def __str__(self):
    return self.user.username

class Order(models.Model):
  user=models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
  #ForeignKey means one user can have many objects, and each object belongs to one user
  #by default user=user_id django makes it

  created_at=models.DateTimeField(auto_now_add=True)
  total_amount=models.DecimalField(max_digits=10,decimal_places=2)
  
  # id = models.IntegerField(...) no need django will add it for you 

  def __str__(self):
    return f"Orders {self.id}"
  
class OrderItem(models.Model):
  order=models.ForeignKey(Order,related_name='items',on_delete=models.CASCADE)
  product=models.ForeignKey(Product,on_delete=models.CASCADE)
  quantity=models.PositiveIntegerField(default=1)
  price=models.DecimalField(max_digits=10,decimal_places=2)

  def __str__(self):
    return f"{self.quantity}--x-- {self.product.name}"
  

class   Cart(models.Model):
  user=models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
  created_at=models.DateTimeField(auto_now_add=True)

  def __str__(self):
      return f"Cart {self.id} for {self.user}"
    
  @property
  def total(self): 
    return sum(item.subtotal for item in self.items.all())
  

class CartItem(models.Model):
  cart=models.ForeignKey(Cart,related_name="items",on_delete=models.CASCADE)
  product=models.ForeignKey(Product,on_delete=models.CASCADE)
  quantity=models.PositiveIntegerField(default=1)

  def __str__(self):
    return f"{self.quantity} X{self.product.name}"
  
  @property
  def subtotal(self):
    return self.quantity * self.product.price
  