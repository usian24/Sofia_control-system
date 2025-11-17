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
    path("api/logout/", views.logout_view),
    path("api/me/", views.me),
    path("api/clientes/", views.clientes),
    path("api/clientes/<int:cliente_id>/", views.cliente_detalle),
    path("api/mensajes/", views.mensajes),
    path("api/mensajes/<int:mensaje_id>/", views.mensaje_detail),
    path("api/mensajes/todos/", views.todos_los_mensajes),
    path('api/mensajes/marcar-leidos/', views.marcar_mensajes_leidos, name='marcar_leidos'),
    path("api/tags/", views.tags),
    path("api/tags/<int:tag_id>/", views.eliminar_tag),
    path("api/clientes/<int:cliente_id>/etiquetas/", views.asignar_etiquetas),

]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])

