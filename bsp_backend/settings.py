"""
Django settings for bsp_backend project.

Configurado para el sistema BSP Control Dashboard.
Incluye Django REST Framework, JWT, CORS, y PostgreSQL.
"""

import os
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv

# ===============================================================
# 1) Cargar variables de entorno (.env)
# ===============================================================
# Esto permite manejar las credenciales (como claves y contraseñas)
# desde un archivo .env sin exponerlas en el código.
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# ===============================================================
# 2) Configuración general del proyecto
# ===============================================================
SECRET_KEY = os.getenv("SECRET_KEY", "cambia_esto_en_produccion")

DEBUG = os.getenv("DEBUG", "True") == "True"

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "*").split(",")

# ===============================================================
# 3) Aplicaciones instaladas
# ===============================================================
INSTALLED_APPS = [
    # Django base
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # 3rd party (librerías externas)
    "rest_framework",                # Django REST Framework
    "corsheaders",                   # Permitir peticiones del frontend (React)
    
    # Aplicaciones locales (tu backend)
    "core",
]

# ===============================================================
# 4) Middlewares
# ===============================================================
# El middleware de CORS debe ir primero
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "bsp_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "bsp_backend.wsgi.application"

# ===============================================================
# 5) Base de datos PostgreSQL
# ===============================================================
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME", "bsp_db"),
        "USER": os.getenv("DB_USER", "bsp_user"),
        "PASSWORD": os.getenv("DB_PASSWORD", "llwolferoll24"),
        "HOST": os.getenv("DB_HOST", "localhost"),
        "PORT": os.getenv("DB_PORT", "5432"),
    }
}

# ===============================================================
# 6) Validaciones de contraseñas
# ===============================================================
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ===============================================================
# 7) Idioma, zona horaria y formato
# ===============================================================
LANGUAGE_CODE = "es"
TIME_ZONE = "America/Lima"
USE_I18N = True
USE_TZ = True

# ===============================================================
# 8) Archivos estáticos y media
# ===============================================================
STATIC_URL = "static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

# ===============================================================
# 9) Configuración de REST Framework y JWT
# ===============================================================
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}

# ===============================================================
# 10) Configuración de CORS
# ===============================================================
# Para desarrollo, habilitamos solo React local
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",     # Puerto por defecto de Vite
    "http://127.0.0.1:5173",
]

# ===============================================================
# 11) Configuración por defecto
# ===============================================================
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
