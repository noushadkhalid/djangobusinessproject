# Generated by Django 4.0.4 on 2022-06-20 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0062_product_approved'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='multiplelocations',
            name='map_link',
        ),
        migrations.RemoveField(
            model_name='multiplelocations',
            name='timing',
        ),
        migrations.AddField(
            model_name='multiplelocations',
            name='timingfrom',
            field=models.CharField(default='sag', max_length=120),
        ),
        migrations.AddField(
            model_name='multiplelocations',
            name='timingto',
            field=models.CharField(default='asg', max_length=120),
        ),
    ]