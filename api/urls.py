from django.urls import path
from .views import TestListView, TestPageView

urlpatterns = [
    path('test-list/', TestListView.as_view()),
    path('test-page/<int:id>', TestPageView.as_view())
] 