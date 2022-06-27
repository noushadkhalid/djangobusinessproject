# Generated by Django 4.0.4 on 2022-06-22 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0071_alter_favourites_item_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='favourites',
            name='image_field',
            field=models.ImageField(blank=True, default='images/favourites/hasab.jpg', null=True, upload_to='images/favourites/'),
        ),
        migrations.AddField(
            model_name='favourites',
            name='item_description',
            field=models.CharField(default='sdg', max_length=100),
        ),
        migrations.AddField(
            model_name='favourites',
            name='item_title',
            field=models.CharField(default='asg', max_length=100),
        ),
        migrations.AlterField(
            model_name='business',
            name='description',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='classifieds',
            name='description',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='deals',
            name='description',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='events',
            name='description',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='product',
            name='description',
            field=models.CharField(max_length=255),
        ),
    ]
