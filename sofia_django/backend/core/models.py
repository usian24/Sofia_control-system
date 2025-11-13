from django.db import models
from django.contrib.auth.models import User

class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    numero_whatsapp = models.CharField(max_length=20, unique=True)
    email = models.EmailField(null=True, blank=True)
    creado_por = models.ForeignKey(User, on_delete=models.CASCADE, related_name="clientes")
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} ({self.numero_whatsapp}) "

class Mensaje(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name="mensajes")
    texto = models.TextField()
    tipo = models.CharField(max_length=10, choices=[("enviado", "enviado"), ("recibido", "recibido")])
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tipo} - {self.cliente.nombre}"
