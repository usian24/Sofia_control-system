from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views



urlpatterns = [
    path("", views.login_page, name="login"),  # página principal
    path("dashboard/", views.dashboard, name="dashboard"),
    path("api/test/", views.test),
    path("api/login/", views.login),
    path("api/register/", views.register, name="register"),  
    path("api/clientes/", views.clientes),
    path("api/mensajes/", views.mensajes),
]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])

