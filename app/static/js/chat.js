/* ----------------------------------------------------
   CHAT.JS — Conversaciones y Mensajes (versión completa)
---------------------------------------------------- */
console.log("📌 chat.js inicializado");

/* VARIABLES GLOBALES */
let currentConversationId = null;
let conversationFilter = "all"; // all | active | pending


/* ====================================================
   1. ESTABLECER FILTRO
======================================================= */

function setConversationFilter(filtro) {
    conversationFilter = filtro;
    loadConversationsList();
}


/* ====================================================
   2. CARGAR LISTA DE CONVERSACIONES
======================================================= */

async function loadConversationsList() {
    console.log("Cargando lista de conversaciones...");

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const res = await fetch("/api/clientes/", {
            headers: { "Authorization": `Token ${token}` }
        });

        if (!res.ok) {
            console.error("Error al cargar clientes:", await res.text());
            return;
        }

        let clientes = await res.json();
        console.log("✔ Conversaciones cargadas:", clientes);

        const list = document.getElementById("conversationList");
        if (!list) return;


        /* 🟧 APLICAR FILTRO */
        if (conversationFilter !== "all") {
            clientes = clientes.filter(c => c.status === conversationFilter);
        }

        /*  RENDER COMPLETO — CON ÚLTIMO MENSAJE, ETIQUETAS, ESTADO Y UNREAD */
        list.innerHTML = clientes.map(c => `
        
            <div class="conversation-item" data-id="${c.id}">
                
                <!-- Nombre del cliente -->
                <div class="name">${c.nombre}</div>
        
                <!-- Último mensaje -->
                <div class="last-message">
                    ${c.ultimo_mensaje ? c.ultimo_mensaje : "Sin mensajes aún"}
                </div>
        
                <!-- Número -->
                <div class="phone">${c.numero_whatsapp}</div>
        
                <!-- Etiquetas -->
                <div class="conv-tags">
                    ${(c.tags || []).map(t =>
                        `<span class="badge" style="background:${t.color};">${t.name}</span>`
                    ).join("")}
                </div>
                
                <!-- Estado -->
                <div class="conv-status status-${c.status}">
                    ${c.status === "active" ? "Activa" : c.status === "pending" ? "Pendiente" : "—"}
                </div>
                
                <!-- Mensajes no leídos -->
                ${c.unread && c.unread > 0 
                    ? `<span class="badge unread">${c.unread}</span>` 
                    : ""}
            </div>
                
        `).join('');


        /* 🟦 CLICK PARA ABRIR CHAT */
        document.querySelectorAll(".conversation-item").forEach(item => {
            item.addEventListener("click", () => selectConversation(item));
        });

    } catch (error) {
        console.error("❌ Error cargando conversaciones:", error);
    }
}


/* ====================================================
   3. SELECCIONAR CONVERSACIÓN
======================================================= */

async function selectConversation(item) {
    const id = item.dataset.id;
    console.log("📌 Conversación seleccionada ID:", id);

    currentConversationId = id;

    // Activar visualmente
    document.querySelectorAll(".conversation-item")
        .forEach(el => el.classList.remove("active"));
    item.classList.add("active");

    // 1️ Marcar mensajes leídos en backend
    await marcarMensajesLeidos(id);

    // 2️ Recargar la lista para actualizar los unread y el estado
    await loadConversationsList();

    // 3️ Cargar mensajes del chat
    loadConversationMessages(id);
}

/* ====================================================
   🔵 1. MARCAR MENSAJES COMO LEÍDOS (BACKEND)
======================================================= */
async function marcarMensajesLeidos(clienteId) {
    const token = localStorage.getItem("token");

    try {
        await fetch("/api/mensajes/marcar-leidos/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({ cliente_id: clienteId })
        });

        console.log("✔ Mensajes marcados como leídos");
    } catch (err) {
        console.error(" Error al marcar mensajes leídos:", err);
    }
}



/* ====================================================
   4. CARGAR MENSAJES
======================================================= */

async function loadConversationMessages(clienteId) {
    console.log(`📥 Cargando mensajes del cliente #${clienteId}`);

    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`/api/mensajes/?cliente_id=${clienteId}`, {
            headers: { "Authorization": `Token ${token}` }
        });

        const mensajes = await res.json();
        console.log("✔ Mensajes:", mensajes);

        const container = document.getElementById("conversationMessages");

        container.innerHTML = mensajes.map(m => `
            <div class="message ${m.tipo}">
                <div class="bubble">${m.texto}</div>
                <small>${new Date(m.fecha).toLocaleString()}</small>
            </div>
        `).join("");

        container.scrollTop = container.scrollHeight;

        const header = document.getElementById("conversationHeader");
        header.innerHTML = `<h3>Conversación con Cliente #${clienteId}</h3>`;

    } catch (error) {
        console.error("❌ Error al cargar mensajes:", error);
    }
}


/* ====================================================
   5. ENVIAR MENSAJE
======================================================= */

async function sendMessage() {
    console.log("Intentando enviar mensaje...");

    if (!currentConversationId) {
        alert("Selecciona una conversación.");
        return;
    }

    const texto = document.getElementById("messageInput").value.trim();
    if (!texto) return;

    const token = localStorage.getItem("token");

    try {
        const res = await fetch("/api/mensajes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({
                cliente_id: currentConversationId,
                texto
            })
        });

        if (res.ok) {
            document.getElementById("messageInput").value = "";
            loadConversationMessages(currentConversationId);
        } else {
            alert("Error al enviar mensaje.");
        }

    } catch (error) {
        console.error("❌ Error enviando mensaje:", error);
    }
}
// ******************************************************
// busca las conversaciones
// ****************************************************** 
document.getElementById("conversationSearch").addEventListener("input", filterConversations);

function filterConversations() {
    const term = document.getElementById("conversationSearch").value.toLowerCase();

    document.querySelectorAll(".conversation-item").forEach(item => {
        const name = item.querySelector(".name").textContent.toLowerCase();
        const last = item.querySelector(".last-message")?.textContent.toLowerCase() || "";

        item.style.display = (name.includes(term) || last.includes(term))
            ? "block"
            : "none";
    });
}



/* ====================================================
   6. ACTIVAR BOTONES DE FILTRO
======================================================= */

document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 chat.js inicializado");

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            setConversationFilter(btn.dataset.filter);
        });
    });

    loadConversationsList();
});
