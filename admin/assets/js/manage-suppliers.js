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
  console.log('Manage suppliers page initialized');
  
  // Override all edit/delete buttons
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-edit') || e.target.classList.contains('btn-delete') || 
        e.target.closest('.btn-edit') || e.target.closest('.btn-delete')) {
      e.preventDefault();
      showWarningToast('Chức năng đang phát triển');
    }
  });

  // Mock suppliers data
  const suppliers = [
    {
      id: 1,
      name: 'Công ty TNHH Thời Trang ABC',
      contactPerson: 'Nguyễn Văn A',
      phone: '0123456789',
      email: 'supplier1@example.com',
      address: 'Hà Nội',
      status: 'active'
    },
    {
      id: 2,
      name: 'Fashion Co. Ltd',
      contactPerson: 'Trần Thị B',
      phone: '0987654321',
      email: 'supplier2@example.com',
      address: 'TP.HCM',
      status: 'active'
    }
  ];
  
  displaySuppliers(suppliers);
}

function displaySuppliers(suppliers) {
  const tableBody = document.getElementById('supplierTable');
  if (!tableBody) {
    console.error('Table body with id "supplierTable" not found');
    return;
  }

  tableBody.innerHTML = suppliers.map((supplier, index) => `
    <tr>
      <td>${index + 1}</td>
      <td><strong>${supplier.name}</strong></td>
      <td>${supplier.contactPerson}</td>
      <td>${supplier.phone}</td>
      <td>${supplier.email}</td>
      <td>${supplier.address}</td>
      <td>
        <span class="badge ${supplier.status === 'active' ? 'bg-success' : 'bg-secondary'}">
          ${supplier.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      </td>
      <td>
        <div class="btn-group btn-group-sm">
          <button class="btn btn-outline-primary" onclick="editSupplier(${supplier.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-outline-danger" onclick="deleteSupplier(${supplier.id})">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Các hàm xử lý CRUD
function editSupplier(id) {
  showWarningToast('Chức năng đang phát triển');
}

function deleteSupplier(id) {
  showWarningToast('Chức năng đang phát triển');
}

function editSupplier(id) {
  console.log('Edit supplier:', id);
  showSuccessToast('Chức năng đang phát triển');
}

function deleteSupplier(id) {
  showConfirmDialog('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa nhà cung cấp này?', function() {
    console.log('Delete supplier:', id);
    showSuccessToast('Đã xóa nhà cung cấp (mock)');
  });
}