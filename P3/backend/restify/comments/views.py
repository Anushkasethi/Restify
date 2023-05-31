from django.shortcuts import render
# Create your views here.
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status , filters, generics
from django.core.paginator import Paginator
from django.contrib.contenttypes.models import ContentType
from .models import  UserComment, PropertyComment
from property.models import Property
from .serializers import UserCommentSerializer, PropertyCommentSerializer
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from django.http import HttpResponse

class UserCommentApiView(APIView):
    filter_backends = [
        DjangoFilterBackend, 
        filters.OrderingFilter,
        ]
    serializer_class = UserCommentSerializer
    filterset_fields = (
        'dateMade'
    )

    def get(self, request, user_id, *args, **kwargs):
        comments = UserComment.objects.filter(userId=user_id)
        serializer = UserCommentSerializer(comments, many = True)
        return Response(serializer.data)
    def post(self, request, user_id, *args, **kwargs):
        data = {
            'hostName' : request.user.username,
            'content' : request.data.get('content') ,
            'userId' : user_id,
            'rating' : request.data.get('rating'),
        }
        serializer = UserCommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST )

    
class PropertyCommentApiView(APIView):
    pagination_class = PageNumberPagination
    filter_backends = [
        DjangoFilterBackend, 
        filters.OrderingFilter,
        ]
    serializer_class = PropertyCommentSerializer
    filterset_fields = (
        'dateMade'
    )

    def get(self, request, prop_id, *args, **kwargs):
        comments = PropertyComment.objects.filter(propId=prop_id)
        serializer = PropertyCommentSerializer(comments, many = True)
        return Response(serializer.data)
    def post(self, request, prop_id, *args, **kwargs):
        data = {
            'guestName' : request.user.username,
            'content' : request.data.get('content') ,
            'propId' : prop_id,
            'rating' : request.data.get('rating'),
        }
        serializer = PropertyCommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST )

class GetPropertyCommentApiView(generics.ListAPIView):
    queryset  = PropertyComment.objects.all()
    serializer_class = PropertyCommentSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ('dateMade',)
    
    name = 'property-comment-search'

    def get_queryset(self):
        prop_id = self.kwargs['prop_id']
        comments = PropertyComment.objects.filter(propId=prop_id)
        return comments