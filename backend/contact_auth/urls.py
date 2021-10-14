from rest_framework_jwt.views import obtain_jwt_token
from django.urls import path, include

urlpatterns = [
    path('', obtain_jwt_token),
]