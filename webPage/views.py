from django.shortcuts import render_to_response
from django.views.generic import TemplateView
from django.template import RequestContext

class index(TemplateView):
    def get(self, request, *args, **kwargs):
        return render_to_response('index.html', context_instance=RequestContext(request))

class prueba(TemplateView):
    def get(self, request, *args, **kwargs):
        return render_to_response('prueba.html', context_instance=RequestContext(request))
# Create your views here.

