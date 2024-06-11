from django.urls import path
from .views import *

urlpatterns = [
    path('summarize/', SummarizeBookView.as_view(), name='summarize-book'),
    path('text-to-speech/', TextToSpeechView.as_view(), name='text-to-speech'),
]
