from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DisplayProductDetails, SearchProductsView, CartProductsView, AdminProductView,AdminCategoryView,TransactionListCreateView,TransactionRetrieveUpdateDestroyView

router = DefaultRouter()
router.register(r'adminview/categories',AdminCategoryView, basename='category')
router.register(r'adminview/products', AdminProductView, basename='product')

urlpatterns = [
    path('products/', DisplayProductDetails.as_view(), name='products_grouped'),
    path("search/", SearchProductsView.as_view(), name="search_products"),
    path('cart-products/', CartProductsView.as_view(), name='cart-products'),
    path('', include(router.urls)),  
     path('transactions/', TransactionListCreateView.as_view(), name='transaction-list-create'),  # To list and create transactions
    path('transactions/<int:pk>/', TransactionRetrieveUpdateDestroyView.as_view(), name='transaction-retrieve-update-destroy'),  # To retrieve, update or delete a transaction
]
