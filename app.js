// BarCount PWA - Application avec animations épurées
class BarCountApp {
    constructor() {
        this.products = [
            { id: 'absolut', name: 'Absolut', count: 0, image: 'images/absolut.svg' },
            { id: 'beefeater', name: 'Beefeater', count: 0, image: 'images/beefeater.svg' },
            { id: 'jameson', name: 'Jameson', count: 0, image: 'images/jameson.svg' },
            { id: 'eljimador', name: 'El Jimador', count: 0, image: 'images/eljimador.svg' },
            { id: 'bacardi', name: 'Bacardi Carta Blanca', count: 0, image: 'images/bacardi.svg' },
            { id: 'jackdaniels', name: 'Jack Daniel\'s', count: 0, image: 'images/jackdaniels.svg' },
            { id: 'bacardiouro', name: 'Bacardi Oro', count: 0, image: 'images/bacardi.svg' },
            { id: 'triplesec', name: 'Triple Sec', count: 0, image: 'images/triplesec.svg' },
            { id: 'cremepeche', name: 'Crème de Pêche', count: 0, image: 'images/cremepeche.svg' }
        ];
        
        this.currentScreen = 'inventory';
        this.todoList = [];
        this.animationQueue = [];
        
        this.init();
    }
    
    init() {
        this.loadData();
        this.setupEventListeners();
        this.render();
        this.startAnimations();
        this.registerServiceWorker();
    }
    
    startAnimations() {
        // Animation des particules de fond (réduite)
        setTimeout(() => {
            this.backgroundParticles();
        }, 2000);
        
        // Animation d'entrée séquentielle
        setTimeout(() => {
            this.sequentialEntryAnimation();
        }, 100);
    }
    
    backgroundParticles() {
        // Animation subtile d'arrière-plan moins fréquente
        setInterval(() => {
            this.createFloatingParticle();
        }, 15000); // Moins fréquent pour éviter la surcharge
    }
    
    createFloatingParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(0, 212, 170, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            animation: float 8s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        // Style pour l'animation
        if (!document.querySelector('#particle-style')) {
            const style = document.createElement('style');
            style.id = 'particle-style';
            style.textContent = `
                @keyframes float {
                    0% { transform: translateY(0) scale(0); opacity: 0; }
                    10% { opacity: 1; transform: scale(1); }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100vh) scale(0); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            particle.remove();
        }, 8000);
    }
    
    sequentialEntryAnimation() {
        // Animation désactivée pour éviter les effets indésirables
        // L'interface reste fixe et stable
    }
    
    setupEventListeners() {
        // Navigation avec animations
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.switchScreen(e.target.dataset.screen);
                this.addRippleEffect(e.target, e);
                return false;
            });
        });
        
        // Délégation d'événements pour tous les boutons
        document.addEventListener('click', (e) => {
            // Boutons +/-
            if (e.target.classList.contains('btn-plus')) {
                e.preventDefault();
                e.stopPropagation();
                const productId = e.target.dataset.product;
                if (productId) {
                    this.updateQuantity(productId, 1);
                    this.addRippleEffect(e.target, e);
                }
                return false;
            }
            
            if (e.target.classList.contains('btn-minus')) {
                e.preventDefault();
                e.stopPropagation();
                const productId = e.target.dataset.product;
                if (productId) {
                    this.updateQuantity(productId, -1);
                    this.addRippleEffect(e.target, e);
                }
                return false;
            }
            
            // Bouton clear
            if (e.target.classList.contains('clear-btn')) {
                e.preventDefault();
                e.stopPropagation();
                this.clearTodoList();
                this.addRippleEffect(e.target, e);
                return false;
            }
            
            // Boutons todo done
            if (e.target.classList.contains('todo-done-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const todoId = e.target.dataset.todo;
                if (todoId) {
                    this.markTodoComplete(todoId);
                    this.addRippleEffect(e.target, e);
                }
                return false;
            }
        });
        
        // Événements de survol avec animations
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('product-item') || e.target.classList.contains('todo-item')) {
                this.addHoverEffect(e.target);
            }
        });
    }
    
    addRippleEffect(button, event) {
        // Simplifier l'effet ripple pour éviter les surcharges
        if (button.querySelector('.ripple')) return; // Éviter les multiples ripples
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.4s ease-out;
        `;
        
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    0% { transform: scale(0); opacity: 1; }
                    100% { transform: scale(2); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 400);
    }
    
    addHoverEffect(element) {
        element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    switchScreen(screen) {
        const screens = document.querySelectorAll('.screen');
        const buttons = document.querySelectorAll('.nav-btn');
        
        // Mise à jour des boutons
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.screen === screen) {
                btn.classList.add('active');
            }
        });
        
        // Changement d'écran simple et fluide
        screens.forEach(s => s.classList.remove('active'));
        const newScreen = document.getElementById(screen);
        if (newScreen) {
            newScreen.classList.add('active');
            this.currentScreen = screen;
            
            // FORCER la mise à jour des données lors du changement d'écran
            this.updateTodoList();
            this.render();
            
            // Animation d'entrée séquentielle avec délai
            setTimeout(() => {
                this.sequentialEntryAnimation();
            }, 100);
        }
    }
    
    updateQuantity(productId, change) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            const oldCount = product.count;
            product.count = Math.max(0, product.count + change);
            
            // Animation de changement de valeur
            this.animateValueChange(productId, oldCount, product.count);
            
            // Mise à jour des todos
            this.updateTodoList();
            
            // Sauvegarde et rendu
            this.saveData();
            this.render();
        }
    }
    
    animateValueChange(productId, oldValue, newValue) {
        const countElement = document.querySelector(`[data-product-id="${productId}"] .product-count`);
        if (countElement) {
            // Animation de pulsation
            countElement.classList.add('value-change');
            
            // Animation de compteur
            this.animateCounter(countElement, oldValue, newValue);
            
            setTimeout(() => {
                countElement.classList.remove('value-change');
            }, 400);
        }
    }
    
    animateCounter(element, from, to) {
        const duration = 300;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.round(from + (to - from) * easeOutQuart);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    updateTodoList() {
        this.todoList = this.products
            .filter(product => product.count > 0)
            .map(product => ({
                id: product.id,
                name: product.name,
                quantity: product.count
            }));
    }
    
    markTodoComplete(todoId) {
        // Remettre le compteur du produit à 0 (bouteilles remontées)
        const product = this.products.find(p => p.id === todoId);
        if (product) {
            product.count = 0;
        }
        
        // Mettre à jour la liste des todos
        this.updateTodoList();
        
        // Sauvegarder et re-rendre sans animation
        this.saveData();
        this.render();
    }
    
    clearTodoList() {
        // Remettre tous les compteurs à zéro
        this.products.forEach(product => {
            product.count = 0;
        });
        
        // Vider la liste des todos
        this.todoList = [];
        
        // Sauvegarder et re-rendre sans animation
        this.saveData();
        this.render();
    }
    
    render() {
        this.renderInventory();
        this.renderTodoList();
        this.updateProductStates();
    }
    
    renderInventory() {
        const container = document.getElementById('inventory-list');
        if (!container) {
            console.error('Container inventory-list not found');
            return;
        }
        
        container.innerHTML = '';
        
        this.products.forEach((product, index) => {
            const item = document.createElement('div');
            item.className = `product-item ${product.count > 0 ? 'needs-restock' : ''}`;
            item.setAttribute('data-product-id', product.id);
            // Pas d'animation délai pour un rendu plus stable
            
            item.innerHTML = `
                <div class="product-info">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-details">
                        <div class="product-name">${product.name}</div>
                        <div class="product-count">${product.count}</div>
                    </div>
                </div>
                <div class="button-group">
                    <button type="button" class="btn-minus" data-product="${product.id}">−</button>
                    <button type="button" class="btn-plus" data-product="${product.id}">+</button>
                </div>
            `;
            
            container.appendChild(item);
        });
    }
    
    renderTodoList() {
        const container = document.getElementById('todo-list');
        const emptyMessage = document.getElementById('empty-message');
        
        if (!container || !emptyMessage) {
            console.error('Todo containers not found');
            return;
        }
        
        if (this.todoList.length === 0) {
            container.innerHTML = '';
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
            
            // Rendu complet pour éviter les problèmes de synchronisation
            container.innerHTML = '';
            
            this.todoList.forEach((todo, index) => {
                const item = document.createElement('div');
                item.className = 'todo-item';
                item.setAttribute('data-todo-id', todo.id);
                
                item.innerHTML = `
                    <div class="todo-content">
                        <div class="todo-text">${todo.name}</div>
                        <div class="todo-quantity">${todo.quantity}</div>
                    </div>
                    <button type="button" class="todo-done-btn" data-todo="${todo.id}">
                        ✓ Remonté
                    </button>
                `;
                
                container.appendChild(item);
            });
        }
    }
    
    updateProductStates() {
        this.products.forEach(product => {
            const element = document.querySelector(`[data-product-id="${product.id}"]`);
            if (element) {
                if (product.count > 0) {
                    element.classList.add('needs-restock');
                } else {
                    element.classList.remove('needs-restock');
                }
            }
        });
    }
    
    saveData() {
        try {
            localStorage.setItem('barcount-data', JSON.stringify(this.products));
            localStorage.setItem('barcount-todo', JSON.stringify(this.todoList));
        } catch (e) {
            console.error('Erreur lors de la sauvegarde:', e);
        }
    }
    
    loadData() {
        try {
            const savedData = localStorage.getItem('barcount-data');
            const savedTodo = localStorage.getItem('barcount-todo');
            
            if (savedData) {
                this.products = JSON.parse(savedData);
            }
            
            if (savedTodo) {
                this.todoList = JSON.parse(savedTodo);
            }
        } catch (e) {
            console.error('Erreur lors du chargement:', e);
        }
    }
    
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker enregistré:', registration);
                })
                .catch(error => {
                    console.log('Erreur Service Worker:', error);
                });
        }
    }
}

// Fonction pour créer des micro-interactions
function addMicroInteraction(element, type) {
    switch (type) {
        case 'success':
            element.classList.add('success-animation');
            setTimeout(() => {
                element.classList.remove('success-animation');
            }, 600);
            break;
            
        case 'error':
            element.style.animation = 'shake 0.5s ease-out';
            setTimeout(() => {
                element.style.animation = '';
            }, 500);
            break;
            
        case 'pulse':
            element.classList.add('pulse-animation');
            setTimeout(() => {
                element.classList.remove('pulse-animation');
            }, 1000);
            break;
    }
}

// Fonction pour les effets de particules
function createSuccessParticles(x, y) {
    const colors = ['#00d4aa', '#ffa726', '#ff6b7a'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${x}px;
            top: ${y}px;
            animation: particle-burst 0.8s ease-out forwards;
        `;
        
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 50 + Math.random() * 30;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--vx', `${vx}px`);
        particle.style.setProperty('--vy', `${vy}px`);
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
    
    // Ajouter le style pour l'animation de particules
    if (!document.querySelector('#particle-burst-style')) {
        const style = document.createElement('style');
        style.id = 'particle-burst-style';
        style.textContent = `
            @keyframes particle-burst {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                100% { transform: translate(var(--vx), var(--vy)) scale(0); opacity: 0; }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                20%, 40%, 60%, 80% { transform: translateX(4px); }
            }
            
            .pulse-animation {
                animation: pulse 1s ease-out;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialisation de l'application
let app;

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    app = new BarCountApp();
    
    // Ajouter des événements globaux pour les animations
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('todo-done-btn')) {
            const rect = e.target.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createSuccessParticles(x, y);
        }
    });
    
    // Effet de survol pour les éléments interactifs
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('btn-plus') || e.target.classList.contains('btn-minus')) {
            e.target.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    });
    
    // Préchargement des images avec animation
    const images = ['images/absolut.svg', 'images/beefeater.svg', 'images/jameson.svg', 'images/eljimador.svg', 'images/bacardi.svg', 'images/jackdaniels.svg', 'images/triplesec.svg', 'images/cremepeche.svg'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onerror = () => console.warn(`Image non trouvée: ${src}`);
    });
});

// Fonction pour nettoyer le cache (page clear-cache.html)
function clearCache() {
    if ('caches' in window) {
        caches.keys().then(names => {
            names.forEach(name => {
                caches.delete(name);
            });
        });
    }
    
    localStorage.clear();
    sessionStorage.clear();
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
                registration.unregister();
            });
        });
    }
    
    // Animation de confirmation
    const button = document.querySelector('.clear-btn');
    if (button) {
        addMicroInteraction(button, 'success');
    }
    
    setTimeout(() => {
        location.reload();
    }, 1000);
}
