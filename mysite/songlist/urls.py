from django.urls import path
from . import views # <- urls.pyが置かれているディレクトリからviews.pyをインポート

urlpatterns = [
    path('index/', views.index),
    #path('commit/', views.commit), 
    path('input/', views.input),
    path('test/', views.test),
    path('movetest/', views.movetest),
]