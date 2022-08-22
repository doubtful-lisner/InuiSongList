from email import message
#from msilib.schema import tables
from venv import create

from django.http import HttpResponse
from . import forms
from . import models
from django.shortcuts import redirect, render

# Create your views here.
from django.shortcuts import render

def input(request):
    if request.method == 'POST':
        
        f = forms.AddSongForm(request.POST)
        if f.is_valid():
           print('kaeya')
            
           song_title = f.cleaned_data.get('song_title')
           song_url = f.cleaned_data.get('song_url')
           upload_date = f.cleaned_data.get('upload_date')
           singer = f.cleaned_data.get('singer')
           video_title = f.cleaned_data.get('video_title')

           add_song = models.InuiSong()
           add_song.song_title = song_title
           add_song.song_url = song_url
           add_song.upload_date = upload_date
           add_song.singer = singer
           add_song.video_title = video_title
           add_song.save()
           return render(request, 'songlist/input.html')
    else:
        f = forms.AddSongForm()
        

    return render(request, 'songlist/input.html', {'song_form': f})

def index(request):
    song_list = models.InuiSong.objects.all()
    form = []
    for i in song_list:
        item = {'song_title': i.song_title, 'singer':i.singer, 'song_url': i.song_url, 'upload_date':i.upload_date, 'video_title':i.video_title}
        form.append(item)
    return render(request, 'songlist/index.html', locals())

def test(request):
    return render(request, 'songlist/test.html')

def movetest(request):
    return render(request, 'songlist/movetest.html')


