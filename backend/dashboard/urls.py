from django.urls import path
from . import views

urlpatterns = [
    path('', views.react_app, name='react_app'),
]