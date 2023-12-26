from django.contrib import admin
from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('test/<int:id>', index),
]

# try this path('<path:path>', index) as a catch all
