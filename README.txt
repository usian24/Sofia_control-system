Proyecto reorganizado para Django (Option A).

Estructura creada:
frontend: 
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
        ├── chat.js
        └── app.js

Qué hice:
- Extraje bloques <style> y <script> inline de los HTML originales y los consolidé en:
  - static/css/styles.css
  - static/js/app.js
- Creé templates que extienden base.html y dejé el contenido de <body> en cada uno.
- Reemplacé enlaces relativos a css/js por plantillas de Django: {% static '...' %}.
- No eliminé nada del contenido original; todo HTML se colocó dentro de templates.
- login funcional 
- creacion de usuarios 
- crud clientes termiando 
- conversaciones con los clinetes registrando en la base de datos 
