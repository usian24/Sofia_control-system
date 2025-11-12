// Extracted from HTML files
// ===== DATA INITIALIZATION =====

console.log("TOKEN EN DASHBOARD:", localStorage.getItem("token"));

        let appData = {
            currentUser: null,
            users: [],
            conversations: [],
            tags: [],
            currentView: 'dashboard',
            selectedConversation: null,
            conversationFilter: 'all'
        };

        // Initialize default data
        function initializeData() {
            // Verificar si hay token
            const token = localStorage.getItem('token');
            console.log("TOKEN EN DASHBOARD:", token);
        
            if (!token) {
                console.warn("No hay token, redirigiendo al login...");
                window.location.href = '/';
                return;
            }
        
            // Si hay token, podrías cargar datos del usuario más adelante con el backend
            appData.currentUser = { name: "Usuario activo" };
            document.getElementById('currentUserName').textContent = appData.currentUser.name;
        
            // Initialize tags
            appData.tags = [
                { id: '1', name: 'cliente-destacado', color: '#10B981' },
                { id: '2', name: 'cliente-potencial', color: '#3B82F6' },
                { id: '3', name: 'premium', color: '#8B5CF6' },
                { id: '4', name: 'vip', color: '#F59E0B' },
                { id: '5', name: 'nuevo', color: '#6B7280' },
                { id: '6', name: 'interesado', color: '#06B6D4' }
            ];
    
            // Initialize users
            appData.users = [
                {
                    id: '1',
                    name: 'Carlos Mendoza',
                    email: 'carlos.mendoza@email.com',
                    phone: '+52 555 1234',
                    tags: ['cliente-destacado', 'premium'],
                    lastInteraction: '2025-11-10T10:30:00',
                    messagesCount: 127,
                    status: 'active',
                    createdAt: '2025-09-15T08:00:00'
                },
                {
                    id: '2',
                    name: 'María García',
                    email: 'maria.garcia@email.com',
                    phone: '+52 555 5678',
                    tags: ['cliente-potencial'],
                    lastInteraction: '2025-11-09T16:45:00',
                    messagesCount: 34,
                    status: 'active',
                    createdAt: '2025-10-20T14:30:00'
                },
                {
                    id: '3',
                    name: 'Juan Pérez',
                    email: 'juan.perez@email.com',
                    phone: '+52 555 9012',
                    tags: ['nuevo'],
                    lastInteraction: '2025-11-08T09:15:00',
                    messagesCount: 5,
                    status: 'inactive',
                    createdAt: '2025-11-05T10:00:00'
                },
                {
                    id: '4',
                    name: 'Ana Rodríguez',
                    email: 'ana.rodriguez@email.com',
                    phone: '+52 555 3456',
                    tags: ['cliente-destacado', 'vip'],
                    lastInteraction: '2025-11-10T11:20:00',
                    messagesCount: 203,
                    status: 'active',
                    createdAt: '2025-08-10T12:00:00'
                },
                {
                    id: '5',
                    name: 'Luis Martínez',
                    email: 'luis.martinez@email.com',
                    phone: '+52 555 7890',
                    tags: ['cliente-potencial', 'interesado'],
                    lastInteraction: '2025-11-09T14:30:00',
                    messagesCount: 18,
                    status: 'active',
                    createdAt: '2025-10-28T09:00:00'
                }
            ];

            // Initialize conversations
            appData.conversations = [
                {
                    id: 'conv-1',
                    userId: '1',
                    userName: 'Carlos Mendoza',
                    userTags: ['cliente-destacado', 'premium'],
                    status: 'active',
                    lastMessage: '¿Puedes ayudarme con mi pedido?',
                    lastMessageTime: '2025-11-10T10:30:00',
                    unreadCount: 2,
                    convertedToSale: true,
                    saleAmount: 2500,
                    messages: [
                        { id: 'm1', sender: 'user', content: 'Hola Sofia', timestamp: '2025-11-10T10:25:00' },
                        { id: 'm2', sender: 'bot', content: 'Hola Carlos, ¿en qué puedo ayudarte hoy?', timestamp: '2025-11-10T10:25:30' },
                        { id: 'm3', sender: 'user', content: '¿Puedes ayudarme con mi pedido?', timestamp: '2025-11-10T10:30:00' }
                    ]
                },
                {
                    id: 'conv-2',
                    userId: '4',
                    userName: 'Ana Rodríguez',
                    userTags: ['cliente-destacado', 'vip'],
                    status: 'active',
                    lastMessage: 'Gracias por tu ayuda!',
                    lastMessageTime: '2025-11-10T11:20:00',
                    unreadCount: 0,
                    convertedToSale: true,
                    saleAmount: 4800,
                    messages: [
                        { id: 'm4', sender: 'user', content: 'Necesito información sobre el servicio premium', timestamp: '2025-11-10T11:15:00' },
                        { id: 'm5', sender: 'bot', content: 'Por supuesto Ana, el servicio premium incluye...', timestamp: '2025-11-10T11:15:30' },
                        { id: 'm6', sender: 'user', content: 'Gracias por tu ayuda!', timestamp: '2025-11-10T11:20:00' }
                    ]
                },
                {
                    id: 'conv-3',
                    userId: '2',
                    userName: 'María García',
                    userTags: ['cliente-potencial'],
                    status: 'pending',
                    lastMessage: '¿Cuáles son los precios?',
                    lastMessageTime: '2025-11-09T16:45:00',
                    unreadCount: 1,
                    convertedToSale: false,
                    messages: [
                        { id: 'm7', sender: 'user', content: '¿Cuáles son los precios?', timestamp: '2025-11-09T16:45:00' }
                    ]
                },
                {
                    id: 'conv-4',
                    userId: '5',
                    userName: 'Luis Martínez',
                    userTags: ['cliente-potencial', 'interesado'],
                    status: 'resolved',
                    lastMessage: 'Perfecto, muchas gracias',
                    lastMessageTime: '2025-11-09T14:30:00',
                    unreadCount: 0,
                    convertedToSale: true,
                    saleAmount: 1200,
                    messages: [
                        { id: 'm8', sender: 'user', content: 'Me interesa conocer más sobre sus servicios', timestamp: '2025-11-09T14:20:00' },
                        { id: 'm9', sender: 'bot', content: 'Claro Luis, te puedo mostrar...', timestamp: '2025-11-09T14:20:30' },
                        { id: 'm10', sender: 'user', content: 'Perfecto, muchas gracias', timestamp: '2025-11-09T14:30:00' }
                    ]
                }
            ];

            renderCurrentView();
        }

        // ===== VIEW MANAGEMENT =====
        function switchView(viewName) {
            // Update active nav item
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.view === viewName) {
                    item.classList.add('active');
                }
            });

            // Hide all views
            document.querySelectorAll('.view-content').forEach(view => {
                view.classList.add('hidden');
            });

            // Show selected view
            const viewMap = {
                'dashboard': 'dashboardView',
                'conversations': 'conversationsView',
                'users': 'usersView',
                'analytics': 'analyticsView',
                'settings': 'settingsView'
            };

            const viewId = viewMap[viewName];
            if (viewId) {
                document.getElementById(viewId).classList.remove('hidden');
                appData.currentView = viewName;
                renderCurrentView();
            }
        }

        function renderCurrentView() {
            switch (appData.currentView) {
                case 'dashboard':
                    renderDashboard();
                    break;
                case 'conversations':
                    renderConversations();
                    break;
                case 'users':
                    renderUsers();
                    break;
                case 'analytics':
                    renderAnalytics();
                    break;
            }
        }

        // ===== DASHBOARD =====
        function renderDashboard() {
            const activeUsers = appData.users.filter(u => u.status === 'active').length;
            const activeConversations = appData.conversations.filter(c => c.status === 'active').length;
            const totalMessages = appData.conversations.reduce((sum, conv) => sum + conv.messages.length, 0);
            const pendingConversations = appData.conversations.filter(c => c.status === 'pending').length;

            document.getElementById('activeUsersCount').textContent = `${activeUsers} / ${appData.users.length}`;
            document.getElementById('activeConversationsCount').textContent = `${activeConversations} / ${appData.conversations.length}`;
            document.getElementById('totalMessagesCount').textContent = totalMessages;
            document.getElementById('pendingCount').textContent = pendingConversations;

            // Render recent conversations
            const recentConvs = [...appData.conversations]
                .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime))
                .slice(0, 5);

            const recentConvsHTML = recentConvs.map(conv => {
                const timeDiff = Date.now() - new Date(conv.lastMessageTime).getTime();
                const minutesAgo = Math.floor(timeDiff / 60000);
                const timeAgo = minutesAgo < 60 ? `Hace ${minutesAgo} min` : `Hace ${Math.floor(minutesAgo / 60)} horas`;

                return `
                    <div style="display: flex; align-items: start; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#F7FAFC'" onmouseout="this.style.background='transparent'">
                        <div class="conversation-avatar" style="width: 40px; height: 40px;">
                            ${conv.userName.charAt(0)}
                        </div>
                        <div style="flex: 1; min-width: 0;">
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                                <p style="color: #0A192F; font-weight: 500;">${conv.userName}</p>
                                ${conv.unreadCount > 0 ? `<span class="badge" style="background: #3B82F6; font-size: 11px; padding: 2px 8px;">${conv.unreadCount}</span>` : ''}
                            </div>
                            <p style="color: #B0B0B0; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${conv.lastMessage}</p>
                            <p style="color: #B0B0B0; font-size: 12px; margin-top: 4px;">${timeAgo}</p>
                        </div>
                        <div class="status-indicator status-${conv.status}"></div>
                    </div>
                `;
            }).join('');

            document.getElementById('recentConversations').innerHTML = recentConvsHTML;

            // Render top users
            const topUsers = [...appData.users]
                .sort((a, b) => b.messagesCount - a.messagesCount)
                .slice(0, 5);

            const topUsersHTML = topUsers.map((user, index) => {
                const userTagsHTML = user.tags.slice(0, 2).map(tagName => {
                    const tag = appData.tags.find(t => t.name === tagName);
                    return `<span class="badge" style="background: ${tag?.color || '#6B7280'}; font-size: 11px;">${tagName}</span>`;
                }).join('');

                return `
                    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#F7FAFC'" onmouseout="this.style.background='transparent'">
                        <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: 600; flex-shrink: 0;">
                            ${index + 1}
                        </div>
                        <div style="flex: 1; min-width: 0;">
                            <p style="color: #0A192F; font-weight: 500; margin-bottom: 4px;">${user.name}</p>
                            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                                ${userTagsHTML}
                            </div>
                        </div>
                        <div style="text-align: right; flex-shrink: 0;">
                            <p style="color: #0A192F; font-weight: 600;">${user.messagesCount}</p>
                            <p style="color: #B0B0B0; font-size: 12px;">mensajes</p>
                        </div>
                    </div>
                `;
            }).join('');

            document.getElementById('topUsers').innerHTML = topUsersHTML;

            // Render active tags
            const activeTagsHTML = appData.tags.map(tag => {
                const userCount = appData.users.filter(u => u.tags.includes(tag.name)).length;
                return `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #F7FAFC; border-radius: 8px; margin-bottom: 8px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="tag-color" style="background: ${tag.color};"></div>
                            <span style="color: #0A192F;">${tag.name}</span>
                        </div>
                        <span style="color: #B0B0B0; font-size: 14px;">${userCount} usuarios</span>
                    </div>
                `;
            }).join('');

            document.getElementById('activeTags').innerHTML = activeTagsHTML;
        }

        // ===== CONVERSATIONS =====
        function renderConversations() {
            const filteredConversations = appData.conversations.filter(conv => {
                if (appData.conversationFilter === 'all') return true;
                return conv.status === appData.conversationFilter;
            });

            const conversationsHTML = filteredConversations.map(conv => {
                const isSelected = appData.selectedConversation?.id === conv.id;
                return `
                    <div class="conversation-item ${isSelected ? 'active' : ''}" onclick="selectConversation('${conv.id}')">
                        <div class="conversation-header">
                            <div class="conversation-avatar" style="${isSelected ? 'background: rgba(255,255,255,0.2);' : ''}">
                                ${conv.userName.charAt(0)}
                            </div>
                            <div style="flex: 1; min-width: 0;">
                                <p style="font-weight: 500; margin-bottom: 4px;">${conv.userName}</p>
                                <div style="display: flex; align-items: center; gap: 4px;">
                                    <div class="status-indicator status-${conv.status}"></div>
                                    <span style="font-size: 12px; color: ${isSelected ? 'rgba(255,255,255,0.8)' : '#B0B0B0'};">
                                        ${conv.status === 'active' ? 'Activa' : conv.status === 'pending' ? 'Pendiente' : 'Resuelta'}
                                    </span>
                                </div>
                            </div>
                            ${conv.unreadCount > 0 ? `<span class="badge" style="background: #3B82F6;">${conv.unreadCount}</span>` : ''}
                        </div>
                        <p style="font-size: 14px; color: ${isSelected ? 'rgba(255,255,255,0.8)' : '#B0B0B0'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${conv.lastMessage}
                        </p>
                    </div>
                `;
            }).join('');

            document.getElementById('conversationList').innerHTML = conversationsHTML;

            if (appData.selectedConversation) {
                renderConversationDetail();
            }
        }

        function selectConversation(convId) {
            appData.selectedConversation = appData.conversations.find(c => c.id === convId);
            renderConversations();
        }

        function renderConversationDetail() {
            const conv = appData.selectedConversation;
            if (!conv) return;

            const tagsHTML = conv.userTags.map(tag => {
                const tagObj = appData.tags.find(t => t.name === tag);
                return `<span class="badge" style="background: ${tagObj?.color || '#6B7280'};">${tag}</span>`;
            }).join('');

            const headerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="conversation-avatar" style="width: 48px; height: 48px;">
                            ${conv.userName.charAt(0)}
                        </div>
                        <div>
                            <p style="color: #0A192F; font-weight: 600; margin-bottom: 4px;">${conv.userName}</p>
                            <div style="display: flex; gap: 8px;">
                                ${tagsHTML}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('conversationHeader').innerHTML = headerHTML;

            const messagesHTML = conv.messages.map(msg => {
                const isBot = msg.sender === 'bot';
                const time = new Date(msg.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                
                return `
                    <div class="message ${msg.sender}">
                        <div class="message-content">
                            <p>${msg.content}</p>
                            <p class="message-time">${time}</p>
                        </div>
                    </div>
                `;
            }).join('');

            document.getElementById('conversationMessages').innerHTML = messagesHTML;
            
            // Scroll to bottom
            const messagesContainer = document.getElementById('conversationMessages');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const content = input.value.trim();
            
            if (!content || !appData.selectedConversation) return;

            const newMessage = {
                id: `m-${Date.now()}`,
                sender: 'bot',
                content: content,
                timestamp: new Date().toISOString()
            };

            // Find conversation and add message
            const convIndex = appData.conversations.findIndex(c => c.id === appData.selectedConversation.id);
            if (convIndex !== -1) {
                appData.conversations[convIndex].messages.push(newMessage);
                appData.conversations[convIndex].lastMessage = content;
                appData.conversations[convIndex].lastMessageTime = newMessage.timestamp;
                appData.selectedConversation = appData.conversations[convIndex];
            }

            input.value = '';
            renderConversationDetail();
        }

        // ===== USERS =====
        function renderUsers() {
            document.getElementById('totalUsersCount').textContent = appData.users.length;
            document.getElementById('activeUsersCountUsers').textContent = appData.users.filter(u => u.status === 'active').length;
            document.getElementById('totalTagsCount').textContent = appData.tags.length;
            
            const avgMessages = appData.users.length > 0 
                ? Math.round(appData.users.reduce((sum, u) => sum + u.messagesCount, 0) / appData.users.length)
                : 0;
            document.getElementById('avgMessages').textContent = avgMessages;

            filterUsers();
            renderTags();
        }

        function filterUsers() {
            const searchTerm = document.getElementById('userSearch').value.toLowerCase();
            const filteredUsers = appData.users.filter(user => 
                user.name.toLowerCase().includes(searchTerm) || 
                user.email.toLowerCase().includes(searchTerm)
            );

            const usersHTML = filteredUsers.map(user => {
                const tagsHTML = user.tags.map(tagName => {
                    const tag = appData.tags.find(t => t.name === tagName);
                    return `<span class="badge" style="background: ${tag?.color || '#6B7280'};">${tagName}</span>`;
                }).join('');

                return `
                    <div class="user-item">
                        <div class="user-avatar">${user.name.charAt(0)}</div>
                        <div class="user-info-detail">
                            <div class="user-name">
                                ${user.name}
                                <div class="status-indicator status-${user.status}"></div>
                            </div>
                            <div class="user-contact">
                                <span>✉ ${user.email}</span>
                                <span>☎ ${user.phone}</span>
                            </div>
                            <div class="user-tags">
                                ${tagsHTML}
                            </div>
                        </div>
                        <div style="text-align: center;">
                            <p style="color: #0A192F; font-weight: 600;">${user.messagesCount}</p>
                            <p style="color: #B0B0B0; font-size: 12px;">mensajes</p>
                        </div>
                    </div>
                `;
            }).join('');

            document.getElementById('usersList').innerHTML = usersHTML;
        }

        function renderTags() {
            const tagsHTML = appData.tags.map(tag => {
                const userCount = appData.users.filter(u => u.tags.includes(tag.name)).length;
                return `
                    <div class="tag-item">
                        <div class="tag-info">
                            <div class="tag-color" style="background: ${tag.color};"></div>
                            <div>
                                <p style="color: #0A192F; font-weight: 500;">${tag.name}</p>
                                <p style="color: #B0B0B0; font-size: 12px;">${userCount} usuarios</p>
                            </div>
                        </div>
                        <button class="btn btn-secondary" onclick="deleteTag('${tag.id}')" style="padding: 8px; color: #EF4444;">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 16px; height: 16px;">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                `;
            }).join('');

            document.getElementById('tagsList').innerHTML = tagsHTML;
        }

        function deleteTag(tagId) {
            const tag = appData.tags.find(t => t.id === tagId);
            if (tag && confirm(`¿Eliminar etiqueta "${tag.name}"?`)) {
                appData.tags = appData.tags.filter(t => t.id !== tagId);
                appData.users = appData.users.map(u => ({
                    ...u,
                    tags: u.tags.filter(t => t !== tag.name)
                }));
                renderUsers();
            }
        }

        // ===== ANALYTICS =====
        function renderAnalytics() {
            const totalConversations = appData.conversations.length;
            const convertedConversations = appData.conversations.filter(c => c.convertedToSale).length;
            const conversionRate = totalConversations > 0 
                ? ((convertedConversations / totalConversations) * 100).toFixed(1)
                : 0;
            const totalRevenue = appData.conversations.reduce((sum, c) => sum + (c.saleAmount || 0), 0);
            const avgTicket = convertedConversations > 0 
                ? (totalRevenue / convertedConversations).toFixed(0)
                : 0;

            document.getElementById('conversionRate').textContent = `${conversionRate}%`;
            document.getElementById('totalRevenue').textContent = `$${totalRevenue.toLocaleString()}`;
            document.getElementById('totalSales').textContent = convertedConversations;
            document.getElementById('avgTicket').textContent = `$${avgTicket}`;

            renderCharts();
        }

        let charts = {};

        function renderCharts() {
            // Conversion Trend Chart
            const ctxTrend = document.getElementById('conversionTrendChart');
            if (charts.trend) charts.trend.destroy();
            
            charts.trend = new Chart(ctxTrend, {
                type: 'line',
                data: {
                    labels: ['05 Nov', '06 Nov', '07 Nov', '08 Nov', '09 Nov', '10 Nov'],
                    datasets: [{
                        label: 'Conversaciones',
                        data: [12, 18, 15, 22, 20, 25],
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Ventas',
                        data: [8, 11, 9, 14, 13, 18],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });

            // Status Chart
            const ctxStatus = document.getElementById('conversationStatusChart');
            if (charts.status) charts.status.destroy();

            const activeCount = appData.conversations.filter(c => c.status === 'active').length;
            const pendingCount = appData.conversations.filter(c => c.status === 'pending').length;
            const resolvedCount = appData.conversations.filter(c => c.status === 'resolved').length;

            charts.status = new Chart(ctxStatus, {
                type: 'doughnut',
                data: {
                    labels: ['Activas', 'Pendientes', 'Resueltas'],
                    datasets: [{
                        data: [activeCount, pendingCount, resolvedCount],
                        backgroundColor: ['#10B981', '#F59E0B', '#6B7280']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });

            // Conversion by Tag Chart
            const ctxTag = document.getElementById('conversionByTagChart');
            if (charts.tag) charts.tag.destroy();

            const tagLabels = appData.tags.map(t => t.name);
            const tagConversations = appData.tags.map(tag => {
                return appData.conversations.filter(c => c.userTags.includes(tag.name)).length;
            });
            const tagConversions = appData.tags.map(tag => {
                return appData.conversations.filter(c => c.userTags.includes(tag.name) && c.convertedToSale).length;
            });

            charts.tag = new Chart(ctxTag, {
                type: 'bar',
                data: {
                    labels: tagLabels,
                    datasets: [{
                        label: 'Conversaciones',
                        data: tagConversations,
                        backgroundColor: '#3B82F6'
                    }, {
                        label: 'Conversiones',
                        data: tagConversions,
                        backgroundColor: '#10B981'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });

            // Performance by Hour Chart
            const ctxHour = document.getElementById('performanceByHourChart');
            if (charts.hour) charts.hour.destroy();

            charts.hour = new Chart(ctxHour, {
                type: 'bar',
                data: {
                    labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
                    datasets: [{
                        label: 'Mensajes',
                        data: [15, 28, 42, 38, 35, 25, 18],
                        backgroundColor: '#06B6D4'
                    }, {
                        label: 'Conversiones',
                        data: [3, 6, 9, 8, 7, 5, 3],
                        backgroundColor: '#F59E0B'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // ===== MODALS =====
        function showAddUserModal() {
            // Render tag selection
            const tagsHTML = appData.tags.map(tag => {
                return `
                    <span class="badge" style="background: #E5E7EB; color: #6B7280; cursor: pointer;" onclick="toggleUserTag('${tag.name}', this)" data-tag="${tag.name}">
                        ${tag.name}
                    </span>
                `;
            }).join('');
            
            document.getElementById('userTagsSelection').innerHTML = tagsHTML;
            document.getElementById('addUserModal').classList.add('show');
        }

        function closeAddUserModal() {
            document.getElementById('addUserModal').classList.remove('show');
            document.getElementById('addUserForm').reset();
        }

        function toggleUserTag(tagName, element) {
            const tag = appData.tags.find(t => t.name === tagName);
            if (!tag) return;

            const isSelected = element.style.backgroundColor === `rgb(${parseInt(tag.color.slice(1,3), 16)}, ${parseInt(tag.color.slice(3,5), 16)}, ${parseInt(tag.color.slice(5,7), 16)})`;
            
            if (isSelected) {
                element.style.backgroundColor = '#E5E7EB';
                element.style.color = '#6B7280';
            } else {
                element.style.backgroundColor = tag.color;
                element.style.color = 'white';
            }
        }

        function showAddTagModal() {
            document.getElementById('addTagModal').classList.add('show');
        }

        function closeAddTagModal() {
            document.getElementById('addTagModal').classList.remove('show');
            document.getElementById('addTagForm').reset();
        }

       // Form handlers (con conexión al backend Django)
        document.getElementById('addUserForm').addEventListener('submit', async function(e) {
            e.preventDefault();
        
            const selectedTags = Array.from(document.querySelectorAll('#userTagsSelection .badge'))
                .filter(badge => {
                    const tagName = badge.dataset.tag;
                    const tag = appData.tags.find(t => t.name === tagName);
                    if (!tag) return false;
                    const bgColor = badge.style.backgroundColor;
                    const hexColor = tag.color.toLowerCase();
                    return bgColor !== 'rgb(229, 231, 235)' && bgColor !== '';
                })
                .map(badge => badge.dataset.tag);
            
            // Capturar valores del formulario
            const nombre = document.getElementById('userName').value;
            const numero_whatsapp = document.getElementById('userPhone').value;
            
            // Enviar al backend Django
            const token = localStorage.getItem("token");
            
            try {
                const res = await fetch("/api/clientes/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`
                    },
                    body: JSON.stringify({ nombre, numero_whatsapp })
                });
            
                if (res.ok) {
                    const newClient = await res.json();
                    console.log("Cliente registrado en backend:", newClient);
                
                    // Opcional: también lo agregamos visualmente
                    appData.users.push({
                        id: newClient.id,
                        name: newClient.nombre,
                        phone: newClient.numero_whatsapp,
                        tags: selectedTags,
                        lastInteraction: new Date().toISOString(),
                        messagesCount: 0,
                        status: 'active',
                        createdAt: new Date().toISOString()
                    });
                
                    closeAddUserModal();
                    renderUsers();
                    alert("Cliente registrado con éxito en el sistema.");
                } else {
                    const err = await res.json();
                    alert("Error al registrar cliente: " + (err.error || "Desconocido"));
                }
            } catch (error) {
                console.error("Error de conexión con el backend:", error);
                alert("No se pudo conectar al servidor.");
            }
        });


        document.getElementById('addTagForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const tagName = document.getElementById('tagName').value.toLowerCase().replace(/\s+/g, '-');
            const newTag = {
                id: `tag-${Date.now()}`,
                name: tagName,
                color: document.getElementById('tagColor').value
            };

            appData.tags.push(newTag);
            closeAddTagModal();
            renderUsers();
        });

        // Message input enter key
        document.getElementById('messageInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Conversation filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                appData.conversationFilter = this.dataset.filter;
                renderConversations();
            });
        });

        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                switchView(this.dataset.view);
            });
        });

       function handleLogout() {
    localStorage.removeItem('token'); //  usar token
    window.location.href = '/'; // volver al login
}

        // Initialize app
        initializeData();

// Estado de la aplicación
        let isRegisterMode = false;

        // Inicializar usuarios del sistema
        function initializeSystemUsers() {
            if (!localStorage.getItem('sofiaSystemUsers')) {
                const defaultUsers = [{
                    id: '1',
                    name: 'lucian',
                    email: 'jhonalbertoaguilarquispe@gmail.com',
                    password: '123456',
                    createdAt: new Date().toISOString()
                }];
                localStorage.setItem('sofiaSystemUsers', JSON.stringify(defaultUsers));
            }
        }

        // Mostrar alerta
        function showAlert(message, type) {
            const alert = document.getElementById('alert');
            alert.textContent = message;
            alert.className = `alert ${type} show`;
            setTimeout(() => {
                alert.classList.remove('show');
            }, 4000);
        }

        // Cambiar entre login y registro
        function toggleMode() {
            isRegisterMode = !isRegisterMode;
            const nameField = document.getElementById('nameField');
            const formTitle = document.getElementById('formTitle');
            const formSubtitle = document.getElementById('formSubtitle');
            const submitBtn = document.getElementById('submitBtn');
            const toggleLink = document.getElementById('toggleMode');
            const demoCredentials = document.getElementById('demoCredentials');

            if (isRegisterMode) {
                nameField.classList.remove('hidden');
                formTitle.textContent = 'Crear Cuenta';
                formSubtitle.textContent = 'Completa los datos para registrarte';
                submitBtn.textContent = 'Crear Cuenta';
                toggleLink.textContent = '¿Ya tienes cuenta? Inicia sesión';
                demoCredentials.classList.add('hidden');
            } else {
                nameField.classList.add('hidden');
                formTitle.textContent = 'Iniciar Sesión';
                formSubtitle.textContent = 'Ingresa tus credenciales para continuar';
                submitBtn.textContent = 'Iniciar Sesión';
                toggleLink.textContent = '¿No tienes cuenta? Regístrate';
                demoCredentials.classList.remove('hidden');
            }

            // Limpiar campos
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
        }

        // Inicializar texto del toggle
        const toggleElement = document.getElementById('toggleMode');
        if (toggleElement) {
             toggleElement.textContent = '¿No tienes cuenta? Regístrate';
}

        // Manejar envío del formulario
        const authForm = document.getElementById('authForm');
        if (authForm) {
            authForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('password').value;

                if (isRegisterMode) {
                    handleRegister(name, email, password);
                } else {
                    handleLogin(email, password);
            }
        });
    }

        // Manejar login
        function handleLogin(email, password) {
            if (!email || !password) {
                showAlert('Por favor completa todos los campos', 'error');
                return;
            }

            const users = JSON.parse(localStorage.getItem('sofiaSystemUsers') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('sofiaCurrentUser', JSON.stringify(user));
                showAlert('¡Bienvenido a Sofia Control System!', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard_sof.html';
                }, 1000);
            } else {
                showAlert('Credenciales incorrectas', 'error');
            }
        }

        // Manejar registro
        function handleRegister(name, email, password) {
            if (!name || !email || !password) {
                showAlert('Por favor completa todos los campos', 'error');
                return;
            }

            const users = JSON.parse(localStorage.getItem('sofiaSystemUsers') || '[]');
            
            if (users.find(u => u.email === email)) {
                showAlert('Este email ya está registrado', 'error');
                return;
            }

            const newUser = {
                id: `user-${Date.now()}`,
                name: name,
                email: email,
                password: password,
                createdAt: new Date().toISOString()
            };

        }
        // Inicializar
        initializeSystemUsers();

        const token = localStorage.getItem("token");
        if (token) {
            console.log("Usuario autenticado con token, entrando al dashboard...");
            // No redirigimos porque ya está en dashboard
}

async function login() {
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    const response = await fetch("/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard/"; // página principal
    } else {
        alert("Credenciales incorrectas");
    }
}


// Cargar clientes desde el backend Django
async function loadClients() {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch("/api/clientes/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        });

        if (res.ok) {
            const clients = await res.json();
            console.log("Clientes cargados desde backend:", clients);

            appData.users = clients.map(c => ({
                id: c.id,
                name: c.nombre,
                phone: c.numero_whatsapp,
                tags: [],
                lastInteraction: new Date().toISOString(),
                messagesCount: 0,
                status: 'active',
                createdAt: new Date().toISOString()
            }));

            renderUsers();
        } else {
            console.error("Error al cargar clientes:", await res.text());
        }
    } catch (error) {
        console.error("Error de conexión al cargar clientes:", error);
    }
}

// ============================
// Verificación de sesión en dashboard
// ============================
window.addEventListener("DOMContentLoaded", () => {
    console.log("Verificando sesión...");

    // Usamos un pequeño delay para asegurar sincronización del localStorage
    document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const token = localStorage.getItem("token");
        console.log(" TOKEN EN DASHBOARD:", token);

        if (!token) {
            alert("Debes iniciar sesión primero");
            // Redirige al login absoluto (para evitar dominios distintos)
            window.location.href = "/";
            return;
        }

        console.log(" Sesión activa, cargando dashboard...");
        if (typeof loadClients === "function") {
            loadClients();
        }
    }, 500); // puedes subirlo a 800ms si el navegador es lento
});
}); 


