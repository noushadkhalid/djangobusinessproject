# Generated by Django 4.0.4 on 2022-06-15 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_remove_business_rate_remove_classifieds_rate_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='business',
            name='rate',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='classifieds',
            name='rate',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='deals',
            name='rate',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='events',
            name='rate',
            field=models.IntegerField(default=0),
        ),
    ]