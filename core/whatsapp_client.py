# core/whatsapp_client.py
import os
import requests
from typing import Dict, Any

GRAPH_URL_BASE = "https://graph.facebook.com"
WHATSAPP_TOKEN = os.getenv("WHATSAPP_TOKEN")
PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID")
API_VERSION = os.getenv("WHATSAPP_API_VERSION", "v17.0")  # ajustar si cambia

def _whatsapp_url(path: str) -> str:
    return f"{GRAPH_URL_BASE}/{API_VERSION}/{PHONE_NUMBER_ID}/{path}"

def send_text_message(to_number: str, text: str) -> Dict[str, Any]:
    """
    Envía un mensaje de texto simple vía WhatsApp Cloud API.
    `to_number` debe ser en formato internacional (ej: '519xxxxxxxx').
    Devuelve el JSON de la API o lanza excepción si falla.
    """
    url = _whatsapp_url("messages")
    headers = {
        "Authorization": f"Bearer {WHATSAPP_TOKEN}",
        "Content-Type": "application/json",
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": to_number,
        "type": "text",
        "text": {"body": text}
    }
    r = requests.post(url, json=payload, headers=headers, timeout=30)
    r.raise_for_status()
    return r.json()

def send_image_message(to_number: str, image_url: str, caption: str = "") -> Dict[str,Any]:
    url = _whatsapp_url("messages")
    headers = {"Authorization": f"Bearer {WHATSAPP_TOKEN}", "Content-Type": "application/json"}
    payload = {
        "messaging_product": "whatsapp",
        "to": to_number,
        "type": "image",
        "image": {"link": image_url, "caption": caption}
    }
    r = requests.post(url, json=payload, headers=headers, timeout=30)
    r.raise_for_status()
    return r.json()
