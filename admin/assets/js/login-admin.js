document.addEventListener('DOMContentLoaded', function() {
  // Kiểm tra nếu đã đăng nhập thì chuyển hướng đến trang dashboard
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = 'manage-dashboard.html';
  }

  // Xử lý form đăng nhập
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hardcode login check: admin / 1234
    if (username === 'admin' && password === '1234') {
      // Tạo token fake và lưu thông tin
      const fakeToken = 'admin-token-' + Date.now();
      const userData = {
        userId: 1,
        username: 'admin',
        role: 'admin',
        fullName: 'Administrator',
        email: 'admin@tinashop.com'
      };

      localStorage.setItem('token', fakeToken);
      localStorage.setItem('userId', userData.userId);
      localStorage.setItem('username', userData.username);
      localStorage.setItem('user', JSON.stringify(userData));

      // Hiển thị thông báo thành công
      Swal.fire({
        icon: 'success',
        title: 'Đăng nhập thành công!',
        text: 'Chào mừng quản trị viên!',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        // Chuyển hướng đến trang dashboard
        window.location.href = 'manage-dashboard.html';
      });
    } else {
      // Hiển thị thông báo lỗi
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại',
        text: 'Tên đăng nhập hoặc mật khẩu không đúng. Sử dụng admin/1234'
      });
    }
  });
});
