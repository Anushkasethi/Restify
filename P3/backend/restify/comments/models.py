from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

# class CustomUser(AbstractUser):
#     is_guest = models.BooleanField(default=True)
    
class UserComment(models.Model):
    hostName = models.CharField(max_length=100)
    content = models.TextField()
    dateMade = models.DateTimeField(auto_now = True) 
    isComment = models.BooleanField(default=True) #to distinguish reply and comment
    userId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commentedUser')
    rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        default=0,
    )



class PropertyComment(models.Model):
    guestName = models.CharField(max_length=100)
    content = models.TextField()
    dateMade = models.DateTimeField(auto_now = True) 
    isComment = models.BooleanField(default=True) #to distinguish reply and comment
    propId = models.IntegerField()
    rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        default=0,
    )
    
