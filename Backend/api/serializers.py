from rest_framework import serializers
from .models import Products,Category
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    class Meta:
        model=User
        fields=["id","username","password","role"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
     print(validated_data)
     user = User.objects.create_user(**validated_data)
     return user
    
    def get_role(self, obj):
     return obj.is_staff;         

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model= Products
        fields=["name",
            "product_id","selling_price","image"]      
        
    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image:
            return request.build_absolute_uri(obj.image.url)  # Convert relative path to full URL
        return None
      
class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)    

    class Meta:
        model = Category
        fields = ["category", "category_id", "products"]




class SingleCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

    def validate(self, data):
        """Ensure category name and category ID are unique."""
        category_id = self.instance.category_id if self.instance else None  # Get existing ID if updating
        name = data.get("category")  # Fix: Use the correct field name

        # Check for duplicate category name (excluding self if updating)
        if Category.objects.filter(category=name).exclude(category_id=category_id).exists():
            raise serializers.ValidationError({"category": "A category with this name already exists."})

        return data


class AdminProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category_id.category', read_only=True)  # Fetch category name

    class Meta:
        model = Products
        fields = ['product_id', 'name', 'buying_price', 'selling_price', 'profit', 'category_id', 'category_name', 'image']


    def validate_category_id(self, value):
        """Ensure the category exists before creating a product."""
        if not Category.objects.filter(category_id=value.category_id).exists():
            raise serializers.ValidationError("The selected category does not exist.")
        return value

    def validate(self, data):
        """Ensure product name is unique."""
        product_id = self.instance.product_id if self.instance else None  # If updating, get existing product ID
        name = data.get("name")

        # Check for duplicate product name (excluding self if updating)
        if Products.objects.filter(name=name).exclude(product_id=product_id).exists():
            raise serializers.ValidationError({"name": "A product with this name already exists."})

        return data

from rest_framework import serializers
from .models import Transaction, Products
from django.contrib.auth.models import User

from rest_framework import serializers
from .models import Transaction, Products
from django.contrib.auth.models import User

class TransactionSerializer(serializers.ModelSerializer):
    user = serializers.CharField(write_only=True)  # Accepting either 'user_id' or 'username'
    product = serializers.PrimaryKeyRelatedField(queryset=Products.objects.all())  # Accepting product ID
    username = serializers.SerializerMethodField()  # Add this field to include username in the response
    product_name = serializers.SerializerMethodField()  # Add this field to include product name in the response

    class Meta:
        model = Transaction
        fields = ['transaction_id', 'quantity', 'total_price', 'transaction_date', 'transaction_time', 'product', 'user', 'username', 'product_name']

    def create(self, validated_data):
        # Extract user and product from validated data
        user_data = validated_data.pop('user')

        # Check if user is passed as a username or user_id
        if isinstance(user_data, str):  # If user is passed as a username (string)
            try:
                user = User.objects.get(username=user_data)  # Try fetching User by username
            except User.DoesNotExist:
                raise serializers.ValidationError(f"User with username '{user_data}' does not exist.")
        else:  # If user is passed as user_id (integer)
            try:
                user = User.objects.get(id=user_data)  # Try fetching User by ID
            except User.DoesNotExist:
                raise serializers.ValidationError(f"User with ID '{user_data}' does not exist.")
        
        product = validated_data.pop('product')

        # Create and return the new Transaction object
        return Transaction.objects.create(user=user, product=product, **validated_data)

    def get_username(self, obj):
        # Return the username for the associated user
        return obj.user.username  # 'obj.user' is the User instance linked to this transaction
    
    def get_product_name(self, obj):
        # Return the name of the associated product
        return obj.product.name  # 'obj.product' is the Product instance linked to this transaction
