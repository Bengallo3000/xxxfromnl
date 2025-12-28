// fromNL.Top - Enhanced Admin JavaScript File

// Admin authentication with encryption
let isAuthenticated = false;
let adminPasswordHash = null;

// Initialize crypto utilities
const crypto = new CryptoUtil();
const simpleCrypto = new SimpleCrypto();

// Enhanced theme configuration
let themeConfig = {
    primaryColor: '#1a472a',
    secondaryColor: '#d4af37',
    fontFamily: 'Inter',
    fontSize: '16px',
    theme: 'light',
    shopName: 'fromNL.Top',
    shopSlogan: 'Premium Products from Netherlands',
    logo: '',
    wallpaper: '',
    layout: 'classic',
    cryptoAddresses: {
        BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        ETH: '0x742d35Cc6634C0532925a3b844Bc9e7595f',
        LTC: 'LcHKqPugJMCbKb2g4cPqCHqBcZvNq9pFVd',
        TRX: 'TXYZop4qF7gXxqY8G1a8y8pC1Y6G3qF2Z1',
        XMR: '47xZ1L7Bx3sRdQBqyH6Z9P1P6WkR6N6W1H6kQ9T8Y7U6'
    }
};

// Live ticker data
let tickerData = {
    BTC: { EUR: 38250, USD: 42500 },
    ETH: { EUR: 2400, USD: 2650 },
    XMR: { EUR: 180, USD: 200 }
};

// Mock data
const mockOrders = [
    { id: 'ORD001', customer: 'John Doe', amount: 95.00, payment: 'BTC', status: 'Completed', date: '2025-01-15', items: 3 },
    { id: 'ORD002', customer: 'Jane Smith', amount: 45.00, payment: 'ETH', status: 'Processing', date: '2025-01-14', items: 2 },
    { id: 'ORD003', customer: 'Bob Johnson', amount: 85.00, payment: 'XMR', status: 'Pending', date: '2025-01-13', items: 1 },
    { id: 'ORD004', customer: 'Alice Brown', amount: 120.00, payment: 'BTC', status: 'Completed', date: '2025-01-12', items: 4 },
    { id: 'ORD005', customer: 'Charlie Wilson', amount: 55.00, payment: 'ETH', status: 'Processing', date: '2025-01-11', items: 2 }
];

const mockTelegramUsers = 1247;

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('admin-dashboard')) {
        initializeAdmin();
    }
});

function initializeAdmin() {
    // Check for saved admin login
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showAdminDashboard();
    }
    
    // Load theme configuration
    loadThemeConfig();
    
    // Initialize live ticker
    initializeTicker();
    
    // Initialize matrix effect
    initializeMatrixEffect();
    
    // Load HoodPay config
    loadHoodPayConfig();
}

async function handleLogin(event) {
    event.preventDefault();
    const password = document.getElementById('admin-password').value;
    const errorMsg = document.getElementById('login-error');

    try {
        // Get stored password hash
        const storedHash = localStorage.getItem('adminPasswordHash');
        
        if (storedHash) {
            // Verify against stored hash
            const isValid = await crypto.verifyPassword(password, storedHash);
            if (isValid) {
                isAuthenticated = true;
                localStorage.setItem('adminLoggedIn', 'true');
                showAdminDashboard();
                return;
            }
        } else {
            // First time login or no hash stored - use default
            if (password === 'admin123') {
                isAuthenticated = true;
                localStorage.setItem('adminLoggedIn', 'true');
                showAdminDashboard();
                return;
            }
        }
        
        // Invalid password
        errorMsg.classList.remove('hidden');
        anime({
            targets: '#login-form',
            translateX: [-10, 10, -10, 10, 0],
            duration: 400,
            easing: 'easeInOutQuad'
        });
    } catch (error) {
        console.error('Login error:', error);
        errorMsg.classList.remove('hidden');
    }
}

function showAdminDashboard() {
    document.getElementById('login-overlay').style.display = 'none';
    document.getElementById('admin-dashboard').classList.remove('hidden');
    
    // Set last login time
    document.getElementById('last-login').textContent = new Date().toLocaleString();
    
    // Load dashboard data
    loadDashboardData();
    initializeCharts();
    applyThemeConfig();
    
    // Animate dashboard cards
    anime({
        targets: '.dashboard-card',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(100),
        easing: 'easeOutQuad'
    });
}

function loadDashboardData() {
    // Simulate loading dashboard statistics
    const stats = {
        revenue: 15420.50,
        orders: 203,
        products: 15,
        telegramUsers: mockTelegramUsers
    };

    // Animate counters
    animateCounter('total-revenue', stats.revenue, '€');
    animateCounter('total-orders', stats.orders);
    animateCounter('active-products', stats.products);
    animateCounter('telegram-users', stats.telegramUsers);
}

function animateCounter(elementId, targetValue, prefix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 1500;
    const startValue = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = startValue + (targetValue - startValue) * progress;
        
        if (prefix === '€') {
            element.textContent = prefix + currentValue.toFixed(2);
        } else {
            element.textContent = Math.floor(currentValue);
        }

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

function initializeCharts() {
    // Revenue Chart
    const revenueChart = echarts.init(document.getElementById('revenue-chart'));
    if (revenueChart) {
        const revenueOption = {
            tooltip: { trigger: 'axis' },
            xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
            },
            yAxis: { type: 'value' },
            series: [{
                data: [8200, 9500, 10800, 11200, 15420, 16200],
                type: 'line',
                smooth: true,
                itemStyle: { color: themeConfig.primaryColor },
                areaStyle: { 
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: themeConfig.primaryColor + '4D' },
                            { offset: 1, color: themeConfig.primaryColor + '0D' }
                        ]
                    }
                }
            }]
        };
        revenueChart.setOption(revenueOption);
    }

    // Category Chart
    const categoryChart = echarts.init(document.getElementById('category-chart'));
    if (categoryChart) {
        const categoryOption = {
            tooltip: { trigger: 'item' },
            series: [{
                type: 'pie',
                radius: '70%',
                data: [
                    { value: 35, name: 'Premium Flowers', itemStyle: { color: themeConfig.primaryColor } },
                    { value: 25, name: 'Concentrates', itemStyle: { color: themeConfig.secondaryColor } },
                    { value: 20, name: 'Edibles', itemStyle: { color: '#8B4513' } },
                    { value: 20, name: 'Magic Mushrooms', itemStyle: { color: '#32CD32' } }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        categoryChart.setOption(categoryOption);
    }
}

function loadThemeConfig() {
    // Load saved theme configuration
    const savedConfig = localStorage.getItem('themeConfig');
    if (savedConfig) {
        themeConfig = { ...themeConfig, ...JSON.parse(savedConfig) };
    }
    applyThemeConfig();
}

function applyThemeConfig() {
    // Apply theme configuration to the page
    document.documentElement.style.setProperty('--primary-color', themeConfig.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', themeConfig.secondaryColor);
    document.body.style.fontFamily = themeConfig.fontFamily + ', sans-serif';
    document.body.style.fontSize = themeConfig.fontSize;
    
    // Update shop identity
    document.getElementById('shop-name-input').value = themeConfig.shopName;
    document.getElementById('shop-slogan').value = themeConfig.shopSlogan;
    
    // Update all shop name elements
    document.querySelectorAll('#shop-name, #nav-shop-name, #preview-shop-name, #ticker-shop-name').forEach(el => {
        if (el) el.textContent = themeConfig.shopName;
    });
    
    document.querySelectorAll('#preview-shop-slogan').forEach(el => {
        if (el) el.textContent = themeConfig.shopSlogan;
    });
    
    // Update logo
    if (themeConfig.logo) {
        document.querySelectorAll('#nav-logo, #preview-logo-small').forEach(el => {
            if (el) {
                el.src = themeConfig.logo;
                el.classList.remove('hidden');
            }
        });
    }
    
    // Update wallpaper
    if (themeConfig.wallpaper) {
        document.body.style.backgroundImage = `url(${themeConfig.wallpaper})`;
    }
    
    // Update form controls
    const fontSelector = document.getElementById('font-selector');
    const sizeSelector = document.getElementById('size-selector');
    
    if (fontSelector) fontSelector.value = themeConfig.fontFamily;
    if (sizeSelector) sizeSelector.value = themeConfig.fontSize.replace('px', '');
    
    // Update theme radio buttons
    document.querySelectorAll('input[name="theme"]').forEach(radio => {
        radio.checked = radio.value === themeConfig.theme;
    });
    
    updatePreview();
}

function updateShopName(name) {
    themeConfig.shopName = name;
    document.querySelectorAll('#shop-name, #nav-shop-name, #preview-shop-name, #ticker-shop-name').forEach(el => {
        if (el) el.textContent = name;
    });
    saveThemeConfig();
}

function updateShopSlogan(slogan) {
    themeConfig.shopSlogan = slogan;
    document.querySelectorAll('#preview-shop-slogan').forEach(el => {
        if (el) el.textContent = slogan;
    });
    saveThemeConfig();
}

function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            themeConfig.logo = e.target.result;
            document.querySelectorAll('#nav-logo, #preview-logo-small').forEach(el => {
                if (el) {
                    el.src = e.target.result;
                    el.classList.remove('hidden');
                }
            });
            saveThemeConfig();
            showNotification('Logo uploaded successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
}

function handleWallpaperUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            themeConfig.wallpaper = e.target.result;
            document.body.style.backgroundImage = `url(${e.target.result})`;
            saveThemeConfig();
            showNotification('Wallpaper uploaded successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
}

function removeWallpaper() {
    themeConfig.wallpaper = '';
    document.body.style.backgroundImage = 'none';
    saveThemeConfig();
    showNotification('Wallpaper removed!', 'success');
}

function setMatrixWallpaper() {
    themeConfig.wallpaper = 'matrix';
    document.body.classList.add('matrix-bg');
    document.getElementById('matrix-canvas').classList.remove('hidden');
    saveThemeConfig();
    showNotification('Matrix wallpaper applied!', 'success');
}

function selectLayout(layout) {
    themeConfig.layout = layout;
    
    // Remove selected class from all layouts
    document.querySelectorAll('.layout-preview').forEach(preview => {
        preview.classList.remove('selected');
    });
    
    // Add selected class to clicked layout
    event.target.closest('.layout-preview').classList.add('selected');
    
    saveThemeConfig();
    showNotification(`${layout} layout selected!`, 'success');
}

function setPrimaryColor(color) {
    themeConfig.primaryColor = color;
    document.documentElement.style.setProperty('--primary-color', color);
    updatePreview();
    saveThemeConfig();
}

function setSecondaryColor(color) {
    themeConfig.secondaryColor = color;
    document.documentElement.style.setProperty('--secondary-color', color);
    updatePreview();
    saveThemeConfig();
}

function changeFontFamily(font) {
    themeConfig.fontFamily = font;
    document.body.style.fontFamily = font + ', sans-serif';
    saveThemeConfig();
}

function changeFontSize(size) {
    themeConfig.fontSize = size + 'px';
    document.body.style.fontSize = size + 'px';
    saveThemeConfig();
}

function setTheme(theme) {
    themeConfig.theme = theme;
    
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--primary-color', '#d4af37');
        document.documentElement.style.setProperty('--secondary-color', '#1a472a');
        document.documentElement.style.setProperty('--accent-color', '#1a1a1a');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--bg-color', '#0f0f0f');
        document.body.classList.add('theme-dark');
    } else {
        document.documentElement.style.setProperty('--primary-color', themeConfig.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', themeConfig.secondaryColor);
        document.documentElement.style.setProperty('--accent-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#2d3748');
        document.documentElement.style.setProperty('--bg-color', '#f8f9fa');
        document.body.classList.remove('theme-dark');
    }
    
    updatePreview();
    saveThemeConfig();
}

function updatePreview() {
    // Update preview panel with current theme settings
    const previewTitle = document.querySelector('.preview-panel h4');
    const previewButton = document.querySelector('.preview-panel button');
    
    if (previewTitle) {
        previewTitle.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    }
    
    if (previewButton) {
        previewButton.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    }
}

function saveCryptoAddresses() {
    themeConfig.cryptoAddresses = {
        BTC: document.getElementById('btc-address').value,
        ETH: document.getElementById('eth-address').value,
        LTC: document.getElementById('ltc-address').value,
        TRX: document.getElementById('trx-address').value,
        XMR: document.getElementById('xmr-address').value
    };
    saveThemeConfig();
    showNotification('Crypto addresses saved successfully!', 'success');
}

function exportTheme() {
    const blob = new Blob([JSON.stringify(themeConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fromnl-complete-theme.json';
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Complete theme exported successfully!', 'success');
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
                    const importedConfig = JSON.parse(e.target.result);
                    themeConfig = { ...themeConfig, ...importedConfig };
                    applyThemeConfig();
                    saveThemeConfig();
                    showNotification('Complete theme imported successfully!', 'success');
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
    themeConfig = {
        primaryColor: '#1a472a',
        secondaryColor: '#d4af37',
        fontFamily: 'Inter',
        fontSize: '16px',
        theme: 'light',
        shopName: 'fromNL.Top',
        shopSlogan: 'Premium Products from Netherlands',
        logo: '',
        wallpaper: '',
        layout: 'classic',
        cryptoAddresses: {
            BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            ETH: '0x742d35Cc6634C0532925a3b844Bc9e7595f',
            XMR: '47xZ1L7Bx3sRdQBqyH6Z9P1P6WkR6N6W1H6kQ9T8Y7U6'
        }
    };
    
    applyThemeConfig();
    saveThemeConfig();
    showNotification('Theme reset to default!', 'success');
}

function initializeTicker() {
    // Update ticker with current prices
    const ticker = document.querySelector('.ticker-content');
    if (ticker) {
        updateTicker();
        setInterval(updateTicker, 60000); // Update every minute
    }
}

function updateTicker() {
    const ticker = document.querySelector('.ticker-content');
    if (ticker) {
        ticker.innerHTML = `
            <span class="mx-8">BTC: €${tickerData.BTC.EUR.toLocaleString()} | ETH: €${tickerData.ETH.EUR.toLocaleString()} | XMR: €${tickerData.XMR.EUR.toLocaleString()} | </span>
            <span class="mx-8">Shop: ${themeConfig.shopName} | Live Support Available 24/7 | </span>
            <span class="mx-8">Premium Products from Netherlands | Discreet Shipping Worldwide | </span>
        `;
    }
}

function initializeMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()_+-=[]{}|;:,.<>?";
    const matrixArray = matrix.split("");
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#00FF41";
        ctx.font = fontSize + "px monospace";
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    if (themeConfig.wallpaper === 'matrix') {
        setInterval(drawMatrix, 35);
    }
}

function showPageManager() {
    showNotification('Page Manager coming soon!', 'info');
}

// HoodPay functionality
function toggleHoodPay() {
    const enabled = document.getElementById('hoodpay-enabled').checked;
    const config = document.getElementById('hoodpay-config');
    
    if (enabled) {
        config.classList.remove('hidden');
    } else {
        config.classList.add('hidden');
    }
    
    // Save setting
    themeConfig.hoodpayEnabled = enabled;
    saveThemeConfig();
}

function saveHoodPayConfig() {
    const apiKey = document.getElementById('hoodpay-api-key').value;
    const secretKey = document.getElementById('hoodpay-secret-key').value;
    
    if (!apiKey || !secretKey) {
        showNotification('Please enter both API key and Secret key', 'error');
        return;
    }
    
    // In a real implementation, you would encrypt these keys
    themeConfig.hoodpayConfig = {
        apiKey: apiKey,
        secretKey: secretKey,
        webhook: 'https://fromnl.top/webhook/hoodpay'
    };
    
    saveThemeConfig();
    showNotification('HoodPay configuration saved!', 'success');
}

function loadHoodPayConfig() {
    const saved = localStorage.getItem('themeConfig');
    if (saved) {
        const config = JSON.parse(saved);
        if (config.hoodpayEnabled !== undefined) {
            document.getElementById('hoodpay-enabled').checked = config.hoodpayEnabled;
            if (config.hoodpayEnabled) {
                document.getElementById('hoodpay-config').classList.remove('hidden');
            }
        }
        
        if (config.hoodpayConfig) {
            document.getElementById('hoodpay-api-key').value = config.hoodpayConfig.apiKey || '';
            document.getElementById('hoodpay-secret-key').value = config.hoodpayConfig.secretKey || '';
        }
    }
}

function saveThemeConfig() {
    localStorage.setItem('themeConfig', JSON.stringify(themeConfig));
}

function loadCryptoAddresses() {
    const saved = localStorage.getItem('themeConfig');
    if (saved) {
        const config = JSON.parse(saved);
        if (config.cryptoAddresses) {
            themeConfig.cryptoAddresses = config.cryptoAddresses;
            
            // Update form fields
            document.getElementById('btc-address').value = config.cryptoAddresses.BTC || '';
            document.getElementById('eth-address').value = config.cryptoAddresses.ETH || '';
            document.getElementById('ltc-address').value = config.cryptoAddresses.LTC || '';
            document.getElementById('trx-address').value = config.cryptoAddresses.TRX || '';
            document.getElementById('xmr-address').value = config.cryptoAddresses.XMR || '';
        }
    }
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminSession');
    localStorage.removeItem('themeConfig');
    isAuthenticated = false;
    window.location.href = 'index.html';
}

// Password change functionality
function showPasswordChange() {
    document.getElementById('password-modal').classList.remove('hidden');
    document.getElementById('current-password').focus();
}

function closePasswordModal() {
    document.getElementById('password-modal').classList.add('hidden');
    document.getElementById('password-form').reset();
}

async function handlePasswordChange(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Validate inputs
    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('Password must be at least 8 characters long', 'error');
        return;
    }
    
    try {
        // Verify current password
        const storedHash = localStorage.getItem('adminPasswordHash');
        let isValid = false;
        
        if (storedHash) {
            isValid = await crypto.verifyPassword(currentPassword, storedHash);
        } else {
            // Check against default password
            isValid = currentPassword === 'admin123';
        }
        
        if (!isValid) {
            showNotification('Current password is incorrect', 'error');
            return;
        }
        
        // Hash and save new password
        const newHash = await crypto.hashPassword(newPassword);
        localStorage.setItem('adminPasswordHash', newHash);
        
        closePasswordModal();
        showNotification('Password changed successfully!', 'success');
        
    } catch (error) {
        console.error('Password change error:', error);
        showNotification('Error changing password', 'error');
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
