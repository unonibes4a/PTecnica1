from django.db import models
from simple_history.models import HistoricalRecords

class Adquisicion(models.Model):
    presupuesto = models.DecimalField(max_digits=15, decimal_places=2)
    unidad = models.CharField(max_length=100)
    tipo_bien_servicio = models.CharField(max_length=100)
    cantidad = models.PositiveIntegerField()
    valor_unitario = models.DecimalField(max_digits=15, decimal_places=2)
    valor_total = models.DecimalField(max_digits=15, decimal_places=2)
    fecha_adquisicion = models.DateField()
    proveedor = models.CharField(max_length=100)
    documentacion = models.TextField()
    activado = models.BooleanField(default=True)
    history = HistoricalRecords()

    def __str__(self):
        return f"{self.tipo_bien_servicio} - {self.proveedor}"
