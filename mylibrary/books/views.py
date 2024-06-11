# views.py
import json
from django.http import HttpResponse, JsonResponse
from django.views import View
import fitz  # PyMuPDF
from gtts import gTTS
import requests
from transformers import pipeline
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from transformers import BartForConditionalGeneration, BartTokenizer

@method_decorator(csrf_exempt, name='dispatch')
class SummarizeBookView(View):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.tokenizer = BartTokenizer.from_pretrained('facebook/bart-large-cnn')
        self.model = BartForConditionalGeneration.from_pretrained('facebook/bart-large-cnn')

    def post(self, request):
        pdf_file = request.FILES.get('file')
        if not pdf_file:
            return JsonResponse({"error": "No file uploaded"}, status=400)

        doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text() # type: ignore

        inputs = self.tokenizer(text, return_tensors="pt", max_length=1024, truncation=True)
        summary_ids = self.model.generate(inputs.input_ids, max_length=200, min_length=50, length_penalty=2.0, num_beams=4, early_stopping=True) # type: ignore
        summary = self.tokenizer.decode(summary_ids[0], skip_special_tokens=True)

        return JsonResponse({"summary": summary})

@method_decorator(csrf_exempt, name='dispatch')
class TextToSpeechView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            text = data.get('text', '')
            if text:
                tts = gTTS(text)
                response = HttpResponse(content_type="audio/mpeg")
                tts.write_to_fp(response)
                response['Content-Disposition'] = 'attachment; filename="audio.mp3"'
                return response
            return HttpResponse(status=400, content="No text provided")
        except json.JSONDecodeError:
            return HttpResponse(status=400, content="Invalid JSON")