// ============================
// control.js – Login & Registro (versión corregida y segura)
// ============================

(function () {
    // Si estamos en dashboard (o en cualquier ruta que empiece con /dashboard) no ejecutar este script
    if (window.location.pathname.startsWith("/dashboard")) {
        console.log("control.js: modo dashboard — script de auth ignorado.");
        return;
    }

    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("authForm");
        const toggleMode = document.getElementById("toggleMode");
        const formTitle = document.getElementById("formTitle");
        const formSubtitle = document.getElementById("formSubtitle");
        const nameField = document.getElementById("nameField");
        const submitBtn = document.getElementById("submitBtn");
        const alertBox = document.getElementById("alert");

        if (!form) {
            console.warn("⚠️ No se encontró el formulario de login (authForm).");
            return;
        }

        let isLoginMode = true; // Estado inicial

        // showAlert robusto (si no existe el elemento #alert crea uno temporal)
        const showAlert = (message, type = "error") => {
            if (alertBox) {
                alertBox.textContent = message;
                alertBox.className = `alert ${type}`;
                alertBox.style.display = "block";
                setTimeout(() => (alertBox.style.display = "none"), 4000);
            } else {
                // fallback
                alert(message);
            }
        };

        // Evitar errores si toggleMode no existe
        if (toggleMode) {
            toggleMode.addEventListener("click", (e) => {
                e.preventDefault();
                isLoginMode = !isLoginMode;

                if (!isLoginMode) {
                    formTitle.textContent = "Crear cuenta";
                    formSubtitle.textContent = "Regístrate para comenzar a usar Sofia";
                    submitBtn.textContent = "Registrarme";
                    nameField.classList.remove("hidden");
                    toggleMode.textContent = "¿Ya tienes cuenta? Inicia sesión";
                } else {
                    formTitle.textContent = "Iniciar Sesión";
                    formSubtitle.textContent = "Ingresa tus credenciales para continuar";
                    submitBtn.textContent = "Iniciar Sesión";
                    nameField.classList.add("hidden");
                    toggleMode.textContent = "¿No tienes cuenta? Regístrate aquí";
                }
            });
        } else {
            console.warn("control.js: toggleMode no encontrado, toggle deshabilitado.");
        }

        // Enviar formulario
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const nameInput = document.getElementById("name");
            const name = nameInput ? nameInput.value.trim() : "";

            if (!email || !password || (!isLoginMode && !name)) {
                showAlert("Por favor completa todos los campos.");
                return;
            }

            const url = isLoginMode ? "/api/login/" : "/api/register/";
            const body = isLoginMode ? { email, password } : { email, username: name || email.split("@")[0], password };

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                const data = await response.json();

                if (!response.ok) {
                    console.error("Respuesta del servidor:", data);
                    throw new Error(data.error || data.detail || data.message || "Error en autenticación");
                }

                if (data.token) {
                    localStorage.setItem("token", data.token);
                    console.log("TOKEN GUARDADO EN LOGIN:", localStorage.getItem("token"));
                    console.log("TOKEN GUARDADO:", localStorage.getItem("token"));
                    // redirige a dashboard
                    window.location.href = "/dashboard/";
                } else {
                    showAlert("No se recibió token de autenticación.", "error");
                }
            } catch (error) {
                console.error("Error en login/registro:", error);
                showAlert(error.message || "Error de conexión con el servidor.");
            }
        });
    });
})();
