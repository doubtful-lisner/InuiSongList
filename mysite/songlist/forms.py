from dataclasses import field
from django import forms

class AddSongForm(forms.Form):
    song_title = forms.CharField(label='曲名', max_length=50)
    singer = forms.CharField(label='歌手', max_length=50)
    song_url = forms.CharField(label='URL', max_length=256)
    upload_date = forms.DateField(label='アップロード日',)
    video_title = forms.CharField(label='配信タイトル')
