# Generated by Django 4.0.6 on 2022-07-29 08:41

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('songlist', '0003_alter_inuisong_upload_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inuisong',
            name='upload_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
