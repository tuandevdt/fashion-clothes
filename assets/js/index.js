// JavaScript for Home Page

// Load mock data service first
function loadMockDataService() {
    return new Promise((resolve, reject) => {
        if (window.MockDataService) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'assets/data/mock-data-service.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load mock data service first
        await loadMockDataService();
        
        // Load layout components
        loadLayoutComponents();

        // Load data
        loadCategories();
        loadProducts();
        loadBlogs();

        // Lắng nghe sự kiện click cho danh mục (event delegation)
        document.getElementById('featured-categories-container').addEventListener('click', function(e) {
            const btn = e.target.closest('.btn-view-category');
            if (btn) {
                const categoryId = btn.getAttribute('data-category-id');
                const categoryName = btn.getAttribute('data-category-name');
                filterProductsByCategory(categoryId, categoryName);
            }
        });

        // Lắng nghe sự kiện click cho nút "Xem tất cả sản phẩm"
        document.getElementById('btn-view-all-products').addEventListener('click', function() {
            window.location.href = 'products.html';
        });
    } catch (error) {
        console.error('Error initializing home page:', error);
    }
});

// Helper: Chuẩn hóa đường dẫn ảnh
function normalizeImageUrl(url) {
    if (!url) return 'assets/image/default-image.avif';
    if (url.startsWith('http')) return url;
    return url.startsWith('/') ? url.substring(1) : url;
}

// Load layout components
function loadLayoutComponents() {
    // Load header
    fetch('layout/header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header-container').innerHTML = html;
        });

    // Load footer
    fetch('layout/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-container').innerHTML = html;
        });
}

// Load categories
async function loadCategories() {
    try {
        const categories = await apiService.getCategories();
        const container = document.getElementById('featured-categories-container');
        
        // Clear loading spinner
        container.innerHTML = '';
        
        // Display categories
        const categoriesToDisplay = categories.filter(category => category.image || true).slice(0, 3);

        if (categoriesToDisplay.length === 0) {
             container.innerHTML = `
                <div class="col-12 text-center text-muted">
                    <p>Không tìm thấy danh mục.</p>
                </div>
            `;
            return;
        }

        categoriesToDisplay.forEach(category => {
            const categoryHtml = `
                <div class="col-md-4 mb-4">
                    <div class="category-card">
                        <img src="${normalizeImageUrl(category.image)}" alt="${category.name}" class="img-fluid">
                        <div class="category-overlay">
                            <h3>${category.name}</h3>
                            <button class="btn btn-outline-light btn-view-category" data-category-id="${category.id}" data-category-name="${category.name}">Xem thêm</button>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += categoryHtml;
        });
    } catch (error) {
        console.error('Error loading categories:', error);
        document.getElementById('featured-categories-container').innerHTML = `
            <div class="col-12 text-center text-danger">
                <p>Không thể tải danh mục. Vui lòng thử lại sau.</p>
            </div>
        `;
    }
}

// Load products
async function loadProducts() {
    try {
        const response = await apiService.getProducts(0, 8);
        const products = response.content || response;
        const container = document.getElementById('featured-products-container');
        
        // Clear loading spinner
        container.innerHTML = '';

         if ((Array.isArray(products) && products.length === 0) || (!Array.isArray(products) && !products)) {
             container.innerHTML = `
                <div class="col-12 text-center text-muted">
                    <p>Không tìm thấy sản phẩm.</p>
                </div>
            `;
            return;
        }
        
        // Display products
        products.forEach(product => {
            const imageUrl = normalizeImageUrl(product.image);
            const price = product.salePrice || product.price;
            const originalPrice = product.salePrice ? product.price : null;

            const productHtml = `
                <div class="col-md-3 mb-4">
                    <div class="card h-100">
                        <img src="${imageUrl}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.name}</h5>
                            <div class="price-section mb-2">
                                <p class="card-text text-danger fw-bold mb-1">${formatCurrency(price)}</p>
                                ${originalPrice ? `<small class="text-muted text-decoration-line-through">${formatCurrency(originalPrice)}</small>` : ''}
                            </div>
                            <div class="d-flex justify-content-between mt-auto">
                                <a href="product-detail.html?id=${product.id}" class="btn btn-outline-primary">Chi tiết</a>
                                <button class="btn btn-primary" onclick="addToCart(${product.id})">
                                    <i class="fas fa-shopping-cart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += productHtml;
        });
        // Hiện lại nút xem tất cả sản phẩm
        document.getElementById('btn-view-all-products').classList.add('d-inline-block');
        document.getElementById('btn-view-all-products').classList.remove('d-none');
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('featured-products-container').innerHTML = `
            <div class="col-12 text-center text-danger">
                <p>Không thể tải sản phẩm. Vui lòng thử lại sau.</p>
            </div>
        `;
    }
}

// Lọc sản phẩm theo danh mục - chuyển hướng đến trang sản phẩm
function filterProductsByCategory(categoryId, categoryName) {
    // Chuyển hướng đến trang sản phẩm với categoryId
    window.location.href = `products.html?categoryId=${categoryId}`;
}

// Load blogs
async function loadBlogs() {
    try {
        // Sử dụng apiService thay vì axios trực tiếp
        const response = await apiService.getBlogs({ limit: 5, page: 0 });
        const blogs = response.content || [];
        const container = document.getElementById('latest-posts-container');

        // Clear loading spinner
        container.innerHTML = '';

        if (blogs.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center text-muted">
                    <p>Không tìm thấy bài viết.</p>
                </div>
            `;
            return;
        }

        // Display blogs - hiển thị ảnh, id và title
        blogs.forEach(blog => {
            // Sử dụng ảnh từ mock data hoặc ảnh mặc định
            let imageUrl = blog.image || 'assets/image/default-image.avif';

            const formattedDate = formatDate(blog.createDate);

            const blogHtml = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="${imageUrl}" class="card-img-top" alt="${blog.title}" style="height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${blog.title}</h5>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <small class="text-muted">${formattedDate}</small>
                                <a href="blog-detail.html?id=${blog.id}" class="btn btn-outline-primary btn-sm">Đọc thêm</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += blogHtml;
        });
    } catch (error) {
        document.getElementById('latest-posts-container').innerHTML = `
            <div class="col-12 text-center text-danger">
                <p>Không thể tải bài viết. Vui lòng thử lại sau.</p>
            </div>
        `;
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

// Add to cart function (fake implementation)
async function addToCart(productId) {
    try {
        // Wait for MockDataService with timeout
        let attempts = 0;
        while (!window.MockDataService && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (window.MockDataService) {
            const result = await window.MockDataService.fakeAddToCart(productId, 1);
            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm vào giỏ hàng thành công!',
                    text: result.message,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        } else {
            // Fallback
            Swal.fire({
                icon: 'success',
                title: 'Thêm vào giỏ hàng thành công!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }
        
        updateCartCount();
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Chức năng đang phát triển',
            confirmButtonText: 'OK'
        });
    }
}
