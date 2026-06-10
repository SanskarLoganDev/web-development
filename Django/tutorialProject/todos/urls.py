from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="name"),
    path('hello', views.hello_world_view, name="hello_world"),
    path('html-render', views.hello_html_view, name="html"),
    path('hello-name/<str:name>', views.hello_path, name="hello_path"), # we use angle brackets to here to fetch info from the URL
    path('add/<int:num1>/<int:num2>', views.add, name="sum"),
    path('query', views.hello_query, name="query"),
    path('special', views.special_view, name="special"),
    path('postend', views.post_example, name="post_example"),
    path('submit', views.submit_example, name="submit_example"),
    path('submit-django', views.submit_django_form, name="submit_django_example"),
]
