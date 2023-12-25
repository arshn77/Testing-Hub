from django.urls import path
from .views import TestListView

urlpatterns = [
    path('test-list/', TestListView.as_view())
] 