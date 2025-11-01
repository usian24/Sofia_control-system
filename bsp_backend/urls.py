"""
URL configuration for bsp_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# bsp_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from django.http import JsonResponse
from core.webhooks import whatsapp_webhook

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

def home(request):
    return JsonResponse({"message": "Bienvenido a Sofia System Control Backend quedate tranquilo que no cargo la pagina pricipal pero todo happy soy lucian el pro de pros . ;v "})

urlpatterns = [
    path("", home),  # Ruta principal
    # Panel de administración (Django admin)
    path("admin/", admin.site.urls),

    # Incluimos todas las rutas definidas en core/urls.py bajo el prefijo /api/
    # Ejemplos resultantes: /api/agents/, /api/conversations/, /api/messages/
    path("api/", include("core.urls")),

    # Endpoints para autenticación JWT (obtener token y refrescar)
    path("api/token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("webhooks/whatsapp/", whatsapp_webhook),
]