# Generated by Django 4.0.4 on 2022-06-22 19:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0072_favourites_image_field_favourites_item_description_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='favourites',
            name='image_field',
        ),
        migrations.AddField(
            model_name='favourites',
            name='image_url',
            field=models.CharField(default='sgas', max_length=150),
        ),
    ]
