from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, SerializerMethodField
from .models import UserComment, PropertyComment
from property.models import Property
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError

class UserCommentSerializer(ModelSerializer):

    class Meta:
        model = UserComment
        fields = [
            'id',
            'hostName',
            'content',
            'dateMade',
            'isComment',
            'userId',
            'rating',
        ]
    def create(self, validated_data):
        return super().create(validated_data)

class PropertyCommentSerializer(ModelSerializer):

    class Meta:
        model = PropertyComment
        fields = [
            'id',
            'guestName',
            'content',
            'dateMade',
            'isComment',
            'propId',
            'rating',
        ]
    def create(self, validated_data):
        return super().create(validated_data)
