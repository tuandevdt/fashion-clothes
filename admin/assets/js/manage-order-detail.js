document.addEventListener('DOMContentLoaded', function() {
  // Kiểm tra đăng nhập
  if (!checkAuth()) {
    return;
  }

  // Load layout components
  loadLayoutComponents();

  // Khởi tạo trang
  initializePage();
});

function initializePage() {
  // TODO: Add page-specific initialization code here
  console.log('order-detail initialized');
}
