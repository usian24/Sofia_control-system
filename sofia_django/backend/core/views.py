from django.shortcuts import render, get_list_or_404
from django.contrib.auth import authenticate, get_user_model
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Cliente, Mensaje
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

User = get_user_model()  # para acceder al modelo de usuario configurado


# ------------------------------
# TEST DEL BACKEND
# ------------------------------
def test(request):
    return JsonResponse({"message": "Backend funcionando"})


# ------------------------------
# LOGIN POR EMAIL
# ------------------------------
@csrf_exempt
def login(request):
    if request.method != "POST":
        return JsonResponse({"error": "Se requiere método POST"}, status=400)

    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON inválido"}, status=400)

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return JsonResponse({"error": "Faltan datos"}, status=400)

    try:
        # Buscar usuario por email
        user_obj = User.objects.get(email=email)
        # Autenticar usando su username
        user = authenticate(username=user_obj.username, password=password)
    except User.DoesNotExist:
        return JsonResponse({"error": "No existe un usuario con ese email"}, status=404)

    if user is None:
        return JsonResponse({"error": "Contraseña incorrecta"}, status=401)

    token, _ = Token.objects.get_or_create(user=user)
    return JsonResponse({"token": token.key})


# ------------------------------
# CLIENTES
# ------------------------------
@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def clientes(request):
    user = request.user

    if request.method == 'GET':
        clientes = Cliente.objects.filter(creado_por=user).order_by('-fecha_registro')
        data = [
            {   "id": c.id, 
                "nombre": c.nombre, 
                "numero_whatsapp": c.numero_whatsapp,
                "email": getattr(c, 'email', None) 
             }
            for c in clientes
        ]
        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)

        nombre = data.get("nombre")
        numero = data.get("numero_whatsapp")
        email = data.get("email")  

        # Validaciones básicas
        if not nombre or not numero:
            return JsonResponse({"error": "Faltan datos"}, status=400)

        # Evitar duplicados por número
        if Cliente.objects.filter(numero_whatsapp=numero, creado_por=user).exists():
            return JsonResponse({"error": "Ya existe un cliente con ese número"}, status=400)

        # Crear cliente con correo opcional
        cliente = Cliente.objects.create(
            nombre=nombre,
            numero_whatsapp=numero,
            email=email if email else None,  
            creado_por=user
        )

        return JsonResponse(
            {
                "id": cliente.id,
                "nombre": cliente.nombre,
                "numero_whatsapp": cliente.numero_whatsapp,
                "email": cliente.email, 
            },
            status=201
        )

# ------------------------------
# CLIENTE / ACTUALIZAR / ELIMINAR
# ------------------------------
@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def cliente_detalle(request, cliente_id):
    user = request.user

    # Buscar cliente que pertenezca al usuario
    try:
        cliente = Cliente.objects.get(id=cliente_id, creado_por=user)
    except Cliente.DoesNotExist:
        return JsonResponse({"error": "Cliente no encontrado"}, status=404)

    # DETALLE DEL CLIENTE
    if request.method == 'GET':
        data = {
            "id": cliente.id,
            "nombre": cliente.nombre,
            "numero_whatsapp": cliente.numero_whatsapp,
            "email": cliente.email,
            "fecha_registro": cliente.fecha_registro.strftime("%Y-%m-%d %H:%M:%S"),
        }
        return JsonResponse(data, status=200)

    # ACTUALIZAR CLIENTE
    elif request.method == 'PUT':
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)

        nombre = data.get("nombre")
        numero = data.get("numero_whatsapp")
        email = data.get("email")

        if not nombre and not numero and not email:
            return JsonResponse({"error": "No se enviaron datos para actualizar"}, status=400)

        if numero:
            # Validar duplicado
            if Cliente.objects.filter(numero_whatsapp=numero, creado_por=user).exclude(id=cliente.id).exists():
                return JsonResponse({"error": "Ya existe otro cliente con ese número"}, status=400)
            cliente.numero_whatsapp = numero

        if nombre:
            cliente.nombre = nombre
            
        if email is not None:  
            cliente.email = email

        cliente.save()
        return JsonResponse({
            "message": "Cliente actualizado correctamente",
            "id": cliente.id,
            "nombre": cliente.nombre,
            "numero_whatsapp": cliente.numero_whatsapp,
            "email": cliente.email
        })

    # ELIMINAR CLIENTE
    elif request.method == 'DELETE':
        cliente.delete()
        return JsonResponse({"message": "Cliente eliminado correctamente"}, status=200)

# ------------------------------
# MENSAJES
# ------------------------------
@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def mensajes(request):
    user = request.user

    if request.method == 'GET':
        cliente_id = request.GET.get("cliente_id")
        if not cliente_id:
            return JsonResponse({"error": "Falta cliente_id"}, status=400)
        
        mensajes = Mensaje.objects.filter(cliente__id=cliente_id, cliente__creado_por=user).order_by('fecha')
        data = [
            {"id": m.id, "texto": m.texto, "tipo": m.tipo, "fecha": m.fecha.strftime("%Y-%m-%d %H:%M")}
            for m in mensajes
        ]
        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)

        cliente_id = data.get("cliente_id")
        texto = data.get("texto")

        if not cliente_id or not texto:
            return JsonResponse({"error": "Faltan datos"}, status=400)

        try:
            cliente = Cliente.objects.get(id=cliente_id, creado_por=user)
        except Cliente.DoesNotExist:
            return JsonResponse({"error": "Cliente no encontrado"}, status=404)

        mensaje = Mensaje.objects.create(cliente=cliente, texto=texto, tipo="enviado")
        return JsonResponse(
            {"id": mensaje.id, "texto": mensaje.texto, "tipo": mensaje.tipo, "fecha": mensaje.fecha.strftime("%Y-%m-%d %H:%M")},
            status=201
        )
        
# ------------------------------
# REGISTRO DE USUARIOS
# ------------------------------
@csrf_exempt
def register(request):
    if request.method != "POST":
        return JsonResponse({"error": "Se requiere método POST"}, status=400)

    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON inválido"}, status=400)

    # Aceptar "name" o "username"
    nombre = data.get("name") or data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not nombre or not email or not password:
        return JsonResponse({"error": "Faltan datos"}, status=400)

    if User.objects.filter(email=email).exists():
        return JsonResponse({"error": "El correo ya está registrado"}, status=400)

    # Usar el email como username para Django
    user = User.objects.create_user(
        username=email,
        email=email,
        first_name=nombre,
        password=password
    )

    token, _ = Token.objects.get_or_create(user=user)
    return JsonResponse(
        {"message": "Usuario registrado correctamente", "token": token.key},
        status=201
    )
@api_view(['PUT', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def mensaje_detail(request, mensaje_id):
    user = request.user
    try:
        mensaje = Mensaje.objects.get(id=mensaje_id, cliente__creado_por=user)
    except Mensaje.DoesNotExist:
        return JsonResponse({"error": "Mensaje no encontrado"}, status=404)

    if request.method == 'PUT':
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
        texto = payload.get("texto")
        if texto:
            mensaje.texto = texto
            mensaje.save()
            return JsonResponse({"message": "Mensaje actualizado", "id": mensaje.id})
        return JsonResponse({"error": "Nada que actualizar"}, status=400)

    elif request.method == 'DELETE':
        mensaje.delete()
        return JsonResponse({"message": "Mensaje eliminado"})

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout_view(request):
    # Borramos el token actual
    token = request.auth
    if token:
        token.delete()
    return JsonResponse({"message": "Sesión cerrada"})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    return JsonResponse({"id": user.id, "email": user.email, "username": user.username, "name": getattr(user, 'first_name', '')})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def todos_los_mensajes(request):
    user = request.user
    mensajes = Mensaje.objects.filter(cliente__creado_por=user).order_by('-fecha')
    data = [
        {
            "id": m.id,
            "texto": m.texto,
            "cliente": m.cliente.nombre if m.cliente else None,
            "fecha": m.fecha.strftime("%Y-%m-%d %H:%M"),
            "tipo": m.tipo
        }
        for m in mensajes
    ]
    return JsonResponse(data, safe=False)






# ------------------------------
# PÁGINAS HTML
# ------------------------------
def login_page(request):
    return render(request, 'login.html')


def dashboard(request):
    return render(request, "dashboard_sof.html")
