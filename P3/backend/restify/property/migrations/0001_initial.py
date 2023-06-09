# Generated by Django 4.1.7 on 2023-04-18 18:08

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
            name='Reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('check_in', models.DateTimeField()),
                ('check_out', models.DateTimeField()),
                ('num_days', models.IntegerField()),
                ('numGuests', models.IntegerField()),
                ('property_id', models.IntegerField()),
                ('status', models.CharField(max_length=180)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owned_reservations', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='booked_reservations', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=180)),
                ('prop_type', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=180)),
                ('rooms', models.IntegerField()),
                ('baths', models.IntegerField()),
                ('parking', models.IntegerField()),
                ('max_guests', models.IntegerField()),
                ('is_available', models.BooleanField(default=True)),
                ('first_day_available', models.DateTimeField(auto_now=True)),
                ('rate', models.IntegerField()),
                ('cover_image', models.ImageField(blank=True, default=True, null=True, upload_to='property_cover_images/')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ownerOfProp', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
