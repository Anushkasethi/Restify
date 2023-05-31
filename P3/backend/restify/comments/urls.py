from django.urls import path
from .views import (
    UserCommentApiView,
    PropertyCommentApiView,
    GetPropertyCommentApiView,
)
app_name = "comments"

urlpatterns = [
    # path('add/', views.AddComment.as_view(), name='add_comment'),
    # path('addproperty/', views.AddCommentP.as_view(), name='add_comment_property'),
    # path('view/', views.GetComments.as_view(), name='viewcomments'),
    # path('reply/', views.Reply.as_view(), name='add_reply'),



    # user comments stuff
    path('addUserComment/<int:user_id>/', UserCommentApiView.as_view()),
    path('addPropertyComment/<int:prop_id>/', PropertyCommentApiView.as_view()),
    path('getPropertyComment/<int:prop_id>/', GetPropertyCommentApiView.as_view())

]