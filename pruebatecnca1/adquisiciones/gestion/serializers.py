from rest_framework import serializers
from .models import Adquisicion

class AdquisicionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adquisicion
        fields = '__all__'
