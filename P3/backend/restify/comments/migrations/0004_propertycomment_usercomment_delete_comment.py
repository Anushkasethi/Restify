# Generated by Django 4.1.7 on 2023-04-24 16:29

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('comments', '0003_comment_rating'),
    ]

    operations = [
        migrations.CreateModel(
            name='PropertyComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('guestName', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('dateMade', models.DateTimeField(auto_now=True)),
                ('isComment', models.BooleanField(default=True)),
                ('propId', models.IntegerField()),
                ('rating', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
            ],
        ),
        migrations.CreateModel(
            name='UserComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hostName', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('dateMade', models.DateTimeField(auto_now=True)),
                ('isComment', models.BooleanField(default=True)),
                ('rating', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('userId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commentedUser', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
    ]