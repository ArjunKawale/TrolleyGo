# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import User  


class Category(models.Model):
    category_id=models.AutoField(primary_key=True)
    category=models.CharField(db_column='Category', max_length=100)

    def __str__(self):
        return self.category


class Products(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.CharField(db_column='Name', max_length=255)  # Field name made lowercase.
    buying_price = models.DecimalField(db_column='Buying Price', max_digits=10, decimal_places=2)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    selling_price = models.DecimalField(db_column='Selling Price', max_digits=10, decimal_places=2)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    profit = models.DecimalField(db_column='Profit', max_digits=10, decimal_places=2)  # Field name made lowercase.
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE, db_column='category_id',related_name="products")
    image = models.ImageField(upload_to='product_images/', null=True, blank=True) 
    
    def __str__(self):
        return self.name
    class Meta:
        
        db_table = 'products'



class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    quantity = models.IntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateField()
    transaction_time = models.TimeField()
    product = models.ForeignKey('Products', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'transaction'
        
    def __str__(self):
        return f"Transaction {self.transaction_id} - {self.user.username} - {self.product.name}"