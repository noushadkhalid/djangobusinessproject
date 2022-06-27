from email.policy import default
from django.db import models
from django.contrib.auth.models import User
import datetime
from django.dispatch import receiver
from django.utils.text import slugify
from django.db.models.signals import (
    post_save
)
import random
from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.


d = datetime.date(1997, 10, 19)

class Category(models.Model):
    title=models.CharField(max_length=100)
    def __str__(self):
        return self.title
class Business(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    title=models.CharField(max_length=100)
    image_field=models.ImageField(null=True,blank=True,upload_to="images/business/",default="images/business/hasab.jpg")
    description=models.CharField(max_length=255)
    category=models.CharField(max_length=40)
    website_url=models.CharField(max_length=200,blank=True,null=True)
    location=models.CharField(max_length=200)
    timingfrom=models.CharField(max_length=120)
    timingto=models.CharField(max_length=120)
    email=models.EmailField(max_length=25)
    phone_number=models.CharField(max_length=15)
    slug=models.SlugField(max_length=100,null=True,blank=True)
    approved=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    approve_reviews=models.BooleanField(default=False)
    rate=models.IntegerField(default=0)
    rate_count=models.IntegerField(default=0)
    def __str__(self):
        return self.title

def slugify_business_title(instance):
    slug=f"{slugify(instance.title)}-business"
    qs=Business.objects.filter(slug=slug)
    if qs.exists():
        rand_int=random.randint(300_000,500_000)
        slug=f"{slug}-{rand_int}"
        checking_again=Business.objects.filter(slug=slug)
        if checking_again.exists():
            slugify_business_title(instance)
        else:
            return slug
    else:
        return slug



@receiver(post_save,sender=Business)
def business_post_save(sender,instance,created,*args,**kwargs):
    print("instance saved")
    if not instance.slug:
        slug_value=slugify_business_title(instance)
        instance.slug=slug_value
        instance.save()
        print("slug field saved")

class Product(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    title=models.CharField(max_length=100)
    description=models.CharField(max_length=255)
    image_field=models.ImageField(null=True,blank=True,upload_to="images/products/",default="images/products/hasab.jpg")
    price=models.IntegerField()
    business=models.ForeignKey(Business,on_delete=models.CASCADE)
    approved=models.BooleanField(default=False)
    slug=models.SlugField(max_length=100,null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title

def slugify_product_title(instance):
    slug=f"{slugify(instance.title)}-product"
    qs=Product.objects.filter(slug=slug)
    if qs.exists():
        rand_int=random.randint(300_000,500_000)
        slug=f"{slug}-{rand_int}"
        checking_again=Product.objects.filter(slug=slug)
        if checking_again.exists():
            slugify_product_title(instance)
        else:
            return slug
    else:
        return slug



@receiver(post_save,sender=Product)
def product_post_save(sender,instance,created,*args,**kwargs):
    print("instance saved")
    if not instance.slug:
        slug_value=slugify_product_title(instance)
        instance.slug=slug_value
        instance.save()
        print("slug field saved")

    
class MultipleLocations(models.Model):
    location=models.CharField(max_length=200)
    business=models.ForeignKey(Business,on_delete=models.CASCADE)
    timingfrom=models.CharField(max_length=9)
    timingto=models.CharField(max_length=9)
    slug=models.SlugField(max_length=100,null=True,blank=True)
    def __str__(self):
        return str(self.id)

def slugify_location_title(instance):
    slug=f"{slugify(instance.business.title)}-locations"
    qs=MultipleLocations.objects.filter(slug=slug)
    if qs.exists():
        rand_int=random.randint(300_000,500_000)
        slug=f"{slug}-{rand_int}"
        checking_again=MultipleLocations.objects.filter(slug=slug)
        if checking_again.exists():
            slugify_location_title(instance)
        else:
            return slug
    else:
        return slug

@receiver(post_save,sender=MultipleLocations)
def locations_post_save(sender,instance,created,*args,**kwargs):
    print("instance saved")
    if not instance.slug:
        slug_value=slugify_location_title(instance)
        instance.slug=slug_value
        instance.save()
        print("slug field saved")
class BusinessRating(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    business=models.ForeignKey(Business,on_delete=models.CASCADE)
    comment=models.TextField(max_length=250)
    rate=models.IntegerField(default=0)
    created_at=models.DateTimeField(auto_now_add=True)
    slug=models.SlugField(max_length=100,null=True,blank=True)

def slugify_business_rating_title(instance):
    slug=f"{slugify(instance.business.title)}-business_rating"
    qs=BusinessRating.objects.filter(slug=slug)
    if qs.exists():
        rand_int=random.randint(300_000,500_000)
        slug=f"{slug}-{rand_int}"
        checking_again=BusinessRating.objects.filter(slug=slug)
        if checking_again.exists():
            slugify_business_rating_title(instance)
        else:
            return slug
    else:
        return slug



@receiver(post_save,sender=BusinessRating)
def business_rating_post_save(sender,instance,created,*args,**kwargs):
    print("instance saved")
    if not instance.slug:
        slug_value=slugify_business_rating_title(instance)
        instance.slug=slug_value
        instance.save()
        print("slug field saved")



class Deals(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    business_name=models.ForeignKey(Business,on_delete=models.CASCADE)
    image_field=models.ImageField(null=True,blank=True,upload_to="images/deals/",default="images/products/hasab.jpg")
    title=models.CharField(max_length=50)
    description=models.CharField(max_length=255)
    datefrom=models.CharField(max_length=20)
    dateto=models.CharField(max_length=20)
    slug=models.SlugField(max_length=100,null=True,blank=True)
    is_open=models.BooleanField(default=False)
    active=models.BooleanField(default=False)
    email=models.EmailField(max_length=25)
    phone_number=models.CharField(max_length=15)
    approved=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    approve_reviews=models.BooleanField(default=False)
    rate=models.IntegerField(default=0)
    rate_count=models.IntegerField(default=0)
    def __str__(self):
        return self.title

def slugify_deals_title(instance):
    slug=f"{slugify(instance.title)}-deals"
    qs=Deals.objects.filter(slug=slug)
    if qs.exists():
        rand_int=random.randint(300_000,500_000)
        slug=f"{slug}-{rand_int}"
        checking_again=Deals.objects.filter(slug=slug)
        if checking_again.exists():
            slugify_deals_title(instance)
        else:
            return slug
    else:
        return slug

@receiver(post_save,sender=Deals)
def deals_post_save(sender,instance,created,*args,**kwargs):
    print("instance saved")
    if not instance.slug:
        slug_value=slugify_deals_title(instance)
        instance.slug=slug_value
        instance.save()
        print("slug field saved")
class DealsRating(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    deals=models.ForeignKey(Deals,on_delete=models.CASCADE)
    comment=models.TextField(max_length=250)
    rate=models.IntegerField(default=0)
    created_at=models.DateTimeField(auto_now_add=True)
    slug=models.SlugField(max_length=100,null=True,blank=True)

def slugify_deals_rating_title(instance):
    slug=f"{slugify(instance.deals.title)}-deals_rating"
    qs=DealsRating.objects.filter(slug=slug)
    if qs.exists():
        rand_int=random.randint(300_000,500_000)
        slug=f"{slug}-{rand_int}"
        checking_again=DealsRating.objects.filter(slug=slug)
        if checking_again.exists():
            slugify_deals_rating_title(instance)
        else:
            return slug
    else:
        return slug

@receiver(post_save,sender=DealsRating)
def deals_rating_post_save(sender,instance,created,*args,**kwargs):
    print("instance saved")
    if not instance.slug:
        slug_value=slugify_deals_rating_title(instance)
        instance.slug=slug_value
        instance.save()
        print("slug field saved")


class Events(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    title=models.CharField(max_length=100)
    image_field=models.ImageField(null=True,blank=True,upload_to="images/events/",default="images/products/hasab.jpg")
    description=models.CharField(max_length=255)
    category=models.CharField(max_length=40)
    email=models.EmailField(max_length=25)
    phone_number=models.CharField(max_length=15)
    slug=models.SlugField(max_length=100,null=True,blank=True)
    approved=models.BooleanField(default=False)
    approve_reviews=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    rate=models.IntegerField(default=0)
    rate_count=models.IntegerField(default=0)
    def __str__(self):
        return self.title
def slugify_events_title(instance):
    slug=f"{slugify(instance.title)}-events"
    qs=Events.objects.filter(slug=slug)
    if qs.exists():
        rand_int=random.randint(300_000,500_000)
        slug=f"{slug}-{rand_int}"
        checking_again=Events.objects.filter(slug=slug)
        if checking_again.exists():
            slugify_events_title(instance)
        else:
            return slug
    else:
        return slug

@receiver(post_save,sender=Events)
def events_post_save(sender,instance,created,*args,**kwargs):
    print("instance saved")
    if not instance.slug:
        slug_value=slugify_events_title(instance)
        instance.slug=slug_value
        instance.save()
        print("slug field saved")
class EventsRating(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    events=models.ForeignKey(Events,on_delete=models.CASCADE)
    comment=models.TextField(max_length=250)
    rate=models.IntegerField(default=0)
    created_at=models.DateTimeField(auto_now_add=True)
    slug=models.SlugField(max_length=100,null=True,blank=True)

def slugify_events_rating_title(instance):
    slug=f"{slugify(instance.events.title)}-events_rating"
    qs=EventsRating.objects.filter(slug=slug)
    if qs.exists():
        rand_int=random.randint(300_000,500_000)
        slug=f"{slug}-{rand_int}"
        checking_again=EventsRating.objects.filter(slug=slug)
        if checking_again.exists():
            slugify_events_rating_title(instance)
        else:
            return slug
    else:
        return slug

@receiver(post_save,sender=EventsRating)
def events_rating_post_save(sender,instance,created,*args,**kwargs):
    print("instance saved")
    if not instance.slug:
        slug_value=slugify_events_rating_title(instance)
        instance.slug=slug_value
        instance.save()
        print("slug field saved")



class Classifieds(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    title=models.CharField(max_length=100)
    image_field=models.ImageField(null=True,blank=True,upload_to="images/classifieds/",default="images/products/hasab.jpg")
    description=models.CharField(max_length=255)
    email=models.EmailField(max_length=25)
    phone_number=models.CharField(max_length=15)
    category=models.CharField(max_length=40)
    slug=models.SlugField(max_length=100,null=True,blank=True)
    approved=models.BooleanField(default=False)
    approve_reviews=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    rate=models.IntegerField(default=0)
    rate_count=models.IntegerField(default=0)
    def __str__(self):
        return self.title
def slugify_classifieds_title(instance):
    slug=f"{slugify(instance.title)}-classifieds"
    qs=Classifieds.objects.filter(slug=slug)
    if qs.exists():
        rand_int=random.randint(300_000,500_000)
        slug=f"{slug}-{rand_int}"
        checking_again=Classifieds.objects.filter(slug=slug)
        if checking_again.exists():
            slugify_classifieds_title(instance)
        else:
            return slug
    else:
        return slug

@receiver(post_save,sender=Classifieds)
def classifieds_post_save(sender,instance,created,*args,**kwargs):
    print("instance saved")
    if not instance.slug:
        slug_value=slugify_classifieds_title(instance)
        instance.slug=slug_value
        instance.save()
        print("slug field saved")
class ClassifiedsRating(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    classifieds=models.ForeignKey(Classifieds,on_delete=models.CASCADE)
    comment=models.TextField(max_length=250)
    rate=models.IntegerField(default=0)
    created_at=models.DateTimeField(auto_now_add=True)
    slug=models.SlugField(max_length=100,null=True,blank=True)


def slugify_classifieds_rating_title(instance):
    slug=f"{slugify(instance.classifieds.title)}-classifieds_rating"
    qs=ClassifiedsRating.objects.filter(slug=slug)
    if qs.exists():
        rand_int=random.randint(300_000,500_000)
        slug=f"{slug}-{rand_int}"
        checking_again=ClassifiedsRating.objects.filter(slug=slug)
        if checking_again.exists():
            slugify_classifieds_rating_title(instance)
        else:
            return slug
    else:
        return slug

@receiver(post_save,sender=ClassifiedsRating)
def classifieds_rating_post_save(sender,instance,created,*args,**kwargs):
    print("instance saved")
    if not instance.slug:
        slug_value=slugify_classifieds_rating_title(instance)
        instance.slug=slug_value
        instance.save()
        print("slug field saved")


class Profile(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    image_field=models.ImageField(null=True,blank=True,upload_to="images/profile/",default="images/profile/avatar.png")
    profession=models.CharField(max_length=100,blank=True)
    gender=models.CharField(max_length=7,blank=True)
    address=models.CharField(max_length=30,blank=True)
    phone_number=PhoneNumberField(blank=True)
    date_of_birth=models.CharField(max_length=30)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.user.username

class EmailVerification(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    is_verified=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"user{self.id}"

class Favourites(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    item_slug=models.SlugField(max_length=100,unique=True)
    item_title=models.CharField(max_length=100)
    item_description=models.CharField(max_length=255)
    image_url=models.CharField(max_length=150)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"user{self.id}"