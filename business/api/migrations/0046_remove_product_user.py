# Generated by Django 4.0.4 on 2022-06-18 19:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0045_alter_product_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='user',
        ),
    ]