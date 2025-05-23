from django.shortcuts import render
from rest_framework import viewsets
from GestionTareas.models import Tarea
from GestionTareas.serializers import tarea_serializer

# Create your views here.
class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = tarea_serializer

