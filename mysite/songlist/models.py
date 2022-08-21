from time import timezone
from django.db import models
from django.utils import timezone

# Create your models here.
class InuiSong(models.Model):

    song_title = models.CharField(max_length=50, default='いぬい')
    singer = models.CharField( max_length=50, default='どんどん')
    song_url = models.CharField(max_length=256, primary_key=True, unique=True, default='すきになる')
    upload_date = models.DateField(default=timezone.now)
    video_title = models.CharField(max_length=100, default='!')

    class Meta:
        db_table = 'list'
        ordering = ["-upload_date"]