from django.shortcuts import redirect, render
from api.forms import BusinessForm
from django.contrib.auth.decorators import login_required
from api.models import Business,Category,Profile
from django.contrib.auth.models import User

# Create your views here.
@login_required(login_url="index")
def index_view(request,*args,**kwargs):
    return render(request,'dashboard_frontend/index.html')

@login_required(login_url="index")
def businessformview(request):
    user=request.user
    user=User.objects.filter(username=user)
    if user.exists():
        if user[0].is_staff==True:
            category_objs=Category.objects.all()
            context={}
            if category_objs.exists():
                if request.session.get("get_error") or request.session.get("get_success"):
                    context={"category_objs":category_objs,"vendor_ask":user[0].is_staff,"admin_ask":user[0].is_superuser,"get_error":request.session["get_error"],"get_success":request.session["get_success"],"user":request.user}
                    request.session["get_success"]=False
                    request.session["get_error"]=False
                else:
                    context={"category_objs":category_objs,"vendor_ask":user[0].is_staff,"user":request.user,"admin_ask":user[0].is_superuser}
            return render(request,'main_pages/businessform.html',context)
        else:
            return redirect("index")
    else:
        return redirect("index")

@login_required(login_url="index")
def productformview(request):
    user=request.user
    user=User.objects.filter(username=user)
    if user.exists():
        if user[0].is_staff==True:
            business_objs=Business.objects.filter(user=request.user,approved=True)
            context={}
            if business_objs.exists():
                if request.session.get("get_error") or request.session.get("get_success"):
                    context={"business_objs":business_objs,"vendor_ask":user[0].is_staff,"get_error":request.session["get_error"],"get_success":request.session["get_success"],"user":request.user,"admin_ask":user[0].is_superuser}
                    request.session["get_success"]=False
                    request.session["get_error"]=False
                else:
                    context={"business_objs":business_objs,"vendor_ask":user[0].is_staff,"user":request.user,"admin_ask":user[0].is_superuser}
            return render(request,'main_pages/productform.html',context)
        else:
            return redirect("index")
    else:
        return redirect("index")

@login_required(login_url="index")
def classifiedsform(request):
    category_objs=Category.objects.all()
    context={}
    if category_objs.exists():
        if request.session.get("get_error") or request.session.get("get_success"):
            context={"category_objs":category_objs,"vendor_ask":User.objects.filter(username=request.user)[0].is_staff,"get_error":request.session["get_error"],"get_success":request.session["get_success"],"user":request.user,"admin_ask":User.objects.filter(username=request.user)[0].is_superuser}
            request.session["get_success"]=False
            request.session["get_error"]=False
        else:
            context={"category_objs":category_objs,"vendor_ask":User.objects.filter(username=request.user)[0].is_staff,"user":request.user,"admin_ask":User.objects.filter(username=request.user)[0].is_superuser}
    return render(request,"main_pages/classifieds.html",context)

@login_required(login_url="index")
def dealsform(request):
    user=request.user
    user=User.objects.filter(username=user)
    if user.exists():
        if user[0].is_staff==True:
            business_objs=Business.objects.filter(user=request.user,approved=True)
            context={}
            if business_objs.exists():
                if request.session.get("get_error") or request.session.get("get_success"):
                    context={"business_objs":business_objs,"vendor_ask":user[0].is_staff,"get_error":request.session["get_error"],"get_success":request.session["get_success"],"user":request.user,"admin_ask":user[0].is_superuser}
                    request.session["get_success"]=False
                    request.session["get_error"]=False
                else:
                    context={"business_objs":business_objs,"vendor_ask":user[0].is_staff,"user":request.user,"admin_ask":user[0].is_superuser}
            return render(request,'main_pages/dealsform.html',context)
        else:
            return redirect("index")
    else:
        return redirect("index")

@login_required(login_url="index")
def eventsform(request):
    category_objs=Category.objects.all()
    context={}
    if category_objs.exists():
        if request.session.get("get_error") or request.session.get("get_success"):
            context={"category_objs":category_objs,"vendor_ask":User.objects.filter(username=request.user)[0].is_staff,"get_error":request.session["get_error"],"get_success":request.session["get_success"],"user":request.user,"admin_ask":User.objects.filter(username=request.user)[0].is_superuser}
            request.session["get_success"]=False
            request.session["get_error"]=False
        else:
            context={"category_objs":category_objs,"vendor_ask":User.objects.filter(username=request.user)[0].is_staff,"user":request.user,"admin_ask":User.objects.filter(username=request.user)[0].is_superuser}
    return render(request,"main_pages/events.html",context)

@login_required(login_url="index")
def edirprofileform(request):
    if request.session.get("get_error") or request.session.get("get_success"):
        user_obj=User.objects.filter(username=request.user)
        profile_obj=Profile.objects.filter(user=user_obj[0])
        if profile_obj.exists():
            profile=profile_obj[0]
        context={"vendor_ask":user_obj[0].is_staff,"get_error":request.session["get_error"],"get_success":request.session["get_success"],"profile_obj":profile,"user":request.user,"admin_ask":user_obj[0].is_superuser}
        request.session["get_error"]=False
        request.session["get_success"]=False
    else:
        user_obj=User.objects.filter(username=request.user)
        profile_obj=Profile.objects.filter(user=user_obj[0])
        if profile_obj.exists():
            profile=profile_obj[0]
        context={"vendor_ask":user_obj[0].is_staff,"profile_obj":profile,"user":request.user,"admin_ask":user_obj[0].is_superuser}
    return render(request,"main_pages/editprofile.html",context)

def udpatebusiness(request):
    return render(request,"main_pages/businessupdate.html")

