from django.shortcuts import render

# Create your views here.

def index_view(request,*args,**kwargs):
    return render(request,"frontend/index.html")

def catalog_view(request):
    return render(request,"main_pages/catalog.html")