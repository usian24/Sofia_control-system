# Esto te permite ver / editar datos desde http://127.0.0.1:8000/admin.

from django.contrib import admin
from .models import Agent, Conversation, Message, Cliente

@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "owner", "created_at")
    search_fields = ("name",)
    list_filter = ("created_at",)

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ("id", "external_id", "agent", "is_closed", "created_at")
    search_fields = ("external_id",)
    list_filter = ("is_closed", "created_at")

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("id", "conversation", "sender", "direction", "status", "created_at")
    search_fields = ("sender", "text")
    list_filter = ("status", "direction", "created_at")

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "telefono", "email", "fecha_registro")
    search_fields = ("nombre", "telefono", "email")
    list_filter = ("fecha_registro",)
    ordering = ("-fecha_registro",)
# bsp_backend/settings.py