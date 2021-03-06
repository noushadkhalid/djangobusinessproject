# Generated by Django 4.0.4 on 2022-05-29 07:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Business',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('image_field', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('description', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=40)),
                ('website_url', models.CharField(blank=True, max_length=200)),
                ('location', models.CharField(max_length=200)),
                ('map_link', models.CharField(max_length=300)),
                ('timingfrom', models.TimeField()),
                ('timingto', models.TimeField()),
                ('approved', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
