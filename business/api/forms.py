from django import forms
from django.forms import Form,ModelForm
from .models import Business
from django import forms

class BusinessForm(ModelForm):
    title=forms.CharField(required=False)
    image_field=forms.ImageField(required=False)
    class Meta:
        model=Business
        fields=['title','image_field']

