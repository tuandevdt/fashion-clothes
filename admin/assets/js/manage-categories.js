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
  // Load categories data
  loadCategoriesData();
  
  // Setup event handlers
  setupEventHandlers();
}

async function loadCategoriesData() {
  try {
    let categories = [];
    
    // Use MockDataService directly to get all 5 categories
    if (window.MockDataService) {
      categories = await window.MockDataService.getCategories();
    } else if (window.AdminMockData) {
      categories = await window.AdminMockData.getAdminCategories();
    }
    
    displayCategories(categories);
    updateCategoryStats(categories);
    
  } catch (error) {
    console.error('Error loading categories:', error);
    showErrorToast('Không thể tải danh sách danh mục');
  }
}

function displayCategories(categories) {
  const tableBody = document.getElementById('categoryTable');
  if (!tableBody) {
    console.error('Table body with id "categoryTable" not found');
    return;
  }

  if (categories.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="6" class="text-center">Không có danh mục nào</td></tr>';
    return;
  }

  tableBody.innerHTML = categories.map((category, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>
        <img src="${category.image || '../assets/image/default-image.avif'}" 
             alt="${category.name}" class="category-image"
             style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
      </td>
      <td>
        <strong>${category.name}</strong><br>
        <small class="text-muted">${category.slug}</small>
      </td>
      <td>${category.description || 'Không có mô tả'}</td>
      <td>
        <span class="badge bg-primary">${category.productCount || category.count || 0}</span>
      </td>
      <td>
        <span class="badge ${(category.status === 'active' || !category.status) ? 'bg-success' : 'bg-secondary'}">
          ${(category.status === 'active' || !category.status) ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      </td>
      <td>
        <div class="btn-group btn-group-sm" role="group">
          <button type="button" class="btn btn-outline-primary" onclick="editCategory(${category.id})" title="Chỉnh sửa">
            <i class="bi bi-pencil"></i>
          </button>
          <button type="button" class="btn btn-outline-danger" onclick="deleteCategory(${category.id})" title="Xóa">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Các hàm xử lý CRUD
function editCategory(id) {
  showWarningToast('Chức năng đang phát triển');
}

function deleteCategory(id) {
  showWarningToast('Chức năng đang phát triển');
}

function updateCategoryStats(categories) {
  // Update stats if elements exist
  const totalCategoriesEl = document.getElementById('totalCategories');
  const activeCategoriesEl = document.getElementById('activeCategories');
  const totalProductsEl = document.getElementById('totalProducts');

  if (totalCategoriesEl) {
    totalCategoriesEl.textContent = categories.length;
  }

  if (activeCategoriesEl) {
    const activeCount = categories.filter(c => c.status === 'active' || !c.status).length;
    activeCategoriesEl.textContent = activeCount;
  }

  if (totalProductsEl) {
    const totalProducts = categories.reduce((sum, cat) => sum + (cat.productCount || cat.count || 0), 0);
    totalProductsEl.textContent = totalProducts;
  }
}

function setupEventHandlers() {
  // Add new category button
  const btnAdd = document.getElementById('btnAddCategory');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      showWarningToast('Chức năng đang phát triển');
    });
  }

  // Save category button
  const btnSave = document.getElementById('btnSaveCategory');
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

  // Search functionality - keep working
  const searchInput = document.getElementById('searchCategories');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
}

function showAddCategoryModal() {
  const modal = new bootstrap.Modal(document.getElementById('categoryModal'));
  document.getElementById('categoryModalLabel').textContent = 'Thêm danh mục mới';
  document.getElementById('categoryForm').reset();
  modal.show();
}

function editCategory(categoryId) {
  console.log('Edit category:', categoryId);
  showSuccessToast('Chức năng đang phát triển');
}

function deleteCategory(categoryId) {
  showConfirmDialog(
    'Xác nhận xóa',
    'Bạn có chắc chắn muốn xóa danh mục này?',
    function() {
      console.log('Delete category:', categoryId);
      showSuccessToast('Đã xóa danh mục (mock)');
      loadCategoriesData(); // Reload data
    }
  );
}

function saveCategory() {
  const formData = new FormData(document.getElementById('categoryForm'));
  const categoryData = {
    name: formData.get('categoryName'),
    description: formData.get('description'),
    status: formData.get('status')
  };

  console.log('Save category:', categoryData);
  showSuccessToast('Đã lưu danh mục (mock)');
  
  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('categoryModal'));
  modal.hide();
  
  // Reload data
  loadCategoriesData();
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const rows = document.querySelectorAll('#categoriesTable tr');
  
  rows.forEach(row => {
    const categoryName = row.cells[2]?.textContent.toLowerCase() || '';
    const description = row.cells[3]?.textContent.toLowerCase() || '';
    
    if (categoryName.includes(searchTerm) || description.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}