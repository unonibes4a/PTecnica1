from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Adquisicion
from .serializers import AdquisicionSerializer

class AdquisicionViewSet(viewsets.ModelViewSet):
    queryset = Adquisicion.objects.all()
    serializer_class = AdquisicionSerializer
