// Kiểm tra đăng nhập
function checkAuth() {
  // TEMPORARILY DISABLED: Comment out authentication check for development
  /*
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  
  console.log('=== KIỂM TRA AUTH ===');
  console.log('Token:', token ? 'Có' : 'Không có');
  console.log('Role:', role);
  console.log('UserId:', userId);
  
  if (!token || !userId) {
    console.log('Không có token hoặc userId, chuyển về login');
    window.location.href = 'login-admin.html';
    return false;
  }
  
  // Kiểm tra role admin (chấp nhận cả 'admin' và 'ADMIN')
  if (role && role.toLowerCase() !== 'admin') {
    console.log('Role không phải admin:', role);
    alert('Bạn không có quyền truy cập trang admin');
    window.location.href = '../login.html';
    return false;
  }
  
  console.log('Auth check passed!');
  */
  
  // Always return true for development - skip authentication
  console.log('Authentication check disabled for development');
  return true;
}

// Format tiền tệ VND
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Format ngày tháng
function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('vi-VN', options);
}

// Hiển thị thông báo thành công
function showSuccessToast(message) {
  Swal.fire({
    toast: true,
    icon: 'success',
    title: message,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
}

// Hiển thị thông báo lỗi
function showErrorToast(message) {
  Swal.fire({
    toast: true,
    icon: 'error',
    title: message,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
}

// Hiển thị thông báo cảnh báo
function showWarningToast(message) {
  Swal.fire({
    toast: true,
    icon: 'warning',
    title: message,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
}

// Hiển thị hộp thoại xác nhận
function showConfirmDialog(title, text, callback) {
  Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
}

// Tạo slug từ chuỗi
function createSlug(str) {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // Xóa dấu
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Thay thế ký tự đặc biệt
  str = str.replace(/[đĐ]/g, 'd');

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, '');

  // Xóa khoảng trắng thay bằng dấu gạch ngang
  str = str.replace(/(\s+)/g, '-');

  // Xóa ký tự gạch ngang liên tiếp
  str = str.replace(/-+/g, '-');

  // Xóa các ký tự gạch ngang ở đầu và cuối
  str = str.replace(/^-+|-+$/g, '');

  return str;
}

// Tạo mã SKU ngẫu nhiên
function generateSKU(prefix = 'TINA') {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
}

// Xử lý lỗi từ API
function handleApiError(error) {
  console.error('API Error:', error);

  if (error.response) {
    // Lỗi từ server với mã trạng thái
    if (error.response.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '../../pages/login/login.html';
      return;
    }

    // Hiển thị thông báo lỗi từ server
    const errorMessage = error.response.data.message || 'Đã xảy ra lỗi từ server';
    showErrorToast(errorMessage);
  } else if (error.request) {
    // Không nhận được phản hồi từ server
    showErrorToast('Không thể kết nối đến server');
  } else {
    // Lỗi khác
    showErrorToast('Đã xảy ra lỗi: ' + error.message);
  }
}

// Tạo phân trang
function createPagination(currentPage, totalPages, onPageChange) {
  const paginationEl = document.createElement('ul');
  paginationEl.className = 'pagination justify-content-center';

  // Nút Previous
  const prevLi = document.createElement('li');
  prevLi.className = `page-item ${currentPage === 0 ? 'disabled' : ''}`;
  const prevLink = document.createElement('a');
  prevLink.className = 'page-link';
  prevLink.href = '#';
  prevLink.textContent = 'Trước';
  prevLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  });
  prevLi.appendChild(prevLink);
  paginationEl.appendChild(prevLi);

  // Các nút số trang
  const startPage = Math.max(0, currentPage - 2);
  const endPage = Math.min(totalPages - 1, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    const pageLi = document.createElement('li');
    pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
    const pageLink = document.createElement('a');
    pageLink.className = 'page-link';
    pageLink.href = '#';
    pageLink.textContent = i + 1;
    pageLink.addEventListener('click', (e) => {
      e.preventDefault();
      onPageChange(i);
    });
    pageLi.appendChild(pageLink);
    paginationEl.appendChild(pageLi);
  }

  // Nút Next
  const nextLi = document.createElement('li');
  nextLi.className = `page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`;
  const nextLink = document.createElement('a');
  nextLink.className = 'page-link';
  nextLink.href = '#';
  nextLink.textContent = 'Sau';
  nextLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  });
  nextLi.appendChild(nextLink);
  paginationEl.appendChild(nextLi);

  return paginationEl;
}

// Load layout components
function loadLayoutComponents() {
  // Load header
  fetch('layout/admin-header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header-container').innerHTML = html;

      // Load header script after HTML is inserted
      const headerScript = document.createElement('script');
      headerScript.src = 'assets/js/admin-header.js';
      headerScript.onload = function() {
        // Setup header events sau khi script đã load
        if (typeof setupHeaderEvents === 'function') {
          setupHeaderEvents();
        }
      };
      document.body.appendChild(headerScript);
    });

  // Load sidebar
  fetch('layout/admin-sidebar.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('sidebar-container').innerHTML = html;

      // Load sidebar script after HTML is inserted
      const sidebarScript = document.createElement('script');
      sidebarScript.src = 'assets/js/admin-sidebar.js';
      sidebarScript.onload = function() {
        // Setup sidebar navigation sau khi script đã load
        if (typeof setupSidebarNavigation === 'function') {
          setupSidebarNavigation();
        }
      };
      document.body.appendChild(sidebarScript);
    });

  // Load footer
  fetch('layout/admin-footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer-container').innerHTML = html;
    });
}
