from django.urls import path
from . import views
urlpatterns=[
    path("",views.index_view,name="index"),
    path("catalog/",views.index_view,name="catalog"),
    path("businessdetail/<slug:slug>",views.index_view),
    path("businessinfo/<slug:slug>",views.index_view),
    path("businessreview/<slug:slug>",views.index_view),
    path("itemsearch/<str:title>/<str:location>",views.index_view,name="itemsearch"),
    path("category/<str:category>/",views.index_view,name="categorysearch"),
    path("events/",views.index_view),
    path("classifieds/",views.index_view),
    path("deals/",views.index_view),
    path("account/",views.index_view),
    path("user_reviews/",views.index_view),
    path("reset/user/<uid>/<token>/",views.index_view),
    path("verifyemail/user/<uid>/<token>/",views.index_view),
    path("emailpage/",views.index_view),
    path("testing/",views.index_view),
    path("filteritems/<str:address>/<str:city>/<int:rate_1>/<int:rate_2>/<int:rate_3>/<int:rate_4>/<int:rate_5>/",views.index_view),
    path("reviewdelete/<slug:slug>/",views.index_view),
    path("myfavourites/",views.index_view),
    path("favoritesremove/<slug:slug>/",views.index_view),
]