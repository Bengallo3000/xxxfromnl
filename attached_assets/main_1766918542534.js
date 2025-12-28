// fromNL.Top - Main JavaScript File

function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentTheme = localStorage.getItem('theme') || 'light';
let currentCurrency = localStorage.getItem('currency') || 'EUR';
let products = [];
let filteredProducts = [];
let currentCategory = 'all';
let currentPriceFilter = 'all';
let currentPotencyFilter = 'all';

// Product data for fromNL.Top
const sampleProducts = [
    {
        id: 'amnesia-haze',
        name: 'Amnesia Haze',
        price: 45.00,
        category: 'flowers',
        image: 'https://kimi-web-img.moonshot.cn/img/aqualitas.ca/b57773059391e8fa20808adbd0ca94686e6d056d.jpg',
        description: 'Premium sativa-dominant strain with citrus and earthy flavors',
        potency: 22.5,
        strain: 'Sativa',
        stock: 25,
        status: 'active',
        featured: true,
        effects: 'Euphoric, Creative, Energetic',
        usage: 'Best for daytime use and creative activities'
    },
    {
        id: 'white-widow',
        name: 'White Widow',
        price: 42.00,
        category: 'flowers',
        image: 'https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/eab635a2928af76cceb4120c00b92b8944ef3d84',
        description: 'Balanced hybrid with resinous buds and powerful effects',
        potency: 20.8,
        strain: 'Hybrid',
        stock: 18,
        status: 'active',
        featured: false,
        effects: 'Balanced, Relaxed, Happy',
        usage: 'Suitable for any time of day'
    },
    {
        id: 'northern-lights',
        name: 'Northern Lights',
        price: 38.00,
        category: 'flowers',
        image: 'https://kimi-web-img.moonshot.cn/img/static.wixstatic.com/4ae6681d3271a9a2537032bcf8deda4822534df7.png',
        description: 'Pure indica strain known for its relaxing and sedating effects',
        potency: 18.2,
        strain: 'Indica',
        stock: 30,
        status: 'active',
        featured: true,
        effects: 'Relaxing, Sleepy, Pain Relief',
        usage: 'Perfect for evening use and relaxation'
    },
    {
        id: 'og-kush',
        name: 'OG Kush',
        price: 48.00,
        category: 'flowers',
        image: 'https://kimi-web-img.moonshot.cn/img/img.freepik.com/9e42cd66b9639351a59699013fdd27a6863819be.jpg',
        description: 'Legendary strain with strong earthy and pine aromas',
        potency: 24.3,
        strain: 'Hybrid',
        stock: 15,
        status: 'active',
        featured: false,
        effects: 'Strong, Euphoric, Relaxed',
        usage: 'Experienced users, evening use recommended'
    },
    {
        id: 'shatter-gold',
        name: 'Gold Shatter',
        price: 85.00,
        category: 'concentrates',
        image: 'https://kimi-web-img.moonshot.cn/img/img.freepik.com/12410afc73de48b882393e0709860ecfeefc0c49.jpg',
        description: 'Premium cannabis concentrate with 85% THC content',
        potency: 85.0,
        strain: 'Hybrid',
        stock: 12,
        status: 'active',
        featured: true,
        effects: 'Very Strong, Fast-Acting, Intense',
        usage: 'For experienced users only, use with caution'
    },
    {
        id: 'live-resin',
        name: 'Live Resin',
        price: 95.00,
        category: 'concentrates',
        image: 'https://kimi-web-img.moonshot.cn/img/www.ziel.com/ebd93d20dc3c7c62501a2dfe6c45deea3286d3e5.jpg',
        description: 'Fresh-frozen concentrate preserving full terpene profile',
        potency: 78.5,
        strain: 'Sativa',
        stock: 8,
        status: 'active',
        featured: false,
        effects: 'Flavorful, Potent, Clean',
        usage: 'Dabbing or vaporizing, start with small amounts'
    },
    {
        id: 'chocolate-brownies',
        name: 'Cannabis Chocolate Brownies',
        price: 25.00,
        category: 'edibles',
        image: 'https://kimi-web-img.moonshot.cn/img/whyy.org/8b9306a932f6f80e865c772fca12be65579d0a3f.jpg',
        description: 'Delicious chocolate brownies with 50mg THC each',
        potency: 50.0,
        strain: 'Hybrid',
        stock: 40,
        status: 'active',
        featured: true,
        effects: 'Long-lasting, Body High, Relaxing',
        usage: 'Start with half a brownie, wait 2 hours before consuming more'
    },
    {
        id: 'gummy-bears',
        name: 'THC Gummy Bears',
        price: 22.00,
        category: 'edibles',
        image: 'https://kimi-web-img.moonshot.cn/img/uploads-ssl.webflow.com/b85b1d763765f12e38acb8c746b72a7a30b88e2c.webp',
        description: 'Fruit-flavored gummies with 10mg THC per piece',
        potency: 10.0,
        strain: 'Hybrid',
        stock: 60,
        status: 'active',
        featured: false,
        effects: 'Mild, Controlled, Social',
        usage: 'Perfect for beginners, consistent dosing'
    },
    {
        id: 'golden-teacher',
        name: 'Golden Teacher Mushrooms',
        price: 35.00,
        category: 'mushrooms',
        image: 'https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/0489f90861d98274e3523541a5f7c95821a28376.JPG',
        description: 'Psilocybin mushrooms known for spiritual experiences',
        potency: 1.5,
        strain: 'Psilocybe cubensis',
        stock: 20,
        status: 'active',
        featured: true,
        effects: 'Spiritual, Visual, Introspective',
        usage: 'For experienced users, set and setting important'
    },
    {
        id: 'liberty-caps',
        name: 'Liberty Cap Mushrooms',
        price: 40.00,
        category: 'mushrooms',
        image: 'https://kimi-web-img.moonshot.cn/img/manometcurrent.com/669f47917f5becd0c10bab83179ad1a9fdd3a1b2.jpg',
        description: 'Wild psilocybin mushrooms with high potency',
        potency: 2.0,
        strain: 'Psilocybe semilanceata',
        stock: 15,
        status: 'active',
        featured: false,
        effects: 'Strong Visuals, Euphoric, Nature-Connected',
        usage: 'Experienced users only, start with small doses'
    },
    {
        id: 'magic-truffles',
        name: 'Magic Truffles (15g)',
        price: 28.00,
        category: 'mushrooms',
        image: 'https://kimi-web-img.moonshot.cn/img/img.freepik.com/9a80efb4600e3fed8f28071a9f4c9aa15f3d8279.jpg',
        description: 'Psilocybin truffles for microdosing or full experiences',
        potency: 1.2,
        strain: 'Psilocybe tampanensis',
        stock: 35,
        status: 'active',
        featured: false,
        effects: 'Gentle, Controllable, Creative',
        usage: 'Suitable for beginners, can be microdosed'
    },
    {
        id: 'cbd-oil-1000mg',
        name: 'CBD Oil 1000mg',
        price: 55.00,
        category: 'flowers',
        image: 'https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/908ac62dc1a82f7e97be0167119399bb9c3eec38.jpeg',
        description: 'Premium CBD oil for wellness and relaxation',
        potency: 0.3,
        strain: 'CBD Rich',
        stock: 45,
        status: 'active',
        featured: false,
        effects: 'Calming, Anti-inflammatory, Non-psychoactive',
        usage: 'Sublingual use, start with low doses'
    },
    {
        id: 'premium-hash',
        name: 'Premium Moroccan Hash',
        price: 32.00,
        category: 'concentrates',
        image: 'https://kimi-web-img.moonshot.cn/img/ueeshop.ly200-cdn.com/806071a83f77ba9fe79ad9de8f9621c44448bceb.jpg',
        description: 'Traditional hand-pressed hashish from Morocco',
        potency: 35.0,
        strain: 'Indica',
        stock: 22,
        status: 'active',
        featured: false,
        effects: 'Relaxing, Traditional, Smooth',
        usage: 'Smoking or vaporizing, classic hash experience'
    },
    {
        id: 'cannabis-tea',
        name: 'Cannabis Tea Bags',
        price: 18.00,
        category: 'edibles',
        image: 'https://kimi-web-img.moonshot.cn/img/pioneerphoenix.com/24bd2363b45cfc16185f33a3e3e307b533118070.png',
        description: 'Premium tea bags with 25mg THC each',
        potency: 25.0,
        strain: 'Hybrid',
        stock: 50,
        status: 'active',
        featured: false,
        effects: 'Gentle, Long-lasting, Relaxing',
        usage: 'Steep in hot water for 10-15 minutes'
    },
    {
        id: 'vape-cartridge',
        name: 'Premium Vape Cartridge',
        price: 38.00,
        category: 'concentrates',
        image: 'https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/a97f428ba9f6d4857edbe3d5575a0432283739ec.JPG',
        description: '510 thread cartridge with 85% THC distillate',
        potency: 85.0,
        strain: 'Hybrid',
        stock: 28,
        status: 'active',
        featured: true,
        effects: 'Clean, Potent, Convenient',
        usage: 'Compatible with 510 thread batteries'
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize typed text effect
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: ['from Netherlands', 'Premium Quality', 'Discreet Shipping'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true
        });
    }

    // Initialize text splitting for animations
    if (typeof Splitting !== 'undefined') {
        Splitting();
    }

    // Load products
    products = [...sampleProducts];
    filteredProducts = [...products];
    loadProducts();
    
    // Update cart display
    updateCartDisplay();
    
    // Setup event listeners
    setupEventListeners();
    
    // Apply saved theme
    applyTheme(currentTheme);
    
    // Initialize animations
    initializeAnimations();
}

function setupEventListeners() {
    // Cart toggle
    if (document.getElementById('cart-toggle')) {
        document.getElementById('cart-toggle').addEventListener('click', toggleCart);
    }
    
    // Mobile menu
    if (document.getElementById('mobile-menu-toggle')) {
        document.getElementById('mobile-menu-toggle').addEventListener('click', toggleMobileMenu);
    }
    
    // Telegram support
    if (document.getElementById('telegram-btn')) {
        document.getElementById('telegram-btn').addEventListener('click', openTelegramSupport);
    }
    
    // Search and filters
    if (document.getElementById('search-input')) {
        document.getElementById('search-input').addEventListener('input', filterProducts);
    }
    
    if (document.getElementById('sort-selector')) {
        document.getElementById('sort-selector').addEventListener('change', sortProducts);
    }
}

function initializeAnimations() {
    // Animate product cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 600,
                    easing: 'easeOutQuad'
                });
            }
        });
    }, observerOptions);

    // Observe product cards
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
        });
    }, 100);
}

function loadProducts() {
    const grid = document.getElementById('product-grid');
    const table = document.getElementById('products-table');
    const countEl = document.getElementById('product-count');
    
    if (!grid && !table) return;
    
    if (grid) {
        // Grid view for main store
        grid.innerHTML = filteredProducts.map(product => `
            <div class="product-card bg-white rounded-lg shadow-lg overflow-hidden opacity-0">
                <div class="relative">
                    <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" class="w-full h-48 object-cover">
                    <div class="absolute top-4 right-4">
                        <button onclick="addToCart('${escapeHtml(product.id)}', '${escapeHtml(product.name)}', ${Number(product.price) || 0})" 
                                class="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors glow-effect">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-4"></path>
                            </svg>
                        </button>
                    </div>
                    ${product.featured ? '<div class="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">Featured</div>' : ''}
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-lg font-semibold">${escapeHtml(product.name)}</h3>
                        <span class="text-sm text-gray-500">${escapeHtml(product.strain || 'Hybrid')}</span>
                    </div>
                    <p class="text-gray-600 text-sm mb-2">${escapeHtml(product.description.substring(0, 100))}...</p>
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-sm text-gray-500">Potency: ${Number(product.potency) || 0}%</span>
                        <span class="text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}">${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-2xl font-bold text-green-600">€${Number(product.price) || 0}</span>
                        <button onclick="addToCart('${escapeHtml(product.id)}', '${escapeHtml(product.name)}', ${Number(product.price) || 0})" 
                                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors glow-effect">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    if (table) {
        // Table view for admin
        table.innerHTML = filteredProducts.map(product => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" class="w-10 h-10 rounded-lg object-cover mr-3">
                        <div>
                            <div class="text-sm font-medium text-gray-900">${escapeHtml(product.name)}</div>
                            <div class="text-sm text-gray-500">${escapeHtml(product.description.substring(0, 50))}...</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€${Number(product.price) || 0}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ${escapeHtml(product.category)}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${Number(product.stock) || 0}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${Number(product.potency) || 0}%</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}">
                        ${escapeHtml(product.status)}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onclick="editProduct('${escapeHtml(product.id)}')" class="text-green-600 hover:text-green-900 mr-4">
                        Edit
                    </button>
                    <button onclick="showDeleteModal('${escapeHtml(product.id)}')" class="text-red-600 hover:text-red-900">
                        Delete
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    if (countEl) {
        countEl.textContent = `${filteredProducts.length} products`;
    }

    // Re-initialize animations for new cards
    setTimeout(() => {
        initializeAnimations();
    }, 100);
}

function filterProducts(category) {
    currentCategory = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (event.target.classList.contains('filter-btn')) {
        event.target.classList.add('active');
    }
    
    applyFilters();
}

function filterByPrice(range) {
    currentPriceFilter = range;
    applyFilters();
}

function filterByPotency(potency) {
    currentPotencyFilter = potency;
    applyFilters();
}

function applyFilters() {
    filteredProducts = products.filter(product => {
        // Category filter
        if (currentCategory !== 'all' && product.category !== currentCategory) {
            return false;
        }
        
        // Price filter
        if (currentPriceFilter !== 'all') {
            const [min, max] = currentPriceFilter.split('-').map(p => p === '+' ? Infinity : parseFloat(p));
            if (currentPriceFilter.includes('+')) {
                if (product.price < min) return false;
            } else {
                if (product.price < min || product.price > max) return false;
            }
        }
        
        // Potency filter
        if (currentPotencyFilter !== 'all') {
            const potency = product.potency;
            switch (currentPotencyFilter) {
                case 'low':
                    if (potency > 15) return false;
                    break;
                case 'medium':
                    if (potency <= 15 || potency > 25) return false;
                    break;
                case 'high':
                    if (potency <= 25) return false;
                    break;
            }
        }
        
        return true;
    });
    
    loadProducts();
}

function sortProducts() {
    const sortBy = document.getElementById('sort-selector').value;
    
    filteredProducts.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'potency':
                return b.potency - a.potency;
            default:
                return 0;
        }
    });
    
    loadProducts();
}

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update display
    updateCartDisplay();
    
    // Show success animation
    showAddToCartAnimation();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateQuantity(id, quantity) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
            removeFromCart(id);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const emptyCart = document.getElementById('empty-cart');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) cartCount.textContent = totalItems;
    if (cartTotal) cartTotal.textContent = `€${totalPrice.toFixed(2)}`;
    
    if (cartItems && emptyCart) {
        if (cart.length === 0) {
            emptyCart.style.display = 'block';
            cartItems.innerHTML = '';
        } else {
            emptyCart.style.display = 'none';
            cartItems.innerHTML = '';
            cart.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'flex items-center justify-between py-4 border-b';

                const infoDiv = document.createElement('div');
                infoDiv.className = 'flex-1';

                const nameEl = document.createElement('h4');
                nameEl.className = 'font-semibold text-sm';
                nameEl.textContent = item.name;

                const priceEl = document.createElement('p');
                priceEl.className = 'text-gray-600';
                priceEl.textContent = '€' + item.price;

                infoDiv.appendChild(nameEl);
                infoDiv.appendChild(priceEl);

                const controlsDiv = document.createElement('div');
                controlsDiv.className = 'flex items-center space-x-2';

                const minusBtn = document.createElement('button');
                minusBtn.className = 'w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 text-sm';
                minusBtn.textContent = '-';
                minusBtn.addEventListener('click', () => updateQuantity(item.id, item.quantity - 1));

                const qtySpan = document.createElement('span');
                qtySpan.className = 'w-8 text-center text-sm';
                qtySpan.textContent = item.quantity;

                const plusBtn = document.createElement('button');
                plusBtn.className = 'w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 text-sm';
                plusBtn.textContent = '+';
                plusBtn.addEventListener('click', () => updateQuantity(item.id, item.quantity + 1));

                const removeBtn = document.createElement('button');
                removeBtn.className = 'ml-2 text-red-500 hover:text-red-700';
                removeBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>';
                removeBtn.addEventListener('click', () => removeFromCart(item.id));

                controlsDiv.appendChild(minusBtn);
                controlsDiv.appendChild(qtySpan);
                controlsDiv.appendChild(plusBtn);
                controlsDiv.appendChild(removeBtn);

                itemDiv.appendChild(infoDiv);
                itemDiv.appendChild(controlsDiv);
                cartItems.appendChild(itemDiv);
            });
        }
    }
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (!sidebar) return;
    
    if (sidebar.classList.contains('open')) {
        closeCart();
    } else {
        openCart();
    }
}

function openCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (!sidebar) return;
    
    sidebar.classList.add('open');
    if (overlay) overlay.classList.remove('hidden');
    
    // Animate cart items
    anime({
        targets: '#cart-items > div',
        opacity: [0, 1],
        translateX: [20, 0],
        duration: 400,
        delay: anime.stagger(100),
        easing: 'easeOutQuad'
    });
}

function closeCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (!sidebar) return;
    
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.add('hidden');
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    // Check if age verified
    if (!localStorage.getItem('ageVerified')) {
        showNotification('Please verify your age first!', 'warning');
        return;
    }
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

function toggleMobileMenu() {
    showNotification('Mobile menu coming soon!', 'info');
}

function openTelegramSupport() {
    showNotification('Opening Telegram support chat...', 'info');
    // Simulate Telegram integration
    setTimeout(() => {
        window.open('https://t.me/fromNLSupport', '_blank');
    }, 1000);
}

function showAddToCartAnimation() {
    const cartIcon = document.getElementById('cart-toggle');
    
    if (cartIcon) {
        anime({
            targets: cartIcon,
            scale: [1, 1.2, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    showNotification('Item added to cart!', 'success');
}

function verifyAge(verified) {
    const modal = document.getElementById('age-verification');
    
    if (verified) {
        localStorage.setItem('ageVerified', 'true');
        if (modal) modal.style.display = 'none';
        showNotification('Age verified! Welcome to fromNL.Top', 'success');
    } else {
        showNotification('You must be 18+ to access this website', 'error');
        // Redirect to safe page or show message
        setTimeout(() => {
            window.location.href = 'https://google.com';
        }, 2000);
    }
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    applyTheme(theme);
    
    // Update radio buttons
    document.querySelectorAll('input[name="theme"]').forEach(radio => {
        radio.checked = radio.value === theme;
    });
}

function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'dark') {
        root.style.setProperty('--primary-color', '#d4af37');
        root.style.setProperty('--secondary-color', '#1a472a');
        root.style.setProperty('--accent-color', '#1a1a1a');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--bg-color', '#0f0f0f');
        document.body.classList.add('theme-dark');
    } else {
        root.style.setProperty('--primary-color', '#1a472a');
        root.style.setProperty('--secondary-color', '#d4af37');
        root.style.setProperty('--accent-color', '#ffffff');
        root.style.setProperty('--text-color', '#2d3748');
        root.style.setProperty('--bg-color', '#f8f9fa');
        document.body.classList.remove('theme-dark');
    }
}

function setPrimaryColor(color) {
    document.documentElement.style.setProperty('--primary-color', color);
    updatePreview();
}

function setSecondaryColor(color) {
    document.documentElement.style.setProperty('--secondary-color', color);
    updatePreview();
}

function changeFontFamily(font) {
    document.body.style.fontFamily = font + ', sans-serif';
}

function changeFontSize(size) {
    document.body.style.fontSize = size + 'px';
}

function updatePreview() {
    // Update preview panel with current theme settings
    const preview = document.querySelector('.preview-panel');
    if (preview) {
        preview.style.setProperty('--primary-color', getComputedStyle(document.documentElement).getPropertyValue('--primary-color'));
        preview.style.setProperty('--secondary-color', getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'));
    }
}

function exportTheme() {
    const theme = {
        primaryColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
        secondaryColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
        fontFamily: document.body.style.fontFamily || 'Inter',
        fontSize: document.body.style.fontSize || '16px',
        theme: currentTheme
    };
    
    const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fromnl-theme.json';
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Theme exported successfully!', 'success');
}

function importTheme() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const theme = JSON.parse(e.target.result);
                    
                    if (theme.primaryColor) setPrimaryColor(theme.primaryColor);
                    if (theme.secondaryColor) setSecondaryColor(theme.secondaryColor);
                    if (theme.fontFamily) changeFontFamily(theme.fontFamily);
                    if (theme.fontSize) changeFontSize(theme.fontSize);
                    if (theme.theme) setTheme(theme.theme);
                    
                    showNotification('Theme imported successfully!', 'success');
                } catch (error) {
                    showNotification('Invalid theme file!', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function resetTheme() {
    setTheme('light');
    setPrimaryColor('#1a472a');
    setSecondaryColor('#d4af37');
    changeFontFamily('Inter');
    changeFontSize('16');
    showNotification('Theme reset to default!', 'success');
}

function getStatusColor(status) {
    switch (status) {
        case 'active':
            return 'bg-green-100 text-green-800';
        case 'inactive':
            return 'bg-red-100 text-red-800';
        case 'out-of-stock':
            return 'bg-yellow-100 text-yellow-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${getNotificationClass(type)}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            opacity: [1, 0],
            translateX: [0, 100],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }
        });
    }, 3000);
}

function getNotificationClass(type) {
    switch (type) {
        case 'success':
            return 'bg-green-500 text-white';
        case 'warning':
            return 'bg-yellow-500 text-white';
        case 'error':
            return 'bg-red-500 text-white';
        default:
            return 'bg-blue-500 text-white';
    }
}

// Product management functions
function openAddProductModal() {
    currentEditId = null;
    document.getElementById('modal-title').textContent = 'Add New Product';
    document.getElementById('product-form').reset();
    document.getElementById('product-modal').classList.remove('hidden');
    
    // Animate modal
    anime({
        targets: '#product-modal .bg-white',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
}

function editProduct(productId) {
    currentEditId = productId;
    const product = products.find(p => p.id === productId);
    
    if (product) {
        document.getElementById('modal-title').textContent = 'Edit Product';
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-potency').value = product.potency;
        document.getElementById('product-strain').value = product.strain || '';
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-effects').value = product.effects || '';
        document.getElementById('product-usage').value = product.usage || '';
        document.getElementById('product-status').value = product.status;
        document.getElementById('product-featured').value = product.featured.toString();
        
        document.getElementById('product-modal').classList.remove('hidden');
        
        // Animate modal
        anime({
            targets: '#product-modal .bg-white',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
    currentEditId = null;
}

function handleProductSubmit(event) {
    event.preventDefault();
    
    const productData = {
        name: document.getElementById('product-name').value,
        price: parseFloat(document.getElementById('product-price').value),
        category: document.getElementById('product-category').value,
        stock: parseInt(document.getElementById('product-stock').value),
        potency: parseFloat(document.getElementById('product-potency').value) || 0,
        strain: document.getElementById('product-strain').value,
        description: document.getElementById('product-description').value,
        effects: document.getElementById('product-effects').value,
        usage: document.getElementById('product-usage').value,
        status: document.getElementById('product-status').value,
        featured: document.getElementById('product-featured').value === 'true',
        image: 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(document.getElementById('product-name').value)
    };
    
    if (currentEditId) {
        // Update existing product
        const index = products.findIndex(p => p.id === currentEditId);
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
        }
    } else {
        // Add new product
        const newProduct = {
            id: 'product-' + Date.now(),
            ...productData
        };
        products.push(newProduct);
    }
    
    filteredProducts = [...products];
    loadProducts();
    closeProductModal();
    showNotification(currentEditId ? 'Product updated successfully!' : 'Product added successfully!', 'success');
}

function handleImageUpload(event) {
    const files = event.target.files;
    const previews = document.getElementById('image-previews');
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.createElement('div');
                preview.className = 'image-preview';
                preview.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <div class="image-overlay">
                        <button type="button" onclick="this.parentElement.parentElement.remove()" class="bg-red-500 text-white p-2 rounded">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                `;
                previews.appendChild(preview);
            };
            reader.readAsDataURL(file);
        }
    });
}

function showDeleteModal(productId) {
    deleteProductId = productId;
    document.getElementById('delete-modal').classList.remove('hidden');
    
    // Animate modal
    anime({
        targets: '#delete-modal .bg-white',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
}

function closeDeleteModal() {
    document.getElementById('delete-modal').classList.add('hidden');
    deleteProductId = null;
}

function confirmDelete() {
    if (deleteProductId) {
        products = products.filter(p => p.id !== deleteProductId);
        filteredProducts = [...products];
        loadProducts();
        closeDeleteModal();
        showNotification('Product deleted successfully!', 'success');
    }
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
}

function showComingSoon() {
    showNotification('Coming soon! This feature is under development.', 'info');
}

// Check for age verification on page load
document.addEventListener('DOMContentLoaded', function() {
    const ageVerified = localStorage.getItem('ageVerified');
    const modal = document.getElementById('age-verification');
    
    // Check if we should redirect to captcha page
    if (!ageVerified && !window.location.pathname.includes('captcha.html')) {
        window.location.href = 'captcha.html';
        return;
    }
    
    if (modal && ageVerified !== 'true') {
        modal.style.display = 'flex';
    } else if (modal) {
        modal.style.display = 'none';
    }
    
    // Load dynamic pages
    loadDynamicPages();
    
    // Setup hidden admin access
    setupHiddenAdminAccess();
    
    // Load social media links
    loadSocialMediaLinks();
    
    // Initialize live support widget
    initializeLiveSupport();
});

// Dynamic page loading
function loadDynamicPages() {
    // Load pages from page management system
    const pages = JSON.parse(localStorage.getItem('customPages') || '[]');
    
    // Add pages to navigation if they should be in menu
    const navContainer = document.querySelector('nav .hidden.md\\:flex');
    if (navContainer) {
        pages.forEach(page => {
            if (page.inMenu && page.status === 'published') {
                const link = document.createElement('a');
                link.href = `pages/${page.slug}.html`;
                link.textContent = page.title;
                link.className = 'text-gray-700 hover:text-green-600 transition-colors';
                navContainer.appendChild(link);
            }
        });
    }
    
    // Add pages to footer
    const footerContainer = document.querySelector('footer .flex');
    if (footerContainer) {
        pages.forEach(page => {
            if (page.inFooter && page.status === 'published') {
                const link = document.createElement('a');
                link.href = `pages/${page.slug}.html`;
                link.textContent = page.title;
                link.className = 'text-gray-400 hover:text-white transition-colors';
                footerContainer.appendChild(link);
            }
        });
    }
}

// Hidden admin access functionality
function setupHiddenAdminAccess() {
    const adminTrigger = document.getElementById('admin-trigger');
    const adminLogin = document.getElementById('admin-login');
    
    if (adminTrigger) {
        adminTrigger.addEventListener('click', function() {
            adminLogin.classList.toggle('hidden');
            if (!adminLogin.classList.contains('hidden')) {
                document.getElementById('admin-password-input').focus();
            }
        });
    }
}

function checkAdminAccess() {
    const password = document.getElementById('admin-password-input').value;
    
    if (password === 'cash') {
        // Store encrypted admin session
        const encryptedSession = btoa('admin_' + Date.now() + '_' + Math.random().toString(36));
        localStorage.setItem('adminSession', encryptedSession);
        
        // Redirect to admin
        window.location.href = 'admin.html';
    } else {
        showNotification('Incorrect password', 'error');
        document.getElementById('admin-login').classList.add('hidden');
    }
}

// Social media links loader
function loadSocialMediaLinks() {
    // This can be extended to load from a configuration
    const socialConfig = {
        telegram: 'https://t.me/fromNLSupport',
        instagram: 'https://instagram.com/fromnl.top',
        twitter: 'https://twitter.com/fromnl_top',
        email: 'support@fromnl.top'
    };
    
    // Store for use in other functions
    window.socialConfig = socialConfig;
}

// Live support widget
function initializeLiveSupport() {
    // Create floating support widget
    const supportWidget = document.createElement('div');
    supportWidget.id = 'support-widget';
    supportWidget.className = 'fixed bottom-20 right-6 z-40';
    supportWidget.innerHTML = `
        <button onclick="openSupportChat()" class="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
        </button>
    `;
    
    document.body.appendChild(supportWidget);
}

function openSupportChat() {
    window.open('support.html', '_blank', 'width=800,height=600');
}

// Social media redirect functions
function openTelegram() {
    window.open(window.socialConfig?.telegram || 'https://t.me/fromNLSupport', '_blank');
}

function openInstagram() {
    window.open(window.socialConfig?.instagram || 'https://instagram.com/fromnl.top', '_blank');
}

function openTwitter() {
    window.open(window.socialConfig?.twitter || 'https://twitter.com/fromnl_top', '_blank');
}

function openEmail() {
    window.location.href = 'mailto:' + (window.socialConfig?.email || 'support@fromnl.top');
}

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.filterProducts = filterProducts;
window.filterByPrice = filterByPrice;
window.filterByPotency = filterByPotency;
window.toggleCart = toggleCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.scrollToProducts = scrollToProducts;
window.toggleMobileMenu = toggleMobileMenu;
window.openTelegramSupport = openTelegramSupport;
window.verifyAge = verifyAge;
window.toggleTheme = toggleTheme;
window.setTheme = setTheme;
window.setPrimaryColor = setPrimaryColor;
window.setSecondaryColor = setSecondaryColor;
window.changeFontFamily = changeFontFamily;
window.changeFontSize = changeFontSize;
window.exportTheme = exportTheme;
window.importTheme = importTheme;
window.resetTheme = resetTheme;
window.openAddProductModal = openAddProductModal;
window.editProduct = editProduct;
window.closeProductModal = closeProductModal;
window.handleProductSubmit = handleProductSubmit;
window.handleImageUpload = handleImageUpload;
window.showDeleteModal = showDeleteModal;
window.closeDeleteModal = closeDeleteModal;
window.confirmDelete = confirmDelete;
window.logout = logout;
window.showComingSoon = showComingSoon;
window.checkAdminAccess = checkAdminAccess;
window.openSupportChat = openSupportChat;
window.openTelegram = openTelegram;
window.openInstagram = openInstagram;
window.openTwitter = openTwitter;
window.openEmail = openEmail;