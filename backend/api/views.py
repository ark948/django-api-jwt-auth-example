from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from api.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # anyone, who is even not authenticated can access this view to sign up
    permission_classes = [AllowAny]