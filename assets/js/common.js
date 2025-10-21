// Common JavaScript functions for Client

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
}

// Show alert
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = message;

    alertContainer.appendChild(alertDiv);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Add to cart (fake implementation)
async function addToCart(productId, quantity = 1, variantId = null) {
    try {
        // Wait for MockDataService with timeout
        let attempts = 0;
        while (!window.MockDataService && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (window.MockDataService) {
            const result = await window.MockDataService.fakeAddToCart(productId, quantity);
            if (result.success) {
                showAlert(result.message, 'success');
                updateCartCount();
            }
        } else {
            // Fallback if MockDataService not available
            showAlert('Thêm vào giỏ hàng thành công!', 'success');
            updateCartCount();
        }
    } catch (error) {
        showAlert('Có lỗi xảy ra khi thêm vào giỏ hàng', 'error');
    }
}

// Update cart count
async function updateCartCount() {
    // Try to find cart count element with different possible IDs
    const cartCountElement = document.getElementById('cartCount') ||
                            document.getElementById('cart-count');

    if (!cartCountElement) {
        return;
    }

    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            cartCountElement.textContent = '0';
            cartCountElement.style.display = 'inline'; // Luôn hiển thị
            return;
        }

        let count = 0;
        if (window.MockDataService) {
            count = await window.MockDataService.getCartCount(userId);
        } else {
            count = 0;
        }

        cartCountElement.textContent = count;
        cartCountElement.style.display = 'inline'; // Luôn hiển thị
        console.log('Cart count updated:', count);
    } catch (error) {
        console.error('Error updating cart count:', error);
        cartCountElement.textContent = '0';
        cartCountElement.style.display = 'inline'; // Luôn hiển thị
    }
}

// Add to wishlist
function addToWishlist(productId) {
    // Get current wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Check if product already exists in wishlist
    if (!wishlist.includes(productId)) {
        // Add product to wishlist
        wishlist.push(productId);

        // Save updated wishlist to localStorage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        // Show success message
        showAlert('Sản phẩm đã được thêm vào danh sách yêu thích!', 'success');
    } else {
        // Show info message
        showAlert('Sản phẩm đã có trong danh sách yêu thích!', 'info');
    }

    // Update wishlist count
    updateWishlistCount();
}

// Update wishlist count
function updateWishlistCount() {
    const wishlistCountElement = document.getElementById('wishlistCount');
    if (!wishlistCountElement) return;

    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    wishlistCountElement.textContent = wishlist.length;
}

// API request helper
async function apiRequest(endpoint, method = 'GET', data = null) {
    try {
        // Mock data mode - no real API calls
        throw new Error('API calls disabled - using mock data only');

        const headers = {
            'Content-Type': 'application/json'
        };

        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const options = {
            method,
            headers
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        // Handle ApiResponse wrapper from backend
        if (responseData.data !== undefined) {
            return responseData.data;
        }

        return responseData;
    } catch (error) {
        throw error;
    }
}

// Get data from API
async function fetchData(endpoint) {
    try {
        return await apiRequest(`/api/${endpoint}`);
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return null;
    }
}

// Create star rating HTML
function createStarRating(rating) {
    const fullStar = '<i class="fas fa-star"></i>';
    const halfStar = '<i class="fas fa-star-half-alt"></i>';
    const emptyStar = '<i class="far fa-star"></i>';

    let stars = '';

    // Add full stars
    for (let i = 1; i <= Math.floor(rating); i++) {
        stars += fullStar;
    }

    // Add half star if needed
    if (rating % 1 !== 0) {
        stars += halfStar;
    }

    // Add empty stars
    for (let i = Math.ceil(rating); i < 5; i++) {
        stars += emptyStar;
    }

    return `<div class="product-rating">${stars} <span>(${rating})</span></div>`;
}

// Generate product card HTML
function generateProductCard(product) {
    const discountPercent = product.salePrice && product.price > product.salePrice
        ? Math.round((1 - product.salePrice / product.price) * 100)
        : 0;

    const discountBadge = discountPercent > 0
        ? `<span class="product-badge">-${discountPercent}%</span>`
        : '';

    const priceHTML = discountPercent > 0
        ? `<div class="product-price">
            <span class="current-price">${formatCurrency(product.salePrice)}</span>
            <span class="old-price">${formatCurrency(product.price)}</span>
           </div>`
        : `<div class="product-price">
            <span class="current-price">${formatCurrency(product.price)}</span>
           </div>`;

    // Sử dụng image thay vì thumbnail cho quần áo
    const imageUrl = product.image || product.thumbnail || 'assets/image/default-image.avif';

    return `
        <div class="product-card">
            <div class="product-image">
                ${discountBadge}
                <a href="product-detail.html?id=${product.id}">
                    <img src="${imageUrl}" alt="${product.name}">
                </a>
                <div class="product-actions">
                    <button class="btn-action" onclick="addToWishlist(${product.id})">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="btn-action" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="btn-action" onclick="quickView(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">
                    <a href="product-detail.html?id=${product.id}">${product.name}</a>
                </h3>
                ${createStarRating(product.rating || 0)}
                ${priceHTML}
            </div>
        </div>
    `;
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('userId') !== null;
}

// Show loading spinner
function showLoading() {
    // Create loading spinner if it doesn't exist
    if (!document.getElementById('loadingSpinner')) {
        const spinner = document.createElement('div');
        spinner.id = 'loadingSpinner';
        spinner.className = 'loading-spinner';
        spinner.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(spinner);
    }

    // Show spinner
    document.getElementById('loadingSpinner').style.display = 'flex';
}

// Hide loading spinner
function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast show bg-${type} text-white`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
        <div class="toast-header bg-${type} text-white">
            <strong class="me-auto">${type === 'success' ? 'Thành công' : type === 'danger' ? 'Lỗi' : 'Thông báo'}</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;

    // Add toast to container
    document.querySelector('.toast-container').appendChild(toast);

    // Auto dismiss after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Load header and footer
async function loadHeaderAndFooter() {
    try {

        // All files are now in root directory
        const basePath = '';


        // Load header
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            const headerPath = basePath + 'layout/header.html';
            const headerResponse = await fetch(headerPath);

            if (headerResponse.ok) {
                const headerHtml = await headerResponse.text();
                headerContainer.innerHTML = headerHtml;

                // Wait a bit for DOM to be ready, then update header auth state
                setTimeout(() => {

                    // Try to find and call the function
                    if (window.updateHeaderAuthState) {
                        window.updateHeaderAuthState();
                    } else {

                        // Try to execute the script manually
                        const scripts = headerContainer.querySelectorAll('script');
                        scripts.forEach(script => {
                            try {
                                eval(script.textContent);
                            } catch (e) {
                            }
                        });

                        // Try again after script execution
                        setTimeout(() => {
                            if (window.updateHeaderAuthState) {
                                window.updateHeaderAuthState();
                            } else {
                            }
                        }, 50);
                    }
                }, 100);
            } else {
            }
        }

        // Load footer
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            const footerPath = basePath + 'layout/footer.html';
            const footerResponse = await fetch(footerPath);
            if (footerResponse.ok) {
                const footerHtml = await footerResponse.text();
                footerContainer.innerHTML = footerHtml;
            } else {
            }
        }
    } catch (error) {
    }
}

// Update authentication UI
function updateAuthUI() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const userDropdown = document.getElementById('user-dropdown');
    const logoutNav = document.getElementById('logout-nav');
    const myOrdersNav = document.getElementById('my-orders-nav');
    if (isLoggedIn()) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userDropdown) userDropdown.style.display = '';
        if (logoutNav) logoutNav.style.display = '';
        if (myOrdersNav) myOrdersNav.style.display = '';
    } else {
        if (loginBtn) loginBtn.style.display = '';
        if (registerBtn) registerBtn.style.display = '';
        if (userDropdown) userDropdown.style.display = 'none';
        if (logoutNav) logoutNav.style.display = 'none';
        if (myOrdersNav) myOrdersNav.style.display = 'none';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    showToast('Đăng xuất thành công');
    setTimeout(() => {
        window.location.href = '/index.html';
    }, 1000);
}

// Document ready
document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadHeaderAndFooter();

    // Update cart and wishlist counts
    updateCartCount();
    updateWishlistCount();

    // Initialize back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
