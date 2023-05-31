from django.contrib import admin

#Register your models here.
from django.contrib.auth.admin import UserAdmin
from .models import  UserComment, PropertyComment
from property.models import Property
#admin.site.register(CustomUser, UserAdmin)
admin.site.register(UserComment)
admin.site.register(PropertyComment)