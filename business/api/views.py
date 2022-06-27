import json
from django.forms import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.core.mail import EmailMultiAlternatives
from django.db.models import Q
import requests
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.views import APIView
from .serializers import RegisterSerializer,LoginSerializer,BusinessSerializer,BusinessRatingSerializer,ProductSerializer,DealsSerializer,DealsRatingSerializer,MultipleLocationSerializer,EventsSerializer,EventsRatingSerializer,ClassifiedsSerializer,ClassifiedsRatingSerializer,UserChangePasswordSerializer,SendPasswordResetEmailViewSerializer,UserPasswordResetSerializer,ClassifiedUpdateSerializer,DealsUpdateSerializer,EventsUpdateSerializer,ProductsUpdateSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Events,EventsRating,Classifieds,ClassifiedsRating,Business,BusinessRating,Deals,DealsRating,Product,MultipleLocations,Category,Profile,EmailVerification,Favourites
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from django.contrib import auth
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.authentication import SessionAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.decorators import login_required
from rest_framework.pagination import PageNumberPagination
import datetime
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import EmailMessage
# Create your views here.



@api_view(['GET'])
def listcategory(request,*args,**kwargs):
    objs=list(Category.objects.all().values())
    return Response(objs,status=200)
class RegisterUser(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=RegisterSerializer
    def perform_create(self, serializer):
        vendor_ask=serializer.validated_data.get('vendor_ask')
        first_name=serializer.validated_data.get('first_name')
        last_name=serializer.validated_data.get('last_name')
        username=serializer.validated_data.get('username')
        email=serializer.validated_data.get('email')
        password1=serializer.validated_data.get('password')
        password2=serializer.validated_data.get('password2')
        attrs={
            'password':password1,
            'password2':password2
        }
        serializer.validate(attrs)
        if vendor_ask==True:
            user=User.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            username=username
            )
            user.is_staff=vendor_ask
            user.set_password(password1)
            user.save()
            user_encode_obj=User.objects.filter(username=username)[0]
            uid=urlsafe_base64_encode(force_bytes(user_encode_obj.id))
            print("Encoded UID",uid)
            token=PasswordResetTokenGenerator().make_token(user_encode_obj)
            print("token",token)
            link=f'http://localhost:8000/verifyemail/user/'+uid+'/'+token
            print("verification email",link)
            # Send Email
            body="Click the following link to verify your email "+link
            send_email=EmailMessage(
                subject="Verify Your Email",
                body=body,
                from_email="hashimmuhammad844@gmail.com",
                to=[user_encode_obj.email]
            )
            send_email.send()
        else:
            user=User.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                username=username,
            )
            user.set_password(password1)
            user.save()
            user_encode_obj=User.objects.filter(username=username)[0]
            uid=urlsafe_base64_encode(force_bytes(user_encode_obj.id))
            print("Encoded UID",uid)
            token=PasswordResetTokenGenerator().make_token(user_encode_obj)
            print("token",token)
            link='http://localhost:8000/verifyemail/user/'+uid+'/'+token
            print("verification email",link)
            # Send Email
            body="Click the following link to verify your email "+link
            send_email=EmailMessage(
                subject="Verify Your Email",
                body=body,
                from_email="hashimmuhammad844@gmail.com",
                to=[user_encode_obj.email]
            )
            send_email.send()
        return Response({"message":"Email Verification link has been send to you verify your email first"},status=status.HTTP_200_OK)

@api_view(['POST'])
def login_view(request,*args,**kwargs):
    data=request.data
    username=data.get('username')
    password=data.get('password')
    print(request.headers['Origin'])
    if username and password:
        check_email=User.objects.filter(email=username)
        if check_email.exists():
            username=check_email[0].username
            profile_obj=Profile.objects.filter(user=check_email[0])
            if profile_obj.exists():
                pass
            else:
                profile_create_obj=Profile.objects.create(
                    user=check_email[0]
                )
                profile_create_obj.save()
            vendor_ask=check_email[0].is_staff
            admin_ask=check_email[0].is_superuser
            data={'username':username,'password':password,'vendor_ask':vendor_ask,"admin_ask":admin_ask,"first_name":check_email[0].first_name,"last_name":check_email[0].last_name,"email":check_email[0].email}
            request.session['username']=username
            request.session['vendor_ask']=vendor_ask
            request.session['admin_ask']=admin_ask
            user=auth.authenticate(username=username,password=password)
        else:
            user_obj=User.objects.filter(username=username)
            if user_obj.exists():
                profile_obj=Profile.objects.filter(user=user_obj[0])
                if profile_obj.exists():
                     pass
                else:
                    profile_create_obj=Profile.objects.create(
                        user=user_obj[0]
                    )
                    profile_create_obj.save()
                vendor_ask=user_obj[0].is_staff
                admin_ask=user_obj[0].is_superuser
                data={'username':username,'password':password,'vendor_ask':vendor_ask,"admin_ask":admin_ask,"first_name":user_obj[0].first_name,"last_name":user_obj[0].last_name,"email":user_obj[0].email}
                request.session['username']=username
                request.session['vendor_ask']=vendor_ask
                request.session['admin_ask']=admin_ask
            else:
                return Response({"message":"Username or email does not exists"},status=status.HTTP_404_NOT_FOUND)
        user=auth.authenticate(username=username,password=password)
        if user is not None:
            email_obj_check=EmailVerification.objects.filter(user=User.objects.filter(username=username)[0])
            if email_obj_check.exists():
                if email_obj_check[0].is_verified==True:
                    auth.login(request,user)
                    return Response({"data":data},status=200)
                else:
                    user_delete_obj=User.objects.filter(username=username)
                    user_delete_obj.delete()
                    return Response({"message":"Your account is not activated register again and provide valid credentials"},status=status.HTTP_400_BAD_REQUEST)
            else:
                user_delete_obj=User.objects.filter(username=username)
                user_delete_obj.delete()
                return Response({"message":"Your account is not authorized please register again with valid credentials"},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message":"Invalid Credentials"},status=400)
    else:
        return Response({"message":"enter username or password"},status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def businessview(request,*args,**kwargs):
    if request.user.is_authenticated:
        user=request.user
        if User.objects.filter(username=user).exists():
            if User.objects.filter(username=user)[0].is_staff==True:
                title=request.POST['title']
                description=request.POST['description']
                category=request.POST['category']
                phone_number=request.POST['phone_number']
                email=request.POST['email']
                if request.POST['website_url']:
                    website_url=request.POST['website_url']
                else:
                    website_url=None
                address=request.POST['address']
                city=request.POST['city']
                country=request.POST['country']
                location=f"{address},{city},{country}"
                timingfrom=request.POST['open_at']
                timingto=request.POST['close_at']
                if request.FILES:
                    image_field=request.FILES['image_field']
                else:
                    image_field=None
                if 'AM' or 'PM' in timingfrom:
                    user_obj=User.objects.filter(username=user)
                    if image_field:
                        if str(image_field.name).lower().count('jpg') > 0 or str(image_field.name).lower().count('jpeg')>0:
                            obj_get=Business.objects.create(
                                user=user_obj[0],
                                title=title,
                                description=description,
                                category=category,
                                location=location,
                                website_url=website_url,
                                timingfrom=timingfrom,
                                timingto=timingto,
                                image_field=image_field,
                                phone_number=phone_number,
                                email=email
                            )
                            obj_get.save()
                            request.session['get_error']=False
                            request.session["get_success"]=True
                            return redirect("businessform")
                        else:
                            request.session['get_error']=True
                            request.session["get_success"]=False
                            return redirect("businessform")
                    else:
                        obj_get=Business.objects.create(
                            user=user_obj[0],
                            title=title,
                            description=description,
                            category=category,
                            location=location,
                            website_url=website_url,
                            timingfrom=timingfrom,
                            timingto=timingto,
                            phone_number=phone_number,
                            email=email
                        )
                        obj_get.save()
                        request.session["get_success"]=True
                        request.session["get_error"]=False
                        return redirect("businessform")
                else:
                    return redirect("businessform")
            else:
                return Response({"message":"Your are not a vendor so can not created the business, sign up as vendor in order to get access for it"},status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"message":"Your are not authenticated to get access of this view"},status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"message":"Your are not authenticated to get access of this view"},status=status.HTTP_401_UNAUTHORIZED)
            

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def classifiedsview(request,*args,**kwargs):
    if request.user.is_authenticated:
        user=request.user
        title=request.POST['title']
        description=request.POST['description']
        category=request.POST['category']
        phone_number=request.POST['phone_number']
        email=request.POST['email']
        if request.FILES:
            image_field=request.FILES['image_field']
        else:
            image_field=None
        user_obj=User.objects.filter(username=user)
        if image_field:
            if str(image_field.name).lower().count('jpg') > 0 or str(image_field.name).lower().count('jpeg')>0:
                obj_get=Classifieds.objects.create(
                    user=user_obj[0],
                    title=title,
                    description=description,
                    category=category,
                    image_field=image_field,
                    phone_number=phone_number,
                    email=email
                )
                obj_get.save()
                request.session["get_success"]=True
                request.session['get_error']=False
                return redirect("classifiedsform")
            else:
                request.session["get_success"]=False
                request.session['get_error']=True
                return redirect("classifiedsform")
        else:
            obj_get=Classifieds.objects.create(
                user=user_obj[0],
                title=title,
                description=description,
                category=category,
                phone_number=phone_number,
                email=email
                )
            obj_get.save()
            request.session["get_success"]=True
            request.session["get_error"]=False
            return redirect("classifiedsform")
    else:
        return Response({"message":"Your are not authenticated to get access of this view"},status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def dealsview(request,*args,**kwargs):
    if request.user.is_authenticated:
        user=request.user
        if User.objects.filter(username=user).exists():
            if User.objects.filter(username=user)[0].is_staff==True:
                title=request.POST['title']
                description=request.POST['description']
                business_id=request.POST["business"]
                timingfrom=request.POST['open_at']
                timingto=request.POST['close_at']
                if request.data.get('active'):
                    active=request.POST['active']
                else:
                    active=False
                phone_number=request.POST['phone_number']
                email=request.POST['email']
                if request.FILES:
                    image_field=request.FILES['image_field']
                else:
                    image_field=None
                user_obj=User.objects.filter(username=user)
                business_obj=Business.objects.filter(id=business_id)
                if business_obj.exists():
                    if image_field:
                        if str(image_field.name).lower().count('jpg') > 0 or str(image_field.name).lower().count('jpeg')>0:
                            obj_get=Deals.objects.create(
                                user=user_obj[0],
                                business_name=business_obj[0],
                                title=title,
                                description=description,
                                datefrom=timingfrom,
                                dateto=timingto,
                                image_field=image_field,
                                phone_number=phone_number,
                                email=email,
                                active=active
                            )
                            obj_get.save()
                            request.session['get_success']=True
                            request.session['get_error']=False
                            return redirect('dealsform')
                        else:
                            request.session["get_success"]=False
                            request.session['get_error']=True
                            return redirect("dealsform")
                    else:
                        obj_get=Deals.objects.create(
                            user=user_obj[0],
                            title=title,
                            business_name=business_obj[0],
                            description=description,
                            datefrom=timingfrom,
                            dateto=timingto,
                            phone_number=phone_number,
                            email=email,
                            active=active
                        )
                        request.session["get_success"]=True
                        request.session["get_error"]=False
                        obj_get.save()
                        return redirect("dealsform")
                else:
                    return Response({"message":"Business does not exists"},status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"message":"Your are not a vendor so can not created the business, sign up as vendor in order to get access for it"},status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"message":"Your are not authenticated to get access of this view"},status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"message":"Your are not authenticated to get access of this view"},status=status.HTTP_401_UNAUTHORIZED)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def eventsview(request,*args,**kwargs):
    if request.user.is_authenticated:
        user=request.user
        title=request.POST['title']
        description=request.POST['description']
        category=request.POST['category']
        phone_number=request.POST['phone_number']
        email=request.POST['email']
        if request.FILES:
            image_field=request.FILES['image_field']
        else:
            image_field=None
        user_obj=User.objects.filter(username=user)
        if image_field:
            if str(image_field.name).lower().count('jpg') > 0 or str(image_field.name).lower().count('jpeg')>0:
                obj_get=Events.objects.create(
                    user=user_obj[0],
                    title=title,
                    description=description,
                    category=category,
                    image_field=image_field,
                    phone_number=phone_number,
                    email=email
                )
                obj_get.save()
                request.session["get_success"]=True
                request.session['get_error']=False
                return redirect("eventsform")
            else:
                request.session['get_error']=True
                request.session["get_success"]=False
                return redirect("eventsform")
        else:
            obj_get=Events.objects.create(
                user=user_obj[0],
                title=title,
                category=category,
                description=description,
                phone_number=phone_number,
                email=email
            )
            obj_get.save()
            request.session["get_success"]=True
            request.session["get_error"]=False
            return redirect("eventsform")
    else:
        return Response({"message":"Your are not authenticated to get access of this view"},status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def productview(request,*args,**kwargs):
    user=request.user
    user=User.objects.filter(username=user)
    if user.exists():
        if user[0].is_staff==True:
            title=request.POST['title']
            description=request.POST['description']
            price=request.POST['price']
            business_id=request.POST["business"]
            if request.FILES:
                image_field=request.FILES['image_field']
            else:
                image_field=None
            business_obj=Business.objects.filter(id=business_id)
            if business_obj.exists():
                if image_field:
                    if str(image_field.name).lower().count('jpg') > 0 or str(image_field.name).lower().count('jpeg')>0:
                        obj_get=Product.objects.create(
                            user=user[0],
                            business=business_obj[0],
                            title=title,
                            description=description,
                            price=price,
                            image_field=image_field
                        )
                        obj_get.save()
                        request.session["get_success"]=True
                        request.session['get_error']=False
                        return redirect("productform")
                    else:
                        request.session["get_success"]=False
                        request.session['get_error']=True
                        return redirect("productform")
                else:
                    obj_get=Product.objects.create(
                        user=user[0],
                        business=business_obj[0],
                        title=title,
                        description=description,
                        price=price
                    )
                    obj_get.save()
                    request.session["get_error"]=False
                    request.session["get_success"]=True
                    return redirect("productform")
            else:
                return Response({"message":"Business does not exists"},status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"message":"Your are not a vendor so can not created the business, sign up as vendor in order to get access for it"},status=status.HTTP_401_UNAUTHORIZED)
    else:
       return Response({"message":"Your are not authenticated to get access of this view"},status=status.HTTP_401_UNAUTHORIZED)
class BusinessListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
       

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_review(request,*args,**kwargs):
    data_body=request.data
    username=data_body['user']
    comment=data_body['comment']
    rate=int(data_body['rate'])
    slug=data_body['slug']
    user=User.objects.filter(username=username)
    business_obj=Business.objects.filter(slug=slug)
    deals_obj=Deals.objects.filter(slug=slug)
    classifieds_obj=Classifieds.objects.filter(slug=slug)
    events_obj=Events.objects.filter(slug=slug)
    if business_obj.exists():
        if business_obj[0].approve_reviews==True:
            checker=BusinessRating.objects.filter(user=user[0],business=business_obj[0])
            if checker.exists():
                object_name=checker[0]
                object_name.comment=comment
                object_name.rate=rate
                object_name.save()
            else:
                business_rating_obj=BusinessRating.objects.create(
                    business=business_obj[0],
                    user=user[0],
                    comment=comment,
                    rate=rate   
                )
                business_rating_obj.save()
        else:
            return Response({"message":"Not approved for reviews"},status=status.HTTP_400_BAD_REQUEST)
    elif deals_obj.exists():
        if deals_obj[0].approve_reviews==True:
            checker=DealsRating.objects.filter(user=user[0],deals=deals_obj[0])
            if checker.exists():
                object_name=checker[0]
                object_name.comment=comment
                object_name.rate=rate
                object_name.save()
            else:
                deals_rating_obj=DealsRating.objects.create(
                    deals=deals_obj[0],
                    user=user[0],
                    comment=comment,
                    rate=rate
                )
                deals_rating_obj.save()
        else:
            return Response({"message":"Not approved for reviews"},status=status.HTTP_400_BAD_REQUEST)
    elif events_obj.exists():
        if events_obj[0].approve_reviews==True:
            checker=EventsRating.objects.filter(user=user[0],events=events_obj[0])
            if checker.exists():
                object_name=checker[0]
                object_name.comment=comment
                object_name.rate=rate
                object_name.save()
            else:
                events_rating_obj=EventsRating.objects.create(
                    events=events_obj[0],
                    user=user[0],
                    comment=comment,
                    rate=rate
                )
                events_rating_obj.save()
        else:
            return Response({"message":"Not approved for reviews"},status=status.HTTP_400_BAD_REQUEST)
    elif classifieds_obj.exists():
        if classifieds_obj[0].approve_reviews==True:
            checker=ClassifiedsRating.objects.filter(user=user[0],classifieds=classifieds_obj[0])
            if checker.exists():
                object_name=checker[0]
                object_name.comment=comment
                object_name.rate=rate
                object_name.save()
            else:
                classifieds_rating_obj=ClassifiedsRating.objects.create(
                    classifieds=classifieds_obj[0],
                    user=user[0],
                    comment=comment,
                    rate=rate
                )
                classifieds_rating_obj.save()
        else:
            return Response({"message":"Not approved for reviews"},status=status.HTTP_400_BAD_REQUEST)
    return Response(data_body,status=200)
class BusinessAdminListView(generics.ListAPIView):
    permission_classes=[IsAuthenticated,IsAdminUser]
    queryset=Business.objects.all().order_by('-created_at')
    serializer_class=BusinessSerializer
    pagination_class=BusinessListPagination
class BusinessListView(generics.ListAPIView):
    queryset=Business.objects.filter(approved=True)
    serializer_class=BusinessSerializer
    pagination_class=BusinessListPagination
class DealsListAdminView(APIView):
    permission_classes=[IsAuthenticated,IsAdminUser]
    def get(self,request,*args,**kwargs):
        objs=[]
        deals_obj=Deals.objects.all().order_by('-created_at')
        paginator=PageNumberPagination()
        paginator.page_size=10
        if deals_obj.exists():
            for i in range(len(deals_obj)):
                data={
                    'business':deals_obj[i].business_name.title,
                    'title':deals_obj[i].title,
                    'description':deals_obj[i].description,
                    'image_field':deals_obj[i].image_field.url,
                    'slug':deals_obj[i].slug,
                    'approved':deals_obj[i].approved,
                    'timingfrom':deals_obj[i].datefrom,
                    'timingto':deals_obj[i].dateto,
                    'active':deals_obj[i].active,
                    'created_at':deals_obj[i].created_at
                }
                objs.append(data)
            result_page=paginator.paginate_queryset(objs,request)
            return paginator.get_paginated_response(result_page)
        else:
            return Response({"message":"deals does not exists"},status=status.HTTP_200_OK)
class DealsListView(generics.ListAPIView):
    queryset=Deals.objects.filter(approved=True,active=True)
    serializer_class=DealsSerializer
    pagination_class=BusinessListPagination
class EventsListAdminView(generics.ListAPIView):
    permission_classes=[IsAuthenticated,IsAdminUser]
    queryset=Events.objects.all().order_by("-created_at")
    serializer_class=EventsSerializer
    pagination_class=BusinessListPagination
class EventsListView(generics.ListAPIView):
    queryset=Events.objects.filter(approved=True)
    serializer_class=EventsSerializer
    pagination_class=BusinessListPagination
class ClassifiedsListAdminView(generics.ListAPIView):
    permission_classes=[IsAuthenticated,IsAdminUser]
    queryset=Classifieds.objects.all().order_by('-created_at')
    serializer_class=ClassifiedsSerializer
    pagination_class=BusinessListPagination
class ClassifiedsListView(generics.ListAPIView):
    queryset=Classifieds.objects.filter(approved=True)
    serializer_class=ClassifiedsSerializer
    pagination_class=BusinessListPagination
class ProductsListAdminView(APIView):
    permission_classes=[IsAuthenticated,IsAdminUser]
    def get(self, request, *args, **kwargs):
        objs=[]
        product_objs=Product.objects.all().order_by('-created_at')
        paginator=PageNumberPagination()
        paginator.page_size=10
        if product_objs.exists():
            for i in range(len(product_objs)):
                data={
                    "business":product_objs[i].business.title,
                    'title':product_objs[i].title,
                    'description':product_objs[i].description,
                    'slug':product_objs[i].slug,
                    'image_field':product_objs[i].image_field.url,
                    'created_at':product_objs[i].created_at,
                    'approved':product_objs[i].approved
                }
                objs.append(data)
            result_page=paginator.paginate_queryset(objs,request)
            return paginator.get_paginated_response(result_page)
        else:
            return Response({"message":"deals does not exists"},status=status.HTTP_200_OK)

@api_view(['GET'])
def search_view(request,*args,**kwargs):
        search_value=request.GET.get('item')
        location_value=request.GET.get("location")
        paginator=PageNumberPagination()
        paginator.page_size=8
        business_lookups=Q(title__icontains=search_value) | Q(location__icontains=location_value)
        lookups=Q(title__icontains=search_value)
        objs=[]
        business_objs=Business.objects.filter(business_lookups,approved=True)
        deals_objs=Deals.objects.filter(lookups,approved=True)
        classifieds_objs=Classifieds.objects.filter(lookups,approved=True)
        events_objs=Events.objects.filter(lookups,approved=True)
        if business_objs.exists():
            for i in range(len(business_objs)):
                obj_get=Business.objects.get(id=business_objs[i].id)
                dict_obj={
                    "title":obj_get.title,
                    "type":"business",
                    "description":obj_get.description[0:30],
                    "image_field":obj_get.image_field.url,
                    "category":obj_get.category,
                    "website_url":obj_get.website_url,
                    "location":obj_get.location,
                    "timingfrom":obj_get.timingfrom,
                    "timingto":obj_get.timingto,
                    "slug":obj_get.slug,
                    "rate_count":obj_get.rate_count,
                    "rate":obj_get.rate
                }
                objs.append(dict_obj)
        if deals_objs.exists():
            for i in range(len(deals_objs)):
                obj_get=Deals.objects.get(id=deals_objs[i].id)
                dict_obj={
                    "title":obj_get.title,
                    "type":"deals",
                    "description":obj_get.description[0:30],
                    "image_field":obj_get.image_field.url,
                    "timingfrom":obj_get.datefrom,
                    "timingto":obj_get.dateto,
                    "business_name":obj_get.business_name.title,
                    "slug":obj_get.slug,
                    "is_open":obj_get.is_open,
                    "active":obj_get.active,
                    "rate_count":obj_get.rate_count,
                    "rate":obj_get.rate
                }
                objs.append(dict_obj)
        if events_objs.exists():
            for i in range(len(events_objs)):
                obj_get=Events.objects.get(id=events_objs[i].id)
                dict_obj={
                    "title":obj_get.title,
                    "type":"events",
                    "description":obj_get.description[0:30],
                    "image_field":obj_get.image_field.url,
                    "category":obj_get.category,
                    "slug":obj_get.slug,
                    "rate_count":obj_get.rate_count,
                    "rate":obj_get.rate
                }
                objs.append(dict_obj)
        if classifieds_objs.exists():
            for i in range(len(classifieds_objs)):
                obj_get=Classifieds.objects.get(id=classifieds_objs[i].id)
                dict_obj={
                    "title":obj_get.title,
                    "type":"classifieds",
                    "description":obj_get.description[0:30],
                    "image_field":obj_get.image_field.url,
                    "category":obj_get.category,
                    "slug":obj_get.slug,
                    "rate_count":obj_get.rate_count,
                    "rate":obj_get.rate
                }
                objs.append(dict_obj)
        result_page=paginator.paginate_queryset(objs,request)
        return paginator.get_paginated_response(result_page)

@api_view(["GET"])
def get_by_items_by_category(request,*args,**kwargs):
    category=request.GET.get("category")
    paginator=PageNumberPagination()
    paginator.page_size=8
    business_obj=Business.objects.filter(category=category,approved=True)
    events_objs=Events.objects.filter(category=category,approved=True)
    classifieds_objs=Classifieds.objects.filter(category=category,approved=True)
    objs=[]
    if business_obj.exists():
            for i in range(len(business_obj)):
                obj_get=Business.objects.get(id=business_obj[i].id)
                dict_obj={
                    "title":obj_get.title,
                    "type":"business",
                    "description":obj_get.description[0:30],
                    "image_field":obj_get.image_field.url,
                    "category":obj_get.category,
                    "website_url":obj_get.website_url,
                    "location":obj_get.location,
                    "timingfrom":obj_get.timingfrom,
                    "timingto":obj_get.timingto,
                    "slug":obj_get.slug,
                    "rate":obj_get.rate,
                    "rate_count":obj_get.rate_count
                }
                objs.append(dict_obj)
    if events_objs.exists():
        for i in range(len(events_objs)):
            obj_get=Events.objects.get(id=events_objs[i].id)
            dict_obj={
                "title":obj_get.title,
                "type":"events",
                "description":obj_get.description[0:30],
                "image_field":obj_get.image_field.url,
                "category":obj_get.category,
                "slug":obj_get.slug,
                "rate":obj_get.rate,
                "rate_count":obj_get.rate_count
            }
            objs.append(dict_obj)
    if classifieds_objs.exists():
        for i in range(len(classifieds_objs)):
            obj_get=Classifieds.objects.get(id=classifieds_objs[i].id)
            dict_obj={
                "title":obj_get.title,
                "type":"classifieds",
                "description":obj_get.description[0:30],
                "image_field":obj_get.image_field.url,
                "category":obj_get.category,
                "slug":obj_get.slug,
                "rate":obj_get.rate,
                "rate_count":obj_get.rate_count
                }
            objs.append(dict_obj)
    result_page=paginator.paginate_queryset(objs,request)
    return paginator.get_paginated_response(result_page)

class GetSingleBusiness(APIView):
    def get(self,request,*args,**kwargs):
        slug=request.GET.get("slug")
        print(slug)
        business_obj=Business.objects.filter(slug=slug)
        deals_obj=Deals.objects.filter(slug=slug)
        events_obj=Events.objects.filter(slug=slug)
        classifieds_obj=Classifieds.objects.filter(slug=slug)
        product_obj=Product.objects.filter(slug=slug)
        if business_obj.exists():
            obj_get=business_obj
            data={
                "title":obj_get[0].title,
                "user":obj_get[0].user.username,
                "description":obj_get[0].description[0:30],
                "type":"business",
                "image_field":obj_get[0].image_field.url,
                "category":obj_get[0].category,
                "website_url":obj_get[0].website_url,
                "location":obj_get[0].location,
                "timingfrom":obj_get[0].timingfrom,
                "timingto":obj_get[0].timingto,
                "slug":obj_get[0].slug,
                "approve_reviews":obj_get[0].approve_reviews,
                "phone_number":obj_get[0].phone_number,
                "email":obj_get[0].email,
            }
            return Response(data,status=200)
        elif deals_obj.exists():
            obj_get=deals_obj
            data={
                "title":obj_get[0].title,
                "user":obj_get[0].user.username,
                "description":obj_get[0].description[0:30],
                "type":"deals",
                "image_field":obj_get[0].image_field.url,
                "datefrom":obj_get[0].datefrom,
                "dateto":obj_get[0].dateto,
                "business_name":obj_get[0].business_name.title,
                "slug":obj_get[0].slug,
                "is_open":obj_get[0].is_open,
                "active":obj_get[0].active,
                "approve_reviews":obj_get[0].approve_reviews,
                "phone_number":obj_get[0].phone_number,
                "email":obj_get[0].email,
            }
            return Response(data,status=200)
        elif events_obj.exists():
            obj_get=events_obj
            data={
                "title":obj_get[0].title,
                "description":obj_get[0].description[0:30],
                "type":"events",
                "user":obj_get[0].user.username,
                "image_field":obj_get[0].image_field.url,
                "category":obj_get[0].category,
                "slug":obj_get[0].slug,
                "approve_reviews":obj_get[0].approve_reviews,
                "phone_number":obj_get[0].phone_number,
                "email":obj_get[0].email,
            }
            return Response(data,status=200)
        elif classifieds_obj.exists():
            obj_get=classifieds_obj
            data={
                "title":obj_get[0].title,
                "description":obj_get[0].description[0:30],
                "type":"classifieds",
                "user":obj_get[0].user.username,
                "image_field":obj_get[0].image_field.url,
                "category":obj_get[0].category,
                "slug":obj_get[0].slug,
                "approve_reviews":obj_get[0].approve_reviews,
                "phone_number":obj_get[0].phone_number,
                "email":obj_get[0].email,
            }
            return Response(data,status=200)
        elif product_obj.exists():
            obj_get=product_obj
            data={
                "title":obj_get[0].title,
                "description":obj_get[0].description[0:30],
                "type":"products",
                "image_field":obj_get[0].image_field.url,
                "slug":obj_get[0].slug,
            }
            return Response(data,status=200)
        else:
            return Response({"message":"not good"},status=status.HTTP_404_NOT_FOUND)
        
        
@api_view(['GET'])
def get_user_review_details(request,*args,**kwargs):
    slug=request.GET.get("slug")
    paginator=PageNumberPagination()
    paginator.page_size=8
    business_obj=Business.objects.filter(slug=slug,approved=True)
    deals_obj=Deals.objects.filter(slug=slug,approved=True)
    events_obj=Events.objects.filter(slug=slug,approved=True)
    classifieds_obj=Classifieds.objects.filter(slug=slug,approved=True)
    business_avg_rating=0
    deals_avg_rating=0
    events_avg_rating=0
    classifieds_avg_rating=0
    business_rating_count=0
    deals_rating_count=0
    events_rating_count=0
    classifieds_rating_count=0
    objs=[]
    if business_obj.exists():
        businessratings=BusinessRating.objects.filter(business=business_obj[0])
        if businessratings.exists():
            for i in range(len(businessratings)):
                rating_obj=businessratings[i]
                business_avg_rating+=rating_obj.rate
                business_rating_count+=1
                user_obj=User.objects.filter(username=rating_obj.user.username)
                profile_obj=Profile.objects.filter(user=user_obj[0])
                data={
                    "user":rating_obj.user.username,
                    "image_field":profile_obj[0].image_field.url,
                    "comment":rating_obj.comment,
                    "rate":rating_obj.rate,
                    "title":rating_obj.business.title
                }
                objs.append(data)
    elif deals_obj.exists():
        dealsratings=DealsRating.objects.filter(deals=deals_obj[0])
        if dealsratings.exists():
            for i in range(len(dealsratings)):
                rating_obj=dealsratings[i]
                deals_avg_rating+=rating_obj.rate
                deals_rating_count+=1
                user_obj=User.objects.filter(username=rating_obj.user.username)
                profile_obj=Profile.objects.filter(user=user_obj[0])
                data={
                    "user":rating_obj.user.username,
                    "image_field":profile_obj[0].image_field.url,
                    "comment":rating_obj.comment,
                    "rate":rating_obj.rate,
                    "title":rating_obj.deals.title
                }
                objs.append(data)
    elif events_obj.exists():
        eventsratings=EventsRating.objects.filter(events=events_obj[0])
        if eventsratings.exists():
            for i in range(len(eventsratings)):
                rating_obj=eventsratings[i]
                events_avg_rating+=rating_obj.rate
                events_rating_count+=1
                user_obj=User.objects.filter(username=rating_obj.user.username)
                profile_obj=Profile.objects.filter(user=user_obj[0])
                data={
                    "user":rating_obj.user.username,
                    "comment":rating_obj.comment,
                    "image_field":profile_obj[0].image_field.url,
                    "rate":rating_obj.rate,
                    "title":rating_obj.events.title
                }
                objs.append(data)
    elif classifieds_obj.exists():
        classifiedsratings=ClassifiedsRating.objects.filter(classifieds=classifieds_obj[0])
        if classifiedsratings.exists():
            for i in range(len(classifiedsratings)):
                rating_obj=classifiedsratings[i]
                classifieds_avg_rating+=rating_obj.rate
                classifieds_rating_count+=1
                user_obj=User.objects.filter(username=rating_obj.user.username)
                profile_obj=Profile.objects.filter(user=user_obj[0])
                data={
                    "user":rating_obj.user.username,
                    "comment":rating_obj.comment,
                    "image_field":profile_obj[0].image_field.url,
                    "rate":rating_obj.rate,
                    "title":rating_obj.classifieds.title
                }
                objs.append(data)
    else:
        objs=[]
    if business_rating_count>0:
        business_avg_rating=business_avg_rating/business_rating_count
    if deals_rating_count >0:
        deals_avg_rating=deals_avg_rating/deals_rating_count
    if classifieds_rating_count>0:
        classifieds_avg_rating=classifieds_avg_rating/classifieds_rating_count
    if events_rating_count >0:
        events_avg_rating=events_avg_rating/events_rating_count
    if business_obj.exists():
        get_obj=business_obj[0]
        get_obj.rate=business_avg_rating
        get_obj.rate_count=business_rating_count
        get_obj.save()
    elif deals_obj.exists():
        get_obj=deals_obj[0]
        get_obj.rate=deals_avg_rating
        get_obj.rate_count=deals_rating_count
        get_obj.save()
    elif events_obj.exists():
        get_obj=events_obj[0]
        get_obj.rate=events_avg_rating
        get_obj.rate_count=events_rating_count
        get_obj.save()
    elif classifieds_obj.exists():
        get_obj=classifieds_obj[0]
        get_obj.rate=classifieds_avg_rating
        get_obj.rate_count=classifieds_rating_count
        get_obj.save()
    result_page=paginator.paginate_queryset(objs,request)
    return paginator.get_paginated_response(result_page)
@api_view(['POST'])
def get_location_coordinates(request,*args,**kwargs):
    location=request.data.get('location')
    print(location)
    api_key="AIzaSyAQFM5Asx7HPks7kOsS3yT6DPcrWtQvzjM"
    response=requests.get(f"https://maps.googleapis.com/maps/api/geocode/json?address={location}&key={api_key}")
    data=response.json()
    print(data)
    return Response(data,status=200)

class MultipleLocationView(generics.CreateAPIView):
    queryset=MultipleLocations.objects.all()
    serializer_class=MultipleLocationSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def logindata(request,*args,**kwargs):
        user_data=User.objects.filter(username=request.user)[0]
        profile_obj=Profile.objects.filter(user=user_data)
        data={
            'username':user_data.username,
            'vendor_ask':user_data.is_staff,
            'admin_ask':user_data.is_superuser,
            "first_name":user_data.first_name,
            "last_name":user_data.last_name,
            "email":user_data.email,
            "image_field":profile_obj[0].image_field.url,
            "profession":profile_obj[0].profession,
            "date_of_birth":profile_obj[0].date_of_birth
        }
        return Response(data,status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def edit_profile_view(request,*args,**kwargs):
    profession=request.POST.get("profession")
    date_of_birth=request.POST.get("date_of_birth")
    if request.FILES:
        image_field=request.FILES["image_field"]
    else:
        image_field=None
    user_obj=User.objects.filter(username=request.user)
    profile_obj=Profile.objects.filter(user=user_obj[0])
    if profile_obj.exists():
        get_obj=profile_obj[0]
        print(get_obj.id)
        if profession:
            get_obj.profession=profession
        if image_field:
            if str(image_field.name).lower().count('jpg') > 0 or str(image_field.name).lower().count('jpeg')>0:
                request.session["get_error"]=False
                get_obj.image_field=image_field
            else:
                request.session["get_error"]=True
                request.session["get_success"]=False
                return redirect("editprofileform")
        else:
            request.session["get_error"]=False
        if date_of_birth:
            get_obj.date_of_birth=date_of_birth
        get_obj.save() 
        request.session["get_success"]=True
    return redirect("editprofileform")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_particular_user_reviews(request,*args,**kwargs):
    paginator=PageNumberPagination()
    paginator.page_size=8
    user_obj=User.objects.filter(username=request.user)
    objs=[]
    businessratings=BusinessRating.objects.filter(user=user_obj[0])
    if businessratings.exists():
        for i in range(len(businessratings)):
            rating_obj=businessratings[i]
            data={
                "user":rating_obj.user.username,
                "comment":rating_obj.comment,
                "rate":rating_obj.rate,
                "title":rating_obj.business.title,
                "type":"Business",
                "slug":rating_obj.slug
            }
            objs.append(data)
    dealsratings=DealsRating.objects.filter(user=user_obj[0])
    if dealsratings.exists():
        for i in range(len(dealsratings)):
            rating_obj=dealsratings[i]
            data={
                "user":rating_obj.user.username,
                "comment":rating_obj.comment,
                "rate":rating_obj.rate,
                "title":rating_obj.deals.title,
                "type":"Deal",
                "slug":rating_obj.slug
            }
            objs.append(data)
    eventsratings=EventsRating.objects.filter(user=user_obj[0])
    if eventsratings.exists():
        for i in range(len(eventsratings)):
            rating_obj=eventsratings[i]
            data={
                "user":rating_obj.user.username,
                "comment":rating_obj.comment,
                "rate":rating_obj.rate,
                "title":rating_obj.events.title,
                "type":"Event",
                "slug":rating_obj.slug
            }
            objs.append(data)
    classifiedsratings=ClassifiedsRating.objects.filter(user=user_obj[0])
    if classifiedsratings.exists():
        for i in range(len(classifiedsratings)):
            rating_obj=classifiedsratings[i]
            data={
                "user":rating_obj.user.username,
                "comment":rating_obj.comment,
                "rate":rating_obj.rate,
                "title":rating_obj.classifieds.title,
                "type":"Classified",
                "slug":rating_obj.slug
            }
            objs.append(data)
    result_page=paginator.paginate_queryset(objs,request)
    return paginator.get_paginated_response(result_page)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def logoutView(request,*args,**kwargs):
    auth.logout(request)
    return redirect("index")

class UserChangePasswordView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,format=None):
        serializer=UserChangePasswordSerializer(data=request.data,context={'user':request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({"message":'Password Reset Successfully'},status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class SendPasswordResetEmailView(APIView):
    def post(self,request,format=None):
        request_domain=request.get_host()
        serializer=SendPasswordResetEmailViewSerializer(data=request.data,context={'request_domain':request_domain})
        if serializer.is_valid(raise_exception=True):
            return Response({"message":"password reset link send to email please check it"},status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserPasswordResetView(APIView):
    def post(self,request,uid,token,format=None):
        try:
            serializer=UserPasswordResetSerializer(data=request.data,context={'uid':uid,'token':token})
            if serializer.is_valid(raise_exception=True):
                return Response({"message":"Password Reset Successfully"},status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"message":"Invalid uid or Token"},status=status.HTTP_406_NOT_ACCEPTABLE)

class EmailVerificationView(APIView):
    def post(self,request,uid,token,format=None):
        try:
            _id=smart_str(urlsafe_base64_decode(uid))
            user=User.objects.filter(id=_id)
            if user.exists():
                if not PasswordResetTokenGenerator().check_token(user[0],token):
                    user.delete()
                    return Response({"message":"Email Verification time out"},status=status.HTTP_400_BAD_REQUEST)
                else:
                    email_obj_exists=EmailVerification.objects.filter(user=user[0])
                    if email_obj_exists.exists():
                        email_obj_save=email_obj_exists[0]
                        email_obj_save.is_verified=True
                        email_obj_save.save()
                        return Response({"message":"Your account activated successfully"},status=status.HTTP_200_OK)
                    else:
                        email_obj=EmailVerification.objects.create(
                            user=user[0],
                            is_verified=True
                        )
                        email_obj.save()
                        return Response({"message":"Your account activated successfully"},status=status.HTTP_200_OK)
            else:
                return Response({"message":"No such user exists"},status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"message":"Invalid uid or Token"},status=status.HTTP_406_NOT_ACCEPTABLE)

class UpdateBusinessView(APIView):
    permission_classes=[IsAuthenticated]
    def patch(self,request,slug,format=None):
        try:
            data=request.data
            print(data)
            if data.get('timingfrom') and data.get('timingto'):
                try:
                    int(data.get('timingfrom')[0:2])
                    int(data.get('timingto')[0:2])
                except:
                    return Response({"message":"provide the valid time"},status=status.HTTP_400_BAD_REQUEST)
            user=User.objects.filter(username=request.user)
            if user.exists():
                if user[0].is_staff==True:
                    if Business.objects.filter(slug=slug,user=user[0],approved=True).exists():
                        business_obj=Business.objects.filter(slug=slug)[0]
                        if data.get('title'):
                            business_obj.title=data["title"]
                        if data.get('description'):
                            business_obj.description=data['description']
                        if data.get('address') and data.get('city') and data.get('country'):
                            location=f"{data.get('address')},{data.get('city')},{data.get('country')}"
                            business_obj.location=location
                        if data.get('website_url'):
                            business_obj.website_url=data['website_url']
                        if data.get('image_field')!='undefined':
                            if str(data['image_field'].name).lower().count('jpg') > 0 or str(data['image_field'].name).lower().count('jpeg')>0:
                                business_obj.image_field=data['image_field']
                            else:
                                return Response({"message":"please upload a valid image"},status=status.HTTP_400_BAD_REQUEST)
                        if data.get('timingfrom'):
                            business_obj.timingfrom=data['timingfrom']
                        if data.get('timingto'):
                            business_obj.timingto=data['timingto']
                        if data.get('phone_number'):
                            business_obj.phone_number=data['phone_number']
                        if data.get('email'):
                            business_obj.email=data['email']
                        business_obj.save()
                        return Response({"message":"Your Business updated successfully"},status=status.HTTP_200_OK)
                    else:
                        return Response({"message":"Your Business did not updated successfully"},status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"message":"Your are not a vendor so can not created the business, sign up as vendor in order to get access for it"},status=status.HTTP_401_UNAUTHORIZED)     
        except:
            return Response({"message":"View can not be updated"},status=status.HTTP_400_BAD_REQUEST)


class DeleteObject(APIView):
    permission_classes=[IsAuthenticated]
    def delete(self,request,slug,format=None):
        user_obj=User.objects.filter(username=request.user)[0]
        if user_obj.is_staff==True:
            business_obj=Business.objects.filter(slug=slug,user=user_obj,approved=True)
            deals_obj=Deals.objects.filter(slug=slug,user=user_obj,approved=True)
            product_obj=Product.objects.filter(slug=slug,user=user_obj,approved=True)
        else:
            business_obj=None
            deals_obj=None
            product_obj=None
        classifieds_obj=Classifieds.objects.filter(slug=slug,user=user_obj,approved=True)
        events_obj=Events.objects.filter(slug=slug,user=user_obj,approved=True)
        try:
            if business_obj!=None:
                if business_obj.exists():
                    business_obj.delete()
            if deals_obj != None:
                if deals_obj.exists():
                    deals_obj.delete()
            if product_obj != None:
                if product_obj.exists():
                    product_obj.delete()
            if classifieds_obj.exists():
                classifieds_obj.delete()
            elif deals_obj.exists():
                deals_obj.delete()
            elif events_obj.exists():
                events_obj.delete()
            else:
                return Response({"message":"No such object exists"},status=status.HTTP_404_NOT_FOUND)
            return Response({"message":"Your Object deleted Successfully"},status=status.HTTP_200_OK)
        except:
            return Response({"message":"Your object is not deleted"},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_particular_user_business(request,*args,**kwargs):
    paginator=PageNumberPagination()
    paginator.page_size=8
    user_obj=User.objects.filter(username=request.user)
    if user_obj[0].is_staff==True:
        objs=[]
        business_objs=Business.objects.filter(user=user_obj[0],approved=True).order_by('-created_at')
        if business_objs.exists():
            for i in range(len(business_objs)):
                business_obj=business_objs[i]
                data={
                    "title":business_obj.title,
                    "description":business_obj.description[0:30],
                    "type":"business",
                    "image_field":business_obj.image_field.url,
                    "category":business_obj.category,
                    "website_url":business_obj.website_url,
                    "location":business_obj.location,
                    "timingfrom":business_obj.timingfrom,
                    "timingto":business_obj.timingto,
                    "slug":business_obj.slug,
                    'created_at':business_obj.created_at,
                    'phone_number':business_obj.phone_number,
                    'email':business_obj.email
                }
                objs.append(data)
        result_page=paginator.paginate_queryset(objs,request)
        return paginator.get_paginated_response(result_page)
    else:
        return Response({"message":"user is not a vendor"},status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_particular_user_classifieds(request,*args,**kwargs):
    paginator=PageNumberPagination()
    paginator.page_size=8
    user_obj=User.objects.filter(username=request.user)
    objs=[]
    classified_objs=Classifieds.objects.filter(user=user_obj[0],approved=True).order_by('-created_at')
    if classified_objs.exists():
        for i in range(len(classified_objs)):
            classified_obj=classified_objs[i]
            data={
                "title":classified_obj.title,
                "description":classified_obj.description[0:30],
                "type":"classifieds",
                "image_field":classified_obj.image_field.url,
                "category":classified_obj.category,
                "slug":classified_obj.slug,
                'created_at':classified_obj.created_at,
                'phone_number':classified_obj.phone_number,
                'email':classified_obj.email
            }
            objs.append(data)
    result_page=paginator.paginate_queryset(objs,request)
    return paginator.get_paginated_response(result_page)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_particular_user_events(request,*args,**kwargs):
    paginator=PageNumberPagination()
    paginator.page_size=8
    user_obj=User.objects.filter(username=request.user)
    objs=[]
    event_objs=Events.objects.filter(user=user_obj[0],approved=True).order_by('-created_at')
    if event_objs.exists():
        for i in range(len(event_objs)):
            event_obj=event_objs[i]
            data={
                "title":event_obj.title,
                "description":event_obj.description[0:30],
                "type":"events",
                "image_field":event_obj.image_field.url,
                "category":event_obj.category,
                "slug":event_obj.slug,
                'created_at':event_obj.created_at,
                'phone_number':event_obj.phone_number,
                'email':event_obj.email
            }
            objs.append(data)
    result_page=paginator.paginate_queryset(objs,request)
    return paginator.get_paginated_response(result_page)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_particular_user_deals(request,*args,**kwargs):
    paginator=PageNumberPagination()
    paginator.page_size=8
    user_obj=User.objects.filter(username=request.user)
    if user_obj[0].is_staff==True:
        objs=[]
        deal_objs=Deals.objects.filter(user=user_obj[0],approved=True).order_by('-created_at')
        if deal_objs.exists():
            for i in range(len(deal_objs)):
                deal_obj=deal_objs[i]
                data={
                    "title":deal_obj.title,
                    "description":deal_obj.description[0:30],
                    "type":"deals",
                    "image_field":deal_obj.image_field.url,
                    "timingfrom":deal_obj.datefrom,
                    "timingto":deal_obj.dateto,
                    "slug":deal_obj.slug,
                    "business_name":deal_obj.business_name.title,
                    "is_open":deal_obj.is_open,
                    "is_active":deal_obj.active,
                    'created_at':deal_obj.created_at,
                    'phone_number':deal_obj.phone_number,
                    'email':deal_obj.email
                }
                objs.append(data)
        result_page=paginator.paginate_queryset(objs,request)
        return paginator.get_paginated_response(result_page)
    else:
        return Response({"message":"user is not a vendor"},status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_particular_user_products(request,*args,**kwargs):
    paginator=PageNumberPagination()
    paginator.page_size=8
    user_obj=User.objects.filter(username=request.user)
    if user_obj[0].is_staff==True:
        objs=[]
        product_objs=Product.objects.filter(user=user_obj[0],approved=True).order_by('-created_at')
        if product_objs.exists():
            for i in range(len(product_objs)):
                product_obj=product_objs[i]
                data={
                    "title":product_obj.title,
                    "description":product_obj.description[0:30],
                    "type":"products",
                    "image_field":product_obj.image_field.url,
                    "slug":product_obj.slug,
                    "business_name":product_obj.business.title,
                    'created_at':product_obj.created_at
                }
                objs.append(data)
        result_page=paginator.paginate_queryset(objs,request)
        return paginator.get_paginated_response(result_page)
    else:
        return Response({"message":"user is not a vendor"},status=status.HTTP_401_UNAUTHORIZED)

class ClassifiedUpdateView(APIView):
    permission_classes=[IsAuthenticated]
    def patch(self,request,slug,format=None):
            serializer=ClassifiedUpdateSerializer(data=request.data,context={'slug':slug,'image_field':request.data['image_field'],'username':request.user})
            if serializer.is_valid(raise_exception=True):
                return Response({"message":"Your classified is updated successfully"},status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class DealsUpdateView(APIView):
    permission_classes=[IsAuthenticated]
    def patch(self,request,slug,format=None):
        user_obj=User.objects.filter(username=request.user)
        if user_obj.exists():
            user_obj=user_obj[0]
            if user_obj.is_staff==True:
                serializer=DealsUpdateSerializer(data=request.data,context={'slug':slug,'image_field':request.data.get('image_field'),'username':request.user})
                if serializer.is_valid(raise_exception=True):
                    return Response({"message":"Your Deal is updated successfully"},status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message":"You are not a vendor"},status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"message":"You are not authenticated"},status=status.HTTP_401_UNAUTHORIZED)

class EventsUpdateView(APIView):
    permission_classes=[IsAuthenticated]
    def patch(self,request,slug,format=None):
            serializer=EventsUpdateSerializer(data=request.data,context={'slug':slug,'image_field':request.data.get('image_field'),'username':request.user})
            if serializer.is_valid(raise_exception=True):
                return Response({"message":"Your Event is updated successfully"},status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class ProductUpdateView(APIView):
    permission_classes=[IsAuthenticated]
    def patch(self,request,slug,format=None):
        user_obj=User.objects.filter(username=request.user)
        if user_obj.exists():
            user_obj=user_obj[0]
            if user_obj.is_staff==True:
                serializer=ProductsUpdateSerializer(data=request.data,context={'slug':slug,"image_field":request.data.get('image_field'),'username':request.user})
                if serializer.is_valid(raise_exception=True):
                    return Response({"message":"Your Product is updated successfully"},status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message":"You are not a vendor"},status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"message":"You are not authenticated"},status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated,IsAdminUser])
def get_users_list(request,*args,**kwargs):
    user_obj=User.objects.filter(username=request.user)
    if user_obj.exists():
        if user_obj[0].is_superuser==True:
            paginator=PageNumberPagination()
            paginator.page_size=8
            data=list(User.objects.all().order_by('username').values_list('username','first_name','last_name','email','date_joined'))
            result_page=paginator.paginate_queryset(data,request)
            return paginator.get_paginated_response(result_page)
        else:
            return Response({"message":"You are not admin"},status=status.HTTP_200_OK)
    else:
        return Response({"message":"User does not exists"},status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated,IsAdminUser])
def approveitemsview(request,*args,**kwargs):
    slug=request.data.get('slug')
    approved=request.data.get('approved')
    approve_review=request.data.get('approve_reviews')
    if approved=='true':
        approved=True
    else:
        approved=False
    if approve_review=='true':
        approve_review=True
    else:
        approve_review=False
    business_obj=Business.objects.filter(slug=slug)
    classified_obj=Classifieds.objects.filter(slug=slug)
    deals_obj=Deals.objects.filter(slug=slug)
    events_obj=Events.objects.filter(slug=slug)
    product_obj=Product.objects.filter(slug=slug)
    if business_obj.exists():
        business_create_obj=business_obj[0]
        business_create_obj.approved=approved
        business_create_obj.approve_reviews=approve_review
        business_create_obj.save()
    elif classified_obj.exists():
        classified_create_obj=classified_obj[0]
        classified_create_obj.approved=approved
        classified_create_obj.approve_reviews=approve_review
        classified_create_obj.save()
    elif deals_obj.exists():
        deals_create_obj=deals_obj[0]
        deals_create_obj.approved=approved
        deals_create_obj.approve_reviews=approve_review
        deals_create_obj.save()
    elif events_obj.exists():
        events_create_obj=events_obj[0]
        events_create_obj.approved=approved
        events_create_obj.approve_reviews=approve_review
        events_create_obj.save()
    elif product_obj.exists():
        product_create_obj=product_obj[0]
        product_create_obj.approved=approved
        product_create_obj.save()
    else:
        return Response({"message":"No such object exists"},status=status.HTTP_404_NOT_FOUND)
    if approved==True and approve_review==True:
        return Response({"message":"Your business approved successfully"},status=status.HTTP_200_OK)
    if approved==True and approve_review==False:
       return Response({"message":"Your business is approved but still not approved for reviews"},status=status.HTTP_200_OK)
    if approved==False and approve_review==True:
        return Response({"message":"Your business is approved for reviews"},status=status.HTTP_200_OK)
    elif approved==False and approve_review==False:
        return Response({"message":"your business did not approved"},status=status.HTTP_202_ACCEPTED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_multiple_locations(request,*args,**kwargs):
    user_obj=User.objects.filter(username=request.user)
    business_slug=request.data.get('business_slug')
    location_slug=request.data.get("location_slug")
    business_obj=Business.objects.filter(slug=business_slug,approved=True)
    if user_obj.exists():
        if user_obj[0].is_staff==True:
            address=request.data.get('address')
            city=request.data.get('city')
            country=request.data.get('country')
            if address and city and country:
                location=f"{address},{city},{country}"
            else:
                location=None
            timingfrom=request.data.get('timingfrom')[0:2]
            timingto=request.data.get('timingto')[0:2]
            if request.data.get('timingfrom') and request.data.get('timingto'):
                try:
                    int(timingfrom)
                    int(timingto)
                except:
                    return Response({"message":"provide the valid time"},status=status.HTTP_400_BAD_REQUEST)
            confirm_obj=MultipleLocations.objects.filter(slug=location_slug)
            if confirm_obj.exists():
                location_update_obj=confirm_obj[0]
                if location:
                    location_update_obj.location=location
                if request.data.get('timingfrom') and request.data.get('timingto'):
                    location_update_obj.timingfrom=request.data.get('timingfrom')
                    location_update_obj.timingto=request.data.get('timingto')
                location_update_obj.save()
                return Response({"message":"Your location updated successfully"},status=status.HTTP_200_OK)
            else:
                if business_obj.exists():
                        multiple_obj_create=MultipleLocations.objects.create(
                            business=business_obj[0],
                            location=location,
                            timingfrom=request.data.get('timingfrom'),
                            timingto=request.data.get('timingto')
                        )
                        multiple_obj_create.save()
                        return Response({"message":"Your location added successfully"},status=status.HTTP_200_OK)
                else:
                    return Response({"message":"Business does not exists"},status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"message":"You are not vendor"},status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({"message":"user does not exists"},status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_particular_business_multiple_locations(request,*args,**kwargs):
            slug=request.GET.get('slug')
            user_obj=User.objects.filter(username=request.user)
            objs=[]
            paginator=PageNumberPagination()
            paginator.page_size=8
            business_obj=Business.objects.filter(slug=slug,approved=True)
            if business_obj.exists():
                mulitple_locations=MultipleLocations.objects.filter(business=business_obj[0])
                if mulitple_locations.exists():
                    for i in range(len(mulitple_locations)):
                        data={
                            'business':mulitple_locations[i].business.title,
                            'location':mulitple_locations[i].location,
                            'timingfrom':mulitple_locations[i].timingfrom,
                            'timingto':mulitple_locations[i].timingto,
                            'slug':mulitple_locations[i].slug,
                            'type':'locations',
                        }
                        objs.append(data)
                    result_page=paginator.paginate_queryset(objs,request)
                    return paginator.get_paginated_response(result_page)
                else:
                    return Response({"message":"No such object exists"},status=status.HTTP_200_OK)
            return Response({"message":"No such object exists"},status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletelocations(request,slug,*args,**kwargs):
    user_obj=User.objects.filter(username=request.user)
    if user_obj.exists():
        if user_obj[0].is_staff==True:
            multiple_location_obj=MultipleLocations.objects.filter(slug=slug)
            if multiple_location_obj.exists():
                multiple_location_obj.delete()
                return Response({"message":"location deleted successfully"},status=status.HTTP_200_OK)
            else:
                return Response({"message":"Location does not exists"},status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"message":"User is not vendor"},status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"message":"No such user exists"},status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_particular_business_products(request,*args,**kwargs):
    slug=request.GET.get('slug')
    objs=[]
    paginator=PageNumberPagination()
    paginator.page_size=8
    business_obj=Business.objects.filter(slug=slug,approved=True)
    if business_obj.exists():
        products=Product.objects.filter(business=business_obj[0],approved=True)
        if products.exists():
            for i in range(len(products)):
                data={
                    "business":products[i].business.title,
                    "image_field":products[i].image_field.url,
                    "title":products[i].title,
                    "description":products[i].description,
                    "slug":products[i].slug,
                    "price":products[i].price   
                    }
                objs.append(data)
            result_page=paginator.paginate_queryset(objs,request)
            return paginator.get_paginated_response(result_page)
        else:
            return Response({"message":"No product exists"},status=status.HTTP_200_OK)
    else:
        return Response({"message":"No business exists"},status=status.HTTP_200_OK)

@api_view(['GET'])
def get_particular_business_deals(request,*args,**kwargs):
    slug=request.GET.get('slug')
    business_obj=Business.objects.filter(slug=slug,approved=True)
    if business_obj.exists():
        paginator=PageNumberPagination()
        paginator.page_size=8
        deals_objs=Deals.objects.filter(business_name=business_obj[0],approved=True)
        objs=[]
        if deals_objs.exists():
            for i in range(len(deals_objs)):
                data={
                    'business':deals_objs[i].business_name.title,
                    'title':deals_objs[i].title,
                    'description':deals_objs[i].description,
                    'image_field':deals_objs[i].image_field.url,
                    'timingfrom':deals_objs[i].datefrom,
                    'timingto':deals_objs[i].dateto,
                    'slug':deals_objs[i].slug,
                    'active':deals_objs[i].active,
                    "rate":deals_objs[i].rate,
                    "rate_count":deals_objs[i].rate_count
                }
                objs.append(data)
            result_page=paginator.paginate_queryset(objs,request)
            return paginator.get_paginated_response(result_page)
        else:
            return Response({"message":"Deal does not exists"},status=status.HTTP_200_OK)
    else:
        return Response({"message":"Business does not exists"},status=status.HTTP_200_OK)

@api_view(['GET'])
def get_items_by_slug(request,*args,**kwargs):
    slug=request.GET.get('slug')
    paginator=PageNumberPagination()
    paginator.page_size=10
    business_obj=Business.objects.filter(slug=slug,approved=True)
    deals_obj=Deals.objects.filter(slug=slug,approved=True)
    events_obj=Events.objects.filter(slug=slug,approved=True)
    classifieds_obj=Classifieds.objects.filter(slug=slug,approved=True)
    if business_obj.exists():
        business_objs=Business.objects.filter(approved=True).exclude(slug=slug)
        objs=[]
        for i in range(len(business_objs)):
            data={
                'title':business_objs[i].title,
                'description':business_objs[i].description,
                'image_field':business_objs[i].image_field.url,
                'slug':business_objs[i].slug,
                'website_url':business_objs[i].website_url,
                'location':business_objs[i].location,
                'timingfrom':business_objs[i].timingfrom,
                'timingto':business_objs[i].timingto,
                'approved':business_objs[i].approved,
                'created_at':business_objs[i].created_at,
                "rate":business_objs[i].rate,
                "rate_count":business_objs[i].rate_count
            }
            objs.append(data)
        result_page=paginator.paginate_queryset(objs,request)
        return paginator.get_paginated_response(result_page)
    elif deals_obj.exists():
        objs=[]
        deals_objs=Deals.objects.filter(approved=True).exclude(slug=slug)
        for i in range(len(deals_objs)):
            data={
                'business':deals_objs[i].business_name.title,
                'title':deals_objs[i].title,
                'description':deals_objs[i].description,
                'image_field':deals_objs[i].image_field.url,
                'timingfrom':deals_objs[i].datefrom,
                'timingto':deals_objs[i].dateto,
                'slug':deals_objs[i].slug,
                'active':deals_objs[i].active,
                "rate":deals_objs[i].rate,
                "rate_count":deals_objs[i].rate_count
            }
            objs.append(data)
        result_page=paginator.paginate_queryset(objs,request)
        return paginator.get_paginated_response(result_page)
    elif events_obj.exists():
        events_objs=Events.objects.filter(approved=True).exclude(slug=slug)
        objs=[]
        for i in range(len(events_objs)):
            data={
                "title":events_objs[i].title,
                "description":events_objs[i].description,
                "slug":events_objs[i].slug,
                "approved":events_objs[i].approved,
                "rate":events_objs[i].rate,
                "rate_count":events_objs[i].rate_count,
                "image_field":events_objs[i].image_field.url
            }
            objs.append(data)
        result_page=paginator.paginate_queryset(objs,request)
        return paginator.get_paginated_response(result_page)
    elif classifieds_obj.exists():
        classifieds_objs=Classifieds.objects.filter(approved=True).exclude(slug=slug)
        objs=[]
        for i in range(len(classifieds_objs)):
            data={
                "title":classifieds_objs[i].title,
                "description":classifieds_objs[i].description,
                "slug":classifieds_objs[i].slug,
                "approved":classifieds_objs[i].approved,
                "rate":classifieds_objs[i].rate,
                "rate_count":classifieds_objs[i].rate_count,
                "image_field":classifieds_objs[i].image_field.url
            }
            objs.append(data)
        result_page=paginator.paginate_queryset(objs,request)
        return paginator.get_paginated_response(result_page)
    else:
        return Response({"message":"No such object exists"},status=status.HTTP_200_OK)

@api_view(['POST'])
def search_by_filter(request,*args,**kwargs):
    city=request.data.get('city')
    address=request.data.get('address')
    rate_1=request.data.get('rate_1')
    rate_2=request.data.get('rate_2')
    rate_3=request.data.get('rate_3')
    rate_4=request.data.get('rate_4')
    rate_5=request.data.get('rate_5')
    if int(rate_1)==0:
        rate_1=1
    if int(rate_2)==0:
        rate_2=1
    if int(rate_3)==0:
        rate_3=1
    if int(rate_4)==0:
        rate_4=1
    if int(rate_5)==0:
        rate_5=1
    paginator=PageNumberPagination()
    paginator.page_size=8
    business_lookups=Q(location__icontains=city) | Q(location__icontains=address) | Q(rate__icontains=rate_1) | Q(rate__icontains=rate_2) | Q(rate__icontains=rate_3) | Q(rate__icontains=rate_4) | Q(rate__icontains=rate_5)
    other_lookups=Q(rate__icontains=rate_1) | Q(rate__icontains=rate_2) | Q(rate__icontains=rate_3) | Q(rate__icontains=rate_4) | Q(rate__icontains=rate_5)
    deals_lookups=Q(rate__icontains=rate_1) | Q(rate__icontains=rate_2) | Q(rate__icontains=rate_3) | Q(rate__icontains=rate_4) | Q(rate__icontains=rate_5)
    business_objs=Business.objects.filter(business_lookups,approved=True)
    classifieds_objs=Classifieds.objects.filter(other_lookups,approved=True)
    events_objs=Events.objects.filter(other_lookups,approved=True)
    deals_objs=Deals.objects.filter(deals_lookups,approved=True)
    objs=[]
    if business_objs.exists():
            for i in range(len(business_objs)):
                obj_get=Business.objects.get(id=business_objs[i].id)
                dict_obj={
                    "title":obj_get.title,
                    "type":"business",
                    "description":obj_get.description[0:30],
                    "image_field":obj_get.image_field.url,
                    "category":obj_get.category,
                    "website_url":obj_get.website_url,
                    "location":obj_get.location,
                    "timingfrom":obj_get.timingfrom,
                    "timingto":obj_get.timingto,
                    "slug":obj_get.slug,
                    "rate_count":obj_get.rate_count,
                    "rate":obj_get.rate
                }
                objs.append(dict_obj)
    if events_objs.exists():
            for i in range(len(events_objs)):
                obj_get=Events.objects.get(id=events_objs[i].id)
                dict_obj={
                    "title":obj_get.title,
                    "type":"events",
                    "description":obj_get.description[0:30],
                    "image_field":obj_get.image_field.url,
                    "category":obj_get.category,
                    "slug":obj_get.slug,
                    "rate":obj_get.rate,
                    "rate_count":obj_get.rate_count
                }
                objs.append(dict_obj)
    if classifieds_objs.exists():
            for i in range(len(classifieds_objs)):
                obj_get=Classifieds.objects.get(id=classifieds_objs[i].id)
                dict_obj={
                    "title":obj_get.title,
                    "type":"classifieds",
                    "description":obj_get.description[0:30],
                    "image_field":obj_get.image_field.url,
                    "category":obj_get.category,
                    "slug":obj_get.slug,
                    "rate":obj_get.rate,
                    "rate_count":obj_get.rate_count
                }
                objs.append(dict_obj)
    if deals_objs.exists():
            for i in range(len(deals_objs)):
                obj_get=Deals.objects.get(id=deals_objs[i].id)
                dict_obj={
                    "title":obj_get.title,
                    "type":"deals",
                    "description":obj_get.description[0:30],
                    "image_field":obj_get.image_field.url,
                    "timingfrom":obj_get.datefrom,
                    "timingto":obj_get.dateto,
                    "business_name":obj_get.business_name.title,
                    "slug":obj_get.slug,
                    "is_open":obj_get.is_open,
                    "active":obj_get.active,
                    "rate_count":obj_get.rate_count,
                    "rate":obj_get.rate
                }
                objs.append(dict_obj)
    result_page=paginator.paginate_queryset(objs,request)
    return paginator.get_paginated_response(result_page)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_account(request,*args,**kwargs):
    username=request.data.get('username')
    password=request.data.get('password')
    if username and password:
        check_email=User.objects.filter(email=username)
        if check_email.exists():
            username=check_email[0].username
            user=auth.authenticate(username=username,password=password)
            if user is not None:
                check_email.delete()
                return Response({"message":"Your account is deleted"},status=status.HTTP_200_OK)
            else:
                return Response({"message":"user is not authenitcated"},status=status.HTTP_401_UNAUTHORIZED)
        else:
            user_obj=User.objects.filter(username=username)
            if user_obj.exists():
                user=auth.authenticate(username=username,password=password)
                if user is not None:
                    user_obj.delete()
                    return Response({"message":"Your account is deleted"},status=status.HTTP_200_OK)
                else:
                    return Response({"message":"user is not authenitcated"},status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({"message":"No such user"},status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"message":"Provide username or email and a valid password"},status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_reviews(request,*args,**kwargs):
    slug=request.data.get('slug')
    deals_rating_obj=DealsRating.objects.filter(slug=slug)
    business_rating_obj=BusinessRating.objects.filter(slug=slug)
    events_rating_obj=EventsRating.objects.filter(slug=slug)
    classifieds_rating_obj=ClassifiedsRating.objects.filter(slug=slug)
    if deals_rating_obj.exists():
        deals_rating_obj.delete()
    elif business_rating_obj.exists():
        business_rating_obj.delete()
    elif events_rating_obj.exists():
        events_rating_obj.delete()
    elif classifieds_rating_obj.exists():
        classifieds_rating_obj.delete()
    else:
        return Response({"message":"No such object exists"},status=status.HTTP_200_OK)
    return Response({"message":"Your Review deleted Successfully"},status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_favourites(request,*args,**kwargs):
    slug=request.data.get('slug')
    title=request.data.get('title')
    description=request.data.get('description')
    image_url=request.data.get('image_url')
    user=User.objects.filter(username=request.user)
    check_obj=Favourites.objects.filter(item_slug=slug)
    if check_obj.exists():
        update_obj=check_obj[0]
        update_obj.save()
        return Response({"message":"Favourite updated successfully"},status=status.HTTP_200_OK)
    else:
        favourite_obj=Favourites.objects.create(
            user=user[0],
            item_title=title,
            item_slug=slug,
            item_description=description,
            image_url=image_url
        )
        favourite_obj.save()
        return Response({"message":"Favourite added successfully"},status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def displayfavouritelist(request,*args,**kwargs):
    user=User.objects.filter(username=request.user)
    favourite_objs=list(Favourites.objects.filter(user=user[0]).order_by('-created_at').values())
    paginator=PageNumberPagination()
    paginator.page_size=8
    result_page=paginator.paginate_queryset(favourite_objs,request)
    return paginator.get_paginated_response(result_page)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_contact_form(request,*args,**kwargs):
    email=request.data.get('email')
    vendor_name=request.data.get('vendor_name')
    number=request.data.get('phone_number')
    vendor_email=request.data.get('vendor_email')
    details=request.data.get('details')
    html_content = f'<h1>Hello {vendor_name}</h1><br><p>This user wants to contact you please note the details provided by the client</p><br><p>{details}</p><br><h3>Send by:{email}</h3><h3>User Contact Number:{number}</h3>'
    if email and details and vendor_email and number:
        subject="Contact Vendor"
        body=details
        msg=EmailMultiAlternatives(subject, body, 'hashimmuhammad844@gmail.com', [vendor_email])
        msg.attach_alternative(html_content,"text/html")
        msg.send()
        return Response({"message":"email send successfully"},status=status.HTTP_200_OK)
    else:
        return Response({"message":"Provide the valid credentials"},status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_favourites(request,*args,**kwargs):
    item_slug=request.data.get('slug')
    favourite_ojb=Favourites.objects.filter(item_slug=item_slug)
    if favourite_ojb.exists():
        favourite_ojb.delete()
        return Response({"message":"Object removed from favourites successfully"},status=status.HTTP_200_OK)
    else:
        return Response({"message":"Object can not be removed no such object exists"},status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated,IsAdminUser])
def deletebusienssbyadmin(request,slug,*args,**kwargs):
    business_obj=Business.objects.filter(slug=slug)
    classified_obj=Classifieds.objects.filter(slug=slug)
    deals_obj=Deals.objects.filter(slug=slug)
    product_obj=Product.objects.filter(slug=slug)
    event_obj=Events.objects.filter(slug=slug)
    if business_obj.exists():
        vendor_email=business_obj[0].email
        item_name="Business"
        business_obj.delete()
    elif classified_obj.exists():
        vendor_email=classified_obj[0].email
        item_name="Classified"
        classified_obj.delete()
    elif event_obj.exists():
        vendor_email=event_obj[0].email
        item_name="Event"
        event_obj.delete()
    elif deals_obj.exists():
        vendor_email=deals_obj[0].email
        item_name="Deal"
        deals_obj.delete()
    elif product_obj.exists():
        vendor_email=product_obj[0].business.email
        item_name="Product"
        product_obj.delete()
    else:
        return Response({"message":"No such object exists"},status=status.HTTP_404_NOT_FOUND)
    html_content = f'<h1>Hello</h1><br><p>It is to inform you that your {item_name} is deleted by the admin due to some issues</p><br>'
    subject=f"{item_name} Deleted"
    body=f"This {item_name} is deleted"
    msg=EmailMultiAlternatives(subject,body,'hashimmuhammad844@gmail.com', [vendor_email])
    msg.attach_alternative(html_content,"text/html")
    msg.send()
    return Response({"message":"Email sent successfully and item is also deleted"},status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated,IsAdminUser])
def create_categories_by_admin(request,*args,**kwargs):
    category_name=request.data.get('category')
    if category_name:
        category_check=Category.objects.filter(title=category_name)
        if category_check.exists():
            return Response({"message":"Category already exists"},status=status.HTTP_400_BAD_REQUEST)
        else:
            category_obj=Category.objects.create(
                title=category_name
            )
            category_obj.save()
            return Response({'message':"Category Created Successfully"},status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_user_location(request,*args,**kwargs):
    api_key="AIzaSyAQFM5Asx7HPks7kOsS3yT6DPcrWtQvzjM"
    response=requests.post(f"https://www.googleapis.com/geolocation/v1/geolocate/{api_key}")
    data=response.json()
    return Response({data},status=status.HTTP_200_OK)
    