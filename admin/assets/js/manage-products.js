// Pagination variables
let currentPage = 0;
const itemsPerPage = 10;
let totalProducts = 0;
let allProducts = [];

document.addEventListener('DOMContentLoaded', function() {
  // Kiểm tra đăng nhập
  if (!checkAuth()) {
    return;
  }

  // Load layout components
  loadLayoutComponents();

  // Initialize page
  initializePage();
});

function initializePage() {
  // Load products data
  loadProductsData();
  
  // Load categories for filter
  loadCategoriesForFilter();
  
  // Setup event handlers
  setupEventHandlers();
}

async function loadCategoriesForFilter() {
  try {
    let categories = [];
    
    if (window.MockDataService) {
      categories = await window.MockDataService.getCategories();
    }
    
    const categoryFilter = document.getElementById('filterCategory');
    if (categoryFilter && categories.length > 0) {
      categoryFilter.innerHTML = '<option value="">Tất cả danh mục</option>' + 
        categories.map(category => 
          `<option value="${category.id}">${category.name}</option>`
        ).join('');
    }
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

async function loadProductsData() {
  try {
    let products = [];
    
    // Use mock data
    if (window.MockDataService) {
      const productsData = await window.MockDataService.getProducts(0, 100);
      allProducts = productsData.content || [];
      totalProducts = allProducts.length;
    }
    
    displayProducts(getCurrentPageProducts());
    updateProductStats(allProducts);
    updatePagination();
    
  } catch (error) {
    console.error('Error loading products:', error);
    showErrorToast('Không thể tải danh sách sản phẩm');
  }
}

function getCurrentPageProducts() {
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return allProducts.slice(startIndex, endIndex);
}

function updatePagination() {
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const paginationElement = document.getElementById('pagination');
  
  if (!paginationElement || totalPages <= 1) {
    if (paginationElement) paginationElement.innerHTML = '';
    return;
  }

  let paginationHtml = '<nav><ul class="pagination justify-content-center">';
  
  // Previous button
  paginationHtml += `<li class="page-item ${currentPage === 0 ? 'disabled' : ''}">
    <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">&laquo;</a>
  </li>`;
  
  // Page numbers
  for (let i = 0; i < totalPages; i++) {
    paginationHtml += `<li class="page-item ${i === currentPage ? 'active' : ''}">
      <a class="page-link" href="#" onclick="changePage(${i})">${i + 1}</a>
    </li>`;
  }
  
  // Next button
  paginationHtml += `<li class="page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}">
    <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">&raquo;</a>
  </li>`;
  
  paginationHtml += '</ul></nav>';
  paginationElement.innerHTML = paginationHtml;
  
  // Update page info
  const pageInfoElement = document.getElementById('pageInfo');
  if (pageInfoElement) {
    const startItem = currentPage * itemsPerPage + 1;
    const endItem = Math.min(startItem + itemsPerPage - 1, totalProducts);
    pageInfoElement.textContent = `Hiển thị ${startItem}-${endItem} của ${totalProducts} sản phẩm`;
  }
}

function changePage(newPage) {
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  if (newPage >= 0 && newPage < totalPages) {
    currentPage = newPage;
    displayProducts(getCurrentPageProducts());
    updatePagination();
  }
}

function displayProducts(products) {
  const tableBody = document.getElementById('productTable');
  if (!tableBody) {
    console.error('Table body with id "productTable" not found');
    return;
  }

  if (products.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="8" class="text-center">Không có sản phẩm nào</td></tr>';
    return;
  }

  tableBody.innerHTML = products.map((product, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>
        <img src="${product.image || '../assets/image/default-image.avif'}" 
             alt="${product.name}" class="product-image"
             style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
      </td>
      <td>
        <strong>${product.name}</strong><br>
        <small class="text-muted">SKU: ${product.sku || 'N/A'}</small>
      </td>
      <td>${product.category || 'N/A'}</td>
      <td>${formatCurrency(product.price || 0)}</td>
      <td>
        ${product.salePrice ? `
          <span class="text-success">${formatCurrency(product.salePrice)}</span><br>
          <small class="text-muted">Giá gốc: ${formatCurrency(product.price)}</small>
        ` : ''}
      </td>
      <td>
        <span class="badge ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}">
          ${product.stock || 0}
        </span>
      </td>
      <td>
        <span class="badge ${product.featured ? 'bg-primary' : 'bg-secondary'}">
          ${product.featured ? 'Nổi bật' : 'Thường'}
        </span>
      </td>
      <td>
        <div class="btn-group btn-group-sm" role="group">
          <button type="button" class="btn btn-outline-primary" onclick="editProduct(${product.id})" title="Chỉnh sửa">
            <i class="bi bi-pencil"></i>
          </button>
          <button type="button" class="btn btn-outline-danger" onclick="deleteProduct(${product.id})" title="Xóa">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Các hàm xử lý CRUD
function editProduct(id) {
  showWarningToast('Chức năng đang phát triển');
}

function deleteProduct(id) {
  showWarningToast('Chức năng đang phát triển');
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

function updateProductStats(products) {
  // Update stats if elements exist
  const totalProductsEl = document.getElementById('totalProducts');
  const totalValueEl = document.getElementById('totalValue');
  const lowStockEl = document.getElementById('lowStock');
  const featuredEl = document.getElementById('featuredProducts');

  if (totalProductsEl) {
    totalProductsEl.textContent = products.length;
  }

  if (totalValueEl) {
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
    totalValueEl.textContent = formatCurrency(totalValue);
  }

  if (lowStockEl) {
    const lowStockCount = products.filter(p => p.stock < 10).length;
    lowStockEl.textContent = lowStockCount;
  }

  if (featuredEl) {
    const featuredCount = products.filter(p => p.featured).length;
    featuredEl.textContent = featuredCount;
  }
}

function setupEventHandlers() {
  // Add new product button
  const btnAdd = document.getElementById('btnAddProduct');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      showWarningToast('Chức năng đang phát triển');
    });
  }

  // Save product button
  const btnSave = document.getElementById('btnSaveProduct');
  if (btnSave) {
    btnSave.addEventListener('click', () => {
      showWarningToast('Chức năng đang phát triển');
    });
  }

  // Override all edit/delete buttons
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-edit') || e.target.classList.contains('btn-delete') || 
        e.target.closest('.btn-edit') || e.target.closest('.btn-delete')) {
      e.preventDefault();
      showWarningToast('Chức năng đang phát triển');
    }
  });

  // Search functionality - keep this working
  const searchInput = document.getElementById('searchProducts');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // Category filter - keep this working
  const categoryFilter = document.getElementById('filterCategory');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', handleCategoryFilter);
  }
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase().trim();
  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
  currentPage = 0;
  displayFilteredProducts(filteredProducts);
}

function handleCategoryFilter(event) {
  const categoryId = parseInt(event.target.value);
  let filteredProducts = allProducts;
  
  if (categoryId) {
    filteredProducts = allProducts.filter(product => product.categoryId === categoryId);
  }
  
  currentPage = 0;
  displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(products) {
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  displayProducts(paginatedProducts);
  updatePaginationForFiltered(products.length);
}

function updatePaginationForFiltered(totalCount) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const paginationElement = document.getElementById('pagination');
  
  if (!paginationElement || totalPages <= 1) {
    if (paginationElement) paginationElement.innerHTML = '';
    return;
  }

  let paginationHtml = '<nav><ul class="pagination justify-content-center">';
  
  // Previous button
  paginationHtml += `<li class="page-item ${currentPage === 0 ? 'disabled' : ''}">
    <a class="page-link" href="#" onclick="changeFilteredPage(${currentPage - 1})">&laquo;</a>
  </li>`;
  
  // Page numbers
  for (let i = 0; i < totalPages; i++) {
    paginationHtml += `<li class="page-item ${i === currentPage ? 'active' : ''}">
      <a class="page-link" href="#" onclick="changeFilteredPage(${i})">${i + 1}</a>
    </li>`;
  }
  
  // Next button
  paginationHtml += `<li class="page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}">
    <a class="page-link" href="#" onclick="changeFilteredPage(${currentPage + 1})">&raquo;</a>
  </li>`;
  
  paginationHtml += '</ul></nav>';
  paginationElement.innerHTML = paginationHtml;
  
  // Update page info
  const pageInfoElement = document.getElementById('pageInfo');
  if (pageInfoElement) {
    const startItem = currentPage * itemsPerPage + 1;
    const endItem = Math.min(startItem + itemsPerPage - 1, totalCount);
    pageInfoElement.textContent = `Hiển thị ${startItem}-${endItem} của ${totalCount} sản phẩm`;
  }
}

function changeFilteredPage(newPage) {
  // This will be called by filtered pagination
  const searchInput = document.getElementById('searchProducts');
  const categoryFilter = document.getElementById('filterCategory');
  
  let filteredProducts = allProducts;
  
  if (searchInput && searchInput.value.trim()) {
    const searchTerm = searchInput.value.toLowerCase().trim();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }
  
  if (categoryFilter && categoryFilter.value) {
    const categoryId = parseInt(categoryFilter.value);
    filteredProducts = filteredProducts.filter(product => product.categoryId === categoryId);
  }
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  if (newPage >= 0 && newPage < totalPages) {
    currentPage = newPage;
    displayFilteredProducts(filteredProducts);
  }
  if (categoryFilter) {
    categoryFilter.addEventListener('change', handleCategoryFilter);
  }
}

function showAddProductModal() {
  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  document.getElementById('productModalLabel').textContent = 'Thêm sản phẩm mới';
  document.getElementById('productForm').reset();
  modal.show();
}

function editProduct(productId) {
  console.log('Edit product:', productId);
  showSuccessToast('Chức năng đang phát triển');
}

function deleteProduct(productId) {
  showConfirmDialog(
    'Xác nhận xóa',
    'Bạn có chắc chắn muốn xóa sản phẩm này?',
    function() {
      console.log('Delete product:', productId);
      showSuccessToast('Đã xóa sản phẩm (mock)');
      loadProductsData(); // Reload data
    }
  );
}

function saveProduct() {
  const formData = new FormData(document.getElementById('productForm'));
  const productData = {
    name: formData.get('productName'),
    description: formData.get('description'),
    category: formData.get('category'),
    price: formData.get('price'),
    salePrice: formData.get('salePrice'),
    stock: formData.get('stock'),
    featured: formData.get('featured') === 'on'
  };

  console.log('Save product:', productData);
  showSuccessToast('Đã lưu sản phẩm (mock)');
  
  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
  modal.hide();
  
  // Reload data
  loadProductsData();
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const rows = document.querySelectorAll('#productsTable tr');
  
  rows.forEach(row => {
    const productName = row.cells[2]?.textContent.toLowerCase() || '';
    const category = row.cells[3]?.textContent.toLowerCase() || '';
    
    if (productName.includes(searchTerm) || category.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function handleCategoryFilter(event) {
  const selectedCategory = event.target.value;
  const rows = document.querySelectorAll('#productsTable tr');
  
  rows.forEach(row => {
    if (!selectedCategory) {
      row.style.display = '';
    } else {
      const category = row.cells[3]?.textContent || '';
      if (category === selectedCategory) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  });
}