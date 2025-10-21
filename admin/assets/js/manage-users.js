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
  // Load users data
  loadUsersData();
  
  // Setup event handlers
  setupEventHandlers();
}

async function loadUsersData() {
  try {
    let users = [];
    
    // Use admin mock data
    if (window.AdminMockData) {
      const usersData = await window.AdminMockData.getUsers();
      users = usersData.content || [];
    }
    
    displayUsers(users);
    updateUserStats(users);
    
  } catch (error) {
    console.error('Error loading users:', error);
    showErrorToast('Không thể tải danh sách người dùng');
  }
}

function displayUsers(users) {
  const tableBody = document.getElementById('userTable');
  if (!tableBody) {
    console.error('Table body with id "userTable" not found');
    return;
  }

  if (users.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" class="text-center">Không có người dùng nào</td></tr>';
    return;
  }

  tableBody.innerHTML = users.map((user, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>
        <img src="${user.avatar || '../assets/image/default-image.avif'}" 
             alt="${user.fullname || user.username}" class="user-avatar"
             style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%;">
      </td>
      <td>
        <strong>${user.fullname || user.username}</strong><br>
        <small class="text-muted">@${user.username}</small>
      </td>
      <td>${user.email}</td>
      <td>${user.phone || 'N/A'}</td>
      <td>
        <span class="badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-primary'}">
          ${user.role === 'ADMIN' ? 'Quản trị' : 'Khách hàng'}
        </span>
      </td>
      <td>${formatDate(user.createdAt)}</td>
      <td>
        <span class="badge bg-success">Hoạt động</span>
      </td>
      <td>
        <div class="btn-group btn-group-sm" role="group">
          <button type="button" class="btn btn-outline-primary" onclick="editUser(${user.id})" title="Chỉnh sửa">
            <i class="bi bi-pencil"></i>
          </button>
          <button type="button" class="btn btn-outline-info" onclick="viewUser(${user.id})" title="Xem chi tiết">
            <i class="bi bi-eye"></i>
          </button>
          ${user.role !== 'ADMIN' ? `
            <button type="button" class="btn btn-outline-danger" onclick="deleteUser(${user.id})" title="Xóa">
              <i class="bi bi-trash"></i>
            </button>
          ` : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

// Các hàm xử lý CRUD
function editUser(id) {
  showWarningToast('Chức năng đang phát triển');
}

function deleteUser(id) {
  showWarningToast('Chức năng đang phát triển');
}

function updateUserStats(users) {
  // Update stats if elements exist
  const totalUsersEl = document.getElementById('totalUsers');
  const customersEl = document.getElementById('totalCustomers');
  const adminsEl = document.getElementById('totalAdmins');
  const newUsersEl = document.getElementById('newUsers');

  if (totalUsersEl) {
    totalUsersEl.textContent = users.length;
  }

  if (customersEl) {
    const customerCount = users.filter(u => u.role !== 'ADMIN').length;
    customersEl.textContent = customerCount;
  }

  if (adminsEl) {
    const adminCount = users.filter(u => u.role === 'ADMIN').length;
    adminsEl.textContent = adminCount;
  }

  if (newUsersEl) {
    // Mock: users created in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newUserCount = users.filter(u => {
      const createdDate = new Date(u.createdAt);
      return createdDate > thirtyDaysAgo;
    }).length;
    
    newUsersEl.textContent = newUserCount;
  }
}

function setupEventHandlers() {
  // Add new user button
  const btnAdd = document.getElementById('btnAddUser');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      showWarningToast('Chức năng đang phát triển');
    });
  }

  // Save user button
  const btnSave = document.getElementById('btnSaveUser');
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

  // Search functionality
  const searchInput = document.getElementById('searchUsers');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // Role filter
  const roleFilter = document.getElementById('filterRole');
  if (roleFilter) {
    roleFilter.addEventListener('change', handleRoleFilter);
  }
}

function showAddUserModal() {
  const modal = new bootstrap.Modal(document.getElementById('userModal'));
  document.getElementById('userModalLabel').textContent = 'Thêm người dùng mới';
  document.getElementById('userForm').reset();
  modal.show();
}

function editUser(userId) {
  console.log('Edit user:', userId);
  showSuccessToast('Chức năng đang phát triển');
}

function viewUser(userId) {
  console.log('View user:', userId);
  showSuccessToast('Chức năng đang phát triển');
}

function deleteUser(userId) {
  showConfirmDialog(
    'Xác nhận xóa',
    'Bạn có chắc chắn muốn xóa người dùng này?',
    function() {
      console.log('Delete user:', userId);
      showSuccessToast('Đã xóa người dùng (mock)');
      loadUsersData(); // Reload data
    }
  );
}

function saveUser() {
  const formData = new FormData(document.getElementById('userForm'));
  const userData = {
    username: formData.get('username'),
    email: formData.get('email'),
    fullname: formData.get('fullname'),
    phone: formData.get('phone'),
    role: formData.get('role')
  };

  console.log('Save user:', userData);
  showSuccessToast('Đã lưu người dùng (mock)');
  
  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
  modal.hide();
  
  // Reload data
  loadUsersData();
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const rows = document.querySelectorAll('#usersTable tr');
  
  rows.forEach(row => {
    const username = row.cells[2]?.textContent.toLowerCase() || '';
    const email = row.cells[3]?.textContent.toLowerCase() || '';
    
    if (username.includes(searchTerm) || email.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function handleRoleFilter(event) {
  const selectedRole = event.target.value;
  const rows = document.querySelectorAll('#usersTable tr');
  
  rows.forEach(row => {
    if (!selectedRole) {
      row.style.display = '';
    } else {
      const roleText = row.cells[5]?.textContent || '';
      const userRole = roleText.includes('Quản trị') ? 'ADMIN' : 'USER';
      
      if (userRole === selectedRole) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  });
}