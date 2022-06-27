from django.contrib import admin
from .models import Events,EventsRating,Classifieds,ClassifiedsRating,Business,Product,MultipleLocations,BusinessRating,Deals,DealsRating,Category,Profile,EmailVerification,Favourites
# Register your models here.

admin.site.register(Business)
admin.site.register(Product)
admin.site.register(MultipleLocations)
admin.site.register(BusinessRating)
admin.site.register(Deals)
admin.site.register(DealsRating)
admin.site.register(Events)
admin.site.register(EventsRating)
admin.site.register(Classifieds)
admin.site.register(ClassifiedsRating)
admin.site.register(Category)
admin.site.register(Profile)
admin.site.register(EmailVerification)
admin.site.register(Favourites)