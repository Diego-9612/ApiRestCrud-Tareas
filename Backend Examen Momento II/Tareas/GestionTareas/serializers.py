from GestionTareas.models import Tarea
from rest_framework import serializers

class tarea_serializer(serializers.ModelSerializer):
    class Meta:
        model=Tarea
        fields='__all__'