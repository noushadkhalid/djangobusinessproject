# Generated by Django 4.0.4 on 2022-06-22 09:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0066_business_email_business_phone_number_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='business',
            name='email',
            field=models.EmailField(max_length=25),
        ),
        migrations.AlterField(
            model_name='business',
            name='phone_number',
            field=models.CharField(max_length=15),
        ),
        migrations.AlterField(
            model_name='classifieds',
            name='email',
            field=models.EmailField(max_length=25),
        ),
        migrations.AlterField(
            model_name='classifieds',
            name='phone_number',
            field=models.CharField(max_length=15),
        ),
        migrations.AlterField(
            model_name='deals',
            name='email',
            field=models.EmailField(max_length=25),
        ),
        migrations.AlterField(
            model_name='deals',
            name='phone_number',
            field=models.CharField(max_length=15),
        ),
        migrations.AlterField(
            model_name='events',
            name='email',
            field=models.EmailField(max_length=25),
        ),
        migrations.AlterField(
            model_name='events',
            name='phone_number',
            field=models.CharField(max_length=15),
        ),
    ]
