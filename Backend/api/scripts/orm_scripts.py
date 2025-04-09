from api.models import Products
from django.db import connection
def run():
    products=Products.objects.first()