import email
from django.http import JsonResponse
from django.shortcuts import redirect, render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .credentials import REDIRECT_URI,CLIENT_ID,CLIENT_SECRET
import requests
from requests import Request
from rest_framework.decorators import api_view
from .models import GoogleData
from django.contrib.auth.models import User
from django.contrib.auth import login,authenticate
import json
# Create your views here.
class AuthUrl(APIView):
    def get(self,request,format=None):
        scopes=["email" " profile"]
        url=Request('GET','https://accounts.google.com/o/oauth2/auth',params={
            'scope':scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
            'approval_prompt':'force',
            'access_type':'offline',
        }).prepare().url
        return Response({'url':url},status=status.HTTP_200_OK)

@api_view(['GET'])
def call_back(request,*args,**kwargs):
    code = request.GET.get('code')
    error = request.GET.get('error')
    response = requests.post('https://oauth2.googleapis.com/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()
    print(response)
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')
    print(refresh_token)
    headers = {'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + access_token}
    response =requests.get("https://www.googleapis.com/oauth2/v3/userinfo",{}, headers=headers)
    print(response.json())
    data=response.json()
    user_obj=User.objects.filter(email=data["email"])
    if user_obj.exists():
        user_update_obj=user_obj[0]
        user_update_obj.email=data["email"]
        user_update_obj.save()
        request.session["email"]=data["email"]
        return Response({"message":"User updated successfully"},status=status.HTTP_200_OK)
    else:
        user_create_obj=User.objects.create(
            email=data["email"]
        )
        user_create_obj.set_password("pakistan@715")
        user_create_obj.save()
        request.session["email"]=data["email"]
        return Response({"message":"User created successfully"},status=status.HTTP_200_OK)


@api_view(['GET'])
def get_google_data(request,*args,**kwargs):
    if request.session.get("email"):
        email=request.session["email"]
        password="pakistan@715"
        user=authenticate(username=" ",password=password)
        login(request,user)
        return Response({"message":"You are authenticated"},status=status.HTTP_200_OK)
    else:
        return Response({"message":"You are not authenticated"},status=status.HTTP_200_OK)
    