Proyecto reorganizado para Django (Option A).

Estructura creada:

app/
├── templates/
│   ├── base.html
│   ├── login.html
│   └── dashboard_sof.html
└── static/
    ├── css/
    │   └── styles.css
    └── js/
        ├── control.js
        └── app.js

Qué hice:
- Extraje bloques <style> y <script> inline de los HTML originales y los consolidé en:
  - static/css/styles.css
  - static/js/app.js
- Creé templates que extienden base.html y dejé el contenido de <body> en cada uno.
- Reemplacé enlaces relativos a css/js por plantillas de Django: {% static '...' %}.
- No eliminé nada del contenido original; todo HTML se colocó dentro de templates.
- Si tienes scripts con <script src="..."> externos, éstos se mantienen sin cambios.

Siguientes pasos recomendados:
- Copia la carpeta 'app' dentro de tu proyecto Django.
- Asegúrate de tener 'django.contrib.staticfiles' y la configuración STATIC_URL y STATICFILES_DIRS apropiadas.
- Ajusta templates según necesites (incluir bloques extra_head/extra_scripts si necesitas inyectar contenido por template).

