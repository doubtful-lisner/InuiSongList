# Generated by Django 4.0.6 on 2022-07-28 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='InuiSong',
            fields=[
                ('song_title', models.CharField(default='いぬい', max_length=50)),
                ('singer', models.CharField(default='どんどん', max_length=50)),
                ('song_url', models.CharField(default='すきになる', max_length=256, primary_key=True, serialize=False, unique=True)),
                ('upload_date', models.DateField()),
                ('video_title', models.CharField(default='!', max_length=100)),
            ],
            options={
                'ordering': ['-upload_date'],
            },
        ),
    ]
