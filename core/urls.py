from rest_framework import routers
from django.urls import path
from .views import (
    AgentViewSet,
    ConversationViewSet,
    MessageViewSet,
    ClienteViewSet,
    whatsapp_webhook
)

# Rutas de la API (usando ViewSets)
router = routers.DefaultRouter()
router.register(r"agents", AgentViewSet)
router.register(r"conversations", ConversationViewSet)
router.register(r"messages", MessageViewSet)
router.register(r"clientes", ClienteViewSet)

# Rutas adicionales (webhook)
urlpatterns = router.urls + [
    path("webhook/", whatsapp_webhook, name="whatsapp_webhook"),
]
