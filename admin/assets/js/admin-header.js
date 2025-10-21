// Function để setup header events - expose globally
window.setupHeaderEvents = function() {
  // Hiển thị tên người dùng
  displayUserInfo();

  // Xử lý sự kiện đăng xuất
  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', function(e) {
      e.preventDefault();

      // Hiển thị xác nhận đăng xuất
      Swal.fire({
        title: 'Đăng xuất',
        text: 'Bạn có chắc chắn muốn đăng xuất?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          // Xóa tất cả thông tin từ localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('username');
          localStorage.removeItem('user');

          // Chuyển hướng về trang chủ thay vì login admin
          window.location.href = '../index.html';
        }
      });
    });
  } else {
    // Logout button not found
  }

  // Xử lý sự kiện tìm kiếm
  const searchInput = document.querySelector('.form-control-dark');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const keyword = this.value.trim();
        if (keyword) {
          // Thực hiện tìm kiếm (có thể chuyển hướng đến trang kết quả tìm kiếm)
          alert('Đang tìm kiếm: ' + keyword);
        }
      }
    });
  }
};

// Auto setup khi DOM ready (cho các trang load header.js trực tiếp)
document.addEventListener('DOMContentLoaded', function() {
  setupHeaderEvents();
});

// Hiển thị thông tin người dùng
async function displayUserInfo() {
  const userNameElement = document.getElementById('currentUserName');
  const userAvatarElement = document.getElementById('currentUserAvatar');

  // Lấy username từ localStorage để hiển thị ngay
  const username = localStorage.getItem('username');
  if (userNameElement) {
    userNameElement.textContent = username || 'Admin';
  }

  // Gọi API để lấy thông tin user đầy đủ bao gồm avatar
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (userId && token && userAvatarElement) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Use mock data instead of API
    if (window.AdminMockData) {
      try {
        const user = await window.AdminMockData.getUserById(userId);
        if (userNameElement) {
          userNameElement.textContent = user.fullname || user.username;
        }
        if (userAvatarElement) {
          userAvatarElement.src = user.avatar || '../../assets/image/default-image.avif';
        }
      } catch (error) {
        // Error loading user info
      }
    }
  }
}
