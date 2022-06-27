# Generated by Django 4.0.4 on 2022-06-02 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('google_auth', '0002_remove_googletoken_code_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='GoogleData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=300)),
                ('email', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.DeleteModel(
            name='GoogleToken',
        ),
    ]