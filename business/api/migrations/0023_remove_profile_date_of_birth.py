# Generated by Django 3.2.3 on 2022-06-14 13:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_alter_profile_date_of_birth'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='date_of_birth',
        ),
    ]
