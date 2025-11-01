# core/webhooks.py
import json
import os
import hmac
import hashlib
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from .models import Conversation, Message
from django.utils import timezone

APP_SECRET = os.getenv("APP_SECRET", "")
WEBHOOK_VERIFY_TOKEN = os.getenv("WEBHOOK_VERIFY_TOKEN", "mi_token_verificacion")

def verify_signature(request) -> bool:
    sig_header = request.META.get("HTTP_X_HUB_SIGNATURE_256") or request.META.get("HTTP_X_HUB_SIGNATURE")
    if not sig_header:
        return False
    try:
        algo, sig = sig_header.split("=", 1)
    except Exception:
        return False
    body = request.body
    if algo.lower() == "sha256":
        digest = hmac.new(APP_SECRET.encode(), body, hashlib.sha256).hexdigest()
    else:
        digest = hmac.new(APP_SECRET.encode(), body, hashlib.sha1).hexdigest()
    return hmac.compare_digest(digest, sig)

@csrf_exempt
def whatsapp_webhook(request):
    # Verificación inicial por GET (Meta hace esto al configurar webhook)
    if request.method == "GET":
        mode = request.GET.get("hub.mode")
        token = request.GET.get("hub.verify_token")
        challenge = request.GET.get("hub.challenge")
        if mode == "subscribe" and token == WEBHOOK_VERIFY_TOKEN:
            return HttpResponse(challenge)
        return HttpResponse("Verification failed", status=403)

    # POST -> eventos
    if request.method == "POST":
        # Verificar firma si APP_SECRET está configurado
        if APP_SECRET:
            if not verify_signature(request):
                return HttpResponse(status=403)
        payload = json.loads(request.body.decode("utf-8"))
        # procesar entries
        for entry in payload.get("entry", []):
            for change in entry.get("changes", []):
                value = change.get("value", {})
                # mensajes entrantes
                messages = value.get("messages") or []
                for m in messages:
                    from_number = m.get("from")  # ex: '519xxxxxx'
                    text = None
                    if m.get("text"):
                        text = m["text"].get("body")
                    # buscar o crear conversation
                    convo, _ = Conversation.objects.get_or_create(external_id=from_number, defaults={"participants":[from_number]})
                    Message.objects.create(
                        conversation=convo,
                        sender=from_number,
                        text=text or "",
                        direction="in",
                        metadata=m,
                        status="received",
                        created_at=timezone.now()
                    )
                # status updates (delivery/read)
                statuses = value.get("statuses") or []
                for s in statuses:
                    message_id = s.get("id")
                    status = s.get("status")
                    # actualizar Message con whatsapp_message_id == message_id
                    if message_id:
                        Message.objects.filter(whatsapp_message_id=message_id).update(status=status, metadata={"status_update": s})
        return HttpResponse(status=200)
    return HttpResponse(status=405)
