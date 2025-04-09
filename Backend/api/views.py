from rest_framework.response import Response
import time
from rest_framework.decorators import api_view
from .models import Category,Products
from .serializers import CategorySerializer, UserSerializer,ProductSerializer,SingleCategorySerializer,AdminProductSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from fuzzywuzzy import fuzz
from rest_framework import viewsets
from django.db.models import Case, When
from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff


class CreateUserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserListView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return self.request.user
    
class DisplayProductDetails(generics.ListAPIView):
    queryset = Category.objects.prefetch_related("products") 
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
   
class SearchProductsView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        query = self.request.GET.get("query", "").strip()

        if not query:
            return Products.objects.all()  # Return all products if no query is provided

        # Fetch all products
        products = Products.objects.all()

        # Adjust typo sensitivity using a threshold
        THRESHOLD = 60  # Change this value (higher = more strict, lower = more lenient)

        # Rank products based on similarity, filtering weak matches
        ranked_products = sorted(
            [p for p in products if fuzz.ratio(query.lower(), p.name.lower()) >= THRESHOLD],
            key=lambda p: fuzz.ratio(query.lower(), p.name.lower()),
            reverse=True
        )

        # Get the top 5 most relevant matches
        top_matches = ranked_products[:10]

        # Get other products in their categories
        category_ids = {p.category_id for p in top_matches}  # Get unique category IDs
        related_products = Products.objects.filter(category_id__in=category_ids)

        # Merge results: First show top matches, then category products
        final_products = list(top_matches) 
        
        return final_products

    def list(self, request, *args, **kwargs):
        """Override list to return a response instead of an empty queryset"""
        queryset = self.get_queryset()
        if not queryset:
            return Response({"message": "No products found"}, status=200)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class CartProductsView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        product_ids = self.request.query_params.getlist('ids[]')  # Get multiple IDs
        if product_ids:
            preserved_order = Case(*[When(product_id=pid, then=index) for index, pid in enumerate(product_ids)])
            return Products.objects.filter(product_id__in=product_ids).order_by(preserved_order)
        return Products.objects.none()


class AdminProductView(viewsets.ModelViewSet):
    queryset = Products.objects.all().order_by('product_id')
    serializer_class = AdminProductSerializer
    permission_classes = [AllowAny]

class AdminCategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('category_id')
    serializer_class = SingleCategorySerializer
    permission_classes = [AllowAny]


from rest_framework import generics
from .models import Transaction
from .serializers import TransactionSerializer

class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class TransactionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

