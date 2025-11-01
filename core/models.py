from django.db import models
from django.contrib.auth.models import User

# --- AGENTES ---
class Agent(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="agents")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# --- CONVERSACIONES ---
class Conversation(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name="conversations", null=True, blank=True)
    external_id = models.CharField(max_length=255, blank=True)  # número de cliente o id externo
    participants = models.JSONField(default=list, blank=True)   # lista de teléfonos
    is_closed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Convo {self.id} - {self.external_id or 'sin-external'}"


# --- MENSAJES ---
class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="messages")
    sender = models.CharField(max_length=255)   # ejemplo: 'user:+519...' o 'agent:Sofía'
    text = models.TextField(blank=True)
    whatsapp_message_id = models.CharField(max_length=255, blank=True, null=True)
    media = models.JSONField(default=dict, blank=True)   # metadata del media
    status = models.CharField(max_length=50, default="pending")  # pending, sent, delivered, failed
    metadata = models.JSONField(default=dict, blank=True)
    direction = models.CharField(max_length=10, choices=(("in","in"),("out","out")))
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Msg {self.id} ({self.direction})"


# --- CLIENTES ---
class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20, unique=True)
    email = models.EmailField(blank=True, null=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    notas = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.nombre} ({self.telefono})"


# --- NUEVO: para guardar los webhooks crudos recibidos ---
class WebhookEvent(models.Model):
    """
    Guarda todo el payload recibido del webhook para depuración y análisis.
    Esto te permite ver el contenido exacto que envía WhatsApp.
    """
    event_type = models.CharField(max_length=100, blank=True)
    payload = models.JSONField(default=dict, blank=True)
    received_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"WebhookEvent {self.id} ({self.event_type or 'unknown'})"
