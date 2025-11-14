from django.db import models
from django.contrib.auth.models import User

class Tag(models.Model):
    nombre = models.CharField(max_length=50)
    color = models.CharField(max_length=7)  
    creado_por = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre


class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    numero_whatsapp = models.CharField(max_length=20)
    email = models.EmailField(null=True, blank=True)
    creado_por = models.ForeignKey(User, on_delete=models.CASCADE, related_name="clientes")
    fecha_registro = models.DateTimeField(auto_now_add=True)

    #  RELACIÓN MUCHOS A MUCHOS
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return f"{self.nombre} ({self.numero_whatsapp})"


class Mensaje(models.Model):
    TIPOS = (
        ("enviado", "enviado"),
        ("recibido", "recibido"),
    )

    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name="mensajes")
    texto = models.TextField()
    tipo = models.CharField(max_length=10, choices=TIPOS)
    fecha = models.DateTimeField(auto_now_add=True)
    leido = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.tipo} - {self.cliente.nombre}"
