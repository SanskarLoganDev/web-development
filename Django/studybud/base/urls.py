# URLs file just for this app and not the whole project

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('room/', views.room, name="room")
]
