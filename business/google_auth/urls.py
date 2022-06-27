from django.urls import path
from . import views
urlpatterns=[
    path('get_auth_url/',views.AuthUrl.as_view(),name="get_auth_url"),
    path("redirect/",views.call_back,name="redirect"),
    path("google_data/",views.get_google_data),
]