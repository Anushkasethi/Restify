# Generated by Django 4.1.7 on 2023-04-24 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='back_image',
            field=models.ImageField(blank=True, default=True, null=True, upload_to='property_cover_images/'),
        ),
        migrations.AddField(
            model_name='property',
            name='front_image',
            field=models.ImageField(blank=True, default=True, null=True, upload_to='property_cover_images/'),
        ),
    ]