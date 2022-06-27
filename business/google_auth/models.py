from django.db import models

# Create your models here.

class GoogleData(models.Model):
    user=models.CharField(max_length=400)
    email=models.CharField(max_length=50)
    name=models.CharField(max_length=100)