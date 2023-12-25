from django.shortcuts import render
from rest_framework import generics
from .models import Test
from .serializer import TestSerializer

# Create your views here.

class TestListView(generics.ListAPIView):

    queryset = Test.objects.all()

    serializer_class = TestSerializer

