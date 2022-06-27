from requests import Response
from rest_framework.serializers import ModelSerializer,Serializer
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import Events,EventsRating,Classifieds,ClassifiedsRating,Business,BusinessRating,DealsRating,Deals,Product,MultipleLocations
from django.contrib.auth import authenticate, login
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import EmailMessage
class RegisterSerializer(ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
        )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    vendor_ask=serializers.BooleanField(default=False)
    class Meta:
       model = User
       fields = ['first_name', 'last_name', 'username', 'email', 'password', 'password2','vendor_ask']
       extra_kwargs = {
           'first_name': {'required': True},
           'last_name': {'required': True}
           }
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs
class LoginSerializer(Serializer):
    username=serializers.CharField(max_length=100)
    password = serializers.CharField(
        write_only=True,
        required=True,
        help_text='Leave empty if no change needed',
        style={'input_type': 'password', 'placeholder': 'Password'}
    )
       

class BusinessSerializer(ModelSerializer):
    class Meta:
        model=Business
        fields='__all__'
class ProductSerializer(ModelSerializer):
    class Meta:
        model=Product
        fields=['title','description','business','image_field','slug','created_at']
class MultipleLocationSerializer(ModelSerializer):
    class Meta:
        model=MultipleLocations
        fields='__all__'
class BusinessRatingSerializer(ModelSerializer):
    class Meta:
        model=BusinessRating
        fields='__all__'
class DealsSerializer(ModelSerializer):
    class Meta:
        model=Deals
        fields='__all__'
class DealsRatingSerializer(ModelSerializer):
    class Meta:
        model=DealsRating
        fields='__all__'
class EventsSerializer(ModelSerializer):
    class Meta:
        model=Events
        fields='__all__'
class EventsRatingSerializer(ModelSerializer):
    class Meta:
        model=EventsRating
        fields='__all__'

class ClassifiedsSerializer(ModelSerializer):
    class Meta:
        model=Classifieds
        fields='__all__'
class ClassifiedsRatingSerializer(ModelSerializer):
    class Meta:
        model=ClassifiedsRating
        fields='__all__'

class UserChangePasswordSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    password2=serializers.CharField(max_length=255,style={"input-type":'password'},write_only=True)
    class Meta:
        fields=['password','password2']
    def validate(self, attrs):
        password=attrs.get('password')
        password2=attrs.get('password2')
        user=self.context.get("user")
        if password!=password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        else:
            user.set_password(password)
            user.save()
            return attrs

class SendPasswordResetEmailViewSerializer(serializers.Serializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        fields=['email']
    def validate(self, attrs):
        email=attrs.get('email')
        request_domain=self.context.get('request_domain')
        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            uid=urlsafe_base64_encode(force_bytes(user.id))
            print("Encoded UID",uid)
            token=PasswordResetTokenGenerator().make_token(user)
            print("token",token)
            link=f'http://localhost:8000/reset/user/'+uid+'/'+token
            print("password reset link",link)
            # Send Email
            body="Click the following link to reset your password "+link
            send_email=EmailMessage(
                subject="Reset Your Password",
                body=body,
                from_email="hashimmuhammad844@gmail.com",
                to=[user.email]
            )
            send_email.send()
            return attrs
        else:
            raise serializers.ValidationError("email does not exists")

class UserPasswordResetSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    password2=serializers.CharField(max_length=255,style={"input-type":'password'},write_only=True)
    class Meta:
        fields=['password','password2']
    def validate(self, attrs):
        try:
            password=attrs.get('password')
            password2=attrs.get('password2')
            uid=self.context.get("uid")
            token=self.context.get("token")
            if password!=password2:
                raise serializers.ValidationError("Password and Confirm Password doesn't match")
            else:
                _id=smart_str(urlsafe_base64_decode(uid))
                user=User.objects.filter(id=_id)
                if user.exists():
                    if not PasswordResetTokenGenerator().check_token(user[0],token):
                        raise serializers.ValidationError("Token is not valid or expired")
                    else:
                        user[0].set_password(password)
                        user[0].save()
                        return attrs
                else:
                    raise serializers.ValidationError("No such user exists")
        except DjangoUnicodeDecodeError as Identifier:
            PasswordResetTokenGenerator().check_token(user[0],token)
            raise serializers.ValidationError("Token is not valid or expired")


class ClassifiedUpdateSerializer(serializers.Serializer):
    title=serializers.CharField(max_length=255,required=False,write_only=True,style={'input-type':'text'})
    description=serializers.CharField(max_length=255,required=False,write_only=True,style={'input-type':'text'})
    phone_number=serializers.CharField(max_length=15,required=False)
    email=serializers.EmailField(required=False)
    class Meta:
        model=Classifieds
        fields=['title','description','phone_number','email']
    def validate(self, attrs):
        title=attrs.get('title')
        description=attrs.get('description')
        phone_number=attrs.get('phone_number')
        email=attrs.get('email')
        image_field=self.context.get('image_field')
        slug=self.context.get('slug')
        username=self.context.get('username')
        user_obj=User.objects.filter(username=username)
        classified_obj=Classifieds.objects.filter(slug=slug,user=user_obj[0],approved=True)
        if classified_obj.exists():
            classified_create_obj=classified_obj[0]
            if title:
                classified_create_obj.title=title
            if phone_number:
                classified_create_obj.phone_number=phone_number
            if email:
                classified_create_obj.email=email
            if description:
                classified_create_obj.description=description
            if image_field!='undefined':
                if str(image_field.name).lower().count('jpg') > 0 or str(image_field.name).lower().count('jpeg')>0:
                    classified_create_obj.image_field=image_field
                else:
                    raise serializers.ValidationError("Please Upload a valid image")
            classified_create_obj.save()
            return attrs
        else:
            raise serializers.ValidationError("No such object exists")

class EventsUpdateSerializer(serializers.Serializer):
    title=serializers.CharField(max_length=255,required=False,write_only=True,style={'input-type':'text'})
    description=serializers.CharField(max_length=255,required=False,write_only=True,style={'input-type':'text'})
    phone_number=serializers.CharField(max_length=15,required=False)
    email=serializers.EmailField(required=False)
    class Meta:
        model=Events
        fields=['title','description','phone_number','email']
    def validate(self, attrs):
        title=attrs.get('title')
        description=attrs.get('description')
        phone_number=attrs.get('phone_number')
        email=attrs.get('email')
        image_field=self.context.get('image_field')
        slug=self.context.get('slug')
        username=self.context.get('username')
        user_obj=User.objects.filter(username=username)
        event_obj=Events.objects.filter(slug=slug,user=user_obj[0],approved=True)
        if event_obj.exists():
            event_create_obj=event_obj[0]
            if title:
                event_create_obj.title=title
            if description:
                event_create_obj.description=description
            if phone_number:
                event_create_obj.phone_number=phone_number
            if email:
                event_create_obj.email=email
            if image_field!='undefined':
                if str(image_field.name).lower().count('jpg') > 0 or str(image_field.name).lower().count('jpeg')>0:
                        event_create_obj.image_field=image_field
                else:
                    raise serializers.ValidationError("Please Upload a valid image")
            event_create_obj.save()
            return attrs
        else:
            raise serializers.ValidationError("No such object exists")


class DealsUpdateSerializer(serializers.Serializer):
    title=serializers.CharField(max_length=255,required=False,write_only=True,style={'input-type':'text'})
    description=serializers.CharField(max_length=255,required=False,write_only=True,style={'input-type':'text'})
    timingfrom=serializers.CharField(max_length=255,required=False,write_only=True,style={'input-type':'text'})
    timingto=serializers.CharField(max_length=255,required=False,write_only=True,style={'input-type':'text'})
    is_open=serializers.BooleanField(required=False)
    active=serializers.BooleanField(required=False)
    phone_number=serializers.CharField(max_length=15,required=False)
    email=serializers.EmailField(required=False)
    class Meta:
        model=Deals
        fields=['title','description','timingfrom','timingto','is_open','active','phone_number','email']
    def validate(self, attrs):
        title=attrs.get('title')
        description=attrs.get('description')
        timingfrom=attrs.get('timingfrom')
        phone_number=attrs.get('phone_number')
        email=attrs.get('email')
        timingto=attrs.get('timingto')
        if timingfrom and timingto:
            try:
                int(timingfrom[0:2])
                int(timingto[0:2])
            except:
                raise serializers.ValidationError("provide the valid time")
        is_open=attrs.get('is_open')
        active=attrs.get('active')
        print(active)
        image_field=self.context.get('image_field')
        username=self.context.get('username')
        user_obj=User.objects.filter(username=username)
        slug=self.context.get('slug')
        deals_obj=Deals.objects.filter(slug=slug,user=user_obj[0],approved=True)
        if deals_obj.exists():
            deals_create_obj=deals_obj[0]
            if title:
                deals_create_obj.title=title
            if description:
                deals_create_obj.description=description
            if timingfrom:
                deals_create_obj.datefrom=timingfrom
            if timingto:
                deals_create_obj.dateto=timingto
            if email:
                deals_create_obj.email=email
            if phone_number:
                deals_create_obj.phone_number=phone_number
            if is_open:
                deals_create_obj.is_open=is_open
            deals_create_obj.active=active
            if image_field!='undefined':
                if str(image_field.name).lower().count('jpg') > 0 or str(image_field.name).lower().count('jpeg')>0:
                    deals_create_obj.image_field=image_field
                else:
                    raise serializers.ValidationError("Please Upload a valid image")
            deals_create_obj.save()
            return attrs
        else:
            raise serializers.ValidationError("No such object exists")


class ProductsUpdateSerializer(serializers.Serializer):
    title=serializers.CharField(max_length=255,required=False,write_only=True,style={'input-type':'text'})
    description=serializers.CharField(max_length=255,required=False,write_only=True,style={'input-type':'text'})
    price=serializers.IntegerField(required=False)
    class Meta:
        model=Product
        fields=['title','description','price']
    def validate(self, attrs):
        title=attrs.get('title')
        description=attrs.get('description')
        image_field=self.context.get("image_field")
        print(image_field)
        price=attrs.get('price')
        slug=self.context.get('slug')
        username=self.context.get('username')
        user_obj=User.objects.filter(username=username)
        product_obj=Product.objects.filter(slug=slug,user=user_obj[0],approved=True)
        if product_obj.exists():
            product_create_obj=product_obj[0]
            if title:
                product_create_obj.title=title
            if description:
                product_create_obj.description=description
            if price:
                product_create_obj.price=price
            if image_field!='undefined':
                if str(image_field.name).lower().count('jpg') > 0 or str(image_field.name).lower().count('jpeg')>0:
                    product_create_obj.image_field=image_field
                else:
                    raise serializers.ValidationError("Please Upload a valid image")
            product_create_obj.save()
            return attrs
        else:
            raise serializers.ValidationError("No such object exists")


