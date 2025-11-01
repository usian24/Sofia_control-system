# ConversationSerializer incluye mensajes para facilitar listar una conversación con su historial.

from rest_framework import serializers
from .models import Agent, Conversation, Message, Cliente

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"
        read_only_fields = ("id", "created_at",)

class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    class Meta:
        model = Conversation
        fields = "__all__"
        read_only_fields = ("id", "created_at")

class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = "__all__"
        read_only_fields = ("id", "created_at")

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'