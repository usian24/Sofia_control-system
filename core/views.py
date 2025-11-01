from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
import requests
from rest_framework.views import APIView
from .models import Agent, Conversation, Message, Cliente, WebhookEvent
from .serializers import AgentSerializer, ConversationSerializer, MessageSerializer, ClienteSerializer
from .whatsapp_client import send_text_message


# --- AGENTES ---
class AgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# --- CONVERSACIONES ---
class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=["post"])
    def send_message(self, request, pk=None):
        convo = self.get_object()
        text = request.data.get("text", "").strip()

        if not text:
            return Response({"detail": "El texto es requerido"}, status=status.HTTP_400_BAD_REQUEST)

        msg = Message.objects.create(
            conversation=convo,
            sender=f"agent:{convo.agent.name if convo.agent else 'system'}",
            text=text,
            direction="out",
            status="pending"
        )

        to_number = convo.external_id

        try:
            resp = send_text_message(to_number=to_number, text=text)

            wa_id = None
            if isinstance(resp, dict):
                messages = resp.get("messages") or []
                if messages:
                    wa_id = messages[0].get("id")

            msg.whatsapp_message_id = wa_id
            msg.status = "sent"
            msg.metadata = resp
            msg.save()

            return Response(MessageSerializer(msg).data, status=status.HTTP_201_CREATED)

        except Exception as e:
            msg.status = "failed"
            msg.metadata = {"error": str(e)}
            msg.save()
            return Response({"ok": False, "error": str(e)}, status=500)


# --- MENSAJES ---
class MessageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]


# --- CLIENTES ---
class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all().order_by('-fecha_registro')
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]


# --- WEBHOOK META (verificación GET y recepción POST) ---
@csrf_exempt
def whatsapp_webhook(request):
    if request.method == "GET":
        verify_token = "sofia_token_seguro"
        token = request.GET.get("hub.verify_token")
        challenge = request.GET.get("hub.challenge")

        if token == verify_token:
            return JsonResponse(int(challenge), safe=False)
        return JsonResponse({"error": "Token inválido o acceso no autorizado"}, status=403)

    elif request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            print("📩 Mensaje recibido:", json.dumps(data, indent=2, ensure_ascii=False))

            # Guardar evento completo (registro)
            event = WebhookEvent.objects.create(
                event_type=data.get("object", "unknown"),
                payload=data
            )

            entry = data.get("entry", [])
            if entry and "changes" in entry[0]:
                change = entry[0]["changes"][0]
                value = change.get("value", {})
                messages = value.get("messages", [])

                if messages:
                    msg_data = messages[0]
                    sender = msg_data.get("from")
                    text = msg_data.get("text", {}).get("body", "")
                    msg_type = msg_data.get("type", "text")

                    # Buscar o crear cliente
                    cliente, _ = Cliente.objects.get_or_create(
                        telefono=sender,
                        defaults={"nombre": f"Cliente {sender}"}
                    )

                    # Buscar o crear conversación
                    convo, _ = Conversation.objects.get_or_create(
                        external_id=sender,
                        defaults={"participants": [sender]}
                    )

                    # Guardar mensaje entrante
                    Message.objects.create(
                        conversation=convo,
                        sender=sender,
                        text=text,
                        direction="in",
                        status="received",
                        metadata=msg_data
                    )

                    # --- Respuesta automática humana ---
                    respuesta = (
                        "¡Hola! 😊\n"
                        "Soy *Sofía*, tu asistente virtual.\n"
                        "Gracias por escribirnos, es un gusto saludarte.\n"
                        "Cuéntame, ¿cómo puedo ayudarte hoy?"
                    )

                    # Token y número de la app de WhatsApp (ajústalos tú)
                    token = "EAAXbEZBbMPScBP73HLONZCqSkzdbBftbp8GkdqBfv5v7kCtufXRbXVZCYLQi85fSoA9ZBZCbWA978TFQzApYfgBHhoSdW1MwIifp6EPS1bQWRAM89DXXQTdMn9c19GLOmh6kEVNl6mlHprw8ePTqgML1Mwknh6Uy7ZBT3oqRovULKRNkeLtAuhfKfGZBJr9ewuDequZAZCIaaNGzJmjfcKNTnizi4lmQCOp9K"
                    
                    phone_number_id = "*51 953767924"
                    url = f"https://graph.facebook.com/v20.0/{phone_number_id}/messages"

                    payload = {
                        "messaging_product": "whatsapp",
                        "to": sender,
                        "type": "text",
                        "text": {"body": respuesta}
                    }

                    headers = {
                        "Authorization": f"Bearer {token}",
                        "Content-Type": "application/json"
                    }

                    r = requests.post(url, headers=headers, json=payload)
                    print("📤 Respuesta enviada:", r.json())

            return JsonResponse({"status": "ok", "event_id": event.id}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
        except Exception as e:
            print("Error procesando webhook:", e)
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)
