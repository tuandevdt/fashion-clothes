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
  // Load orders data
  loadOrdersData();
  
  // Setup event handlers
  setupEventHandlers();
}

async function loadOrdersData() {
  try {
    let orders = [];
    
    // Use admin mock data
    if (window.AdminMockData) {
      const ordersData = await window.AdminMockData.getOrders();
      orders = ordersData.content || [];
    }
    
    displayOrders(orders);
    updateOrderStats(orders);
    
  } catch (error) {
    console.error('Error loading orders:', error);
    showErrorToast('Không thể tải danh sách đơn hàng');
  }
}

function displayOrders(orders) {
  const tableBody = document.getElementById('orderTable');
  if (!tableBody) {
    console.error('Table body with id "orderTable" not found');
    return;
  }

  if (orders.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" class="text-center">Không có đơn hàng nào</td></tr>';
    return;
  }

  tableBody.innerHTML = orders.map((order, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>
        <strong>#${order.id}</strong><br>
        <small class="text-muted">${formatDate(order.createdDate)}</small>
      </td>
      <td>
        <strong>${order.customerName}</strong><br>
        <small class="text-muted">${order.customerEmail}</small>
      </td>
      <td>
        <span class="badge bg-info">${order.items?.length || 0} sản phẩm</span>
      </td>
      <td>
        <strong>${formatCurrency(order.total)}</strong>
      </td>
      <td>
        <span class="badge ${getOrderStatusClass(order.status)}">
          ${getOrderStatusText(order.status)}
        </span>
      </td>
      <td>
        <div class="btn-group btn-group-sm" role="group">
          <button type="button" class="btn btn-outline-primary" onclick="viewOrder(${order.id})" title="Xem chi tiết">
            <i class="bi bi-eye"></i>
          </button>
          <button type="button" class="btn btn-outline-success" onclick="updateOrderStatus(${order.id})" title="Cập nhật trạng thái">
            <i class="bi bi-arrow-repeat"></i>
          </button>
          <button type="button" class="btn btn-outline-info" onclick="printOrder(${order.id})" title="In đơn hàng">
            <i class="bi bi-printer"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Các hàm xử lý CRUD
function editOrder(id) {
  showWarningToast('Chức năng đang phát triển');
}

function deleteOrder(id) {
  showWarningToast('Chức năng đang phát triển');
}

function updateOrderStatus(id) {
  showWarningToast('Chức năng đang phát triển');
}

function updateOrderStats(orders) {
  // Update stats if elements exist
  const totalOrdersEl = document.getElementById('totalOrders');
  const pendingOrdersEl = document.getElementById('pendingOrders');
  const completedOrdersEl = document.getElementById('completedOrders');
  const totalRevenueEl = document.getElementById('totalRevenue');

  if (totalOrdersEl) {
    totalOrdersEl.textContent = orders.length;
  }

  if (pendingOrdersEl) {
    const pendingCount = orders.filter(o => o.status === 'pending' || o.status === 'confirmed').length;
    pendingOrdersEl.textContent = pendingCount;
  }

  if (completedOrdersEl) {
    const completedCount = orders.filter(o => o.status === 'delivered').length;
    completedOrdersEl.textContent = completedCount;
  }

  if (totalRevenueEl) {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    totalRevenueEl.textContent = formatCurrency(totalRevenue);
  }
}

function setupEventHandlers() {
  // Override all edit/delete buttons
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-edit') || e.target.classList.contains('btn-delete') || 
        e.target.classList.contains('btn-update-status') ||
        e.target.closest('.btn-edit') || e.target.closest('.btn-delete') || e.target.closest('.btn-update-status')) {
      e.preventDefault();
      showWarningToast('Chức năng đang phát triển');
    }
  });

  // Search functionality - keep working
  const searchInput = document.getElementById('searchOrders');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // Status filter - keep working
  const statusFilter = document.getElementById('filterStatus');
  if (statusFilter) {
    statusFilter.addEventListener('change', handleStatusFilter);
  }

  // Date range filter
  const startDate = document.getElementById('startDate');
  const endDate = document.getElementById('endDate');
  
  if (startDate && endDate) {
    startDate.addEventListener('change', handleDateFilter);
    endDate.addEventListener('change', handleDateFilter);
  }
}

function getOrderStatusClass(status) {
  const statusClasses = {
    'pending': 'bg-warning text-dark',
    'confirmed': 'bg-info',
    'processing': 'bg-primary',
    'shipped': 'bg-secondary',
    'delivered': 'bg-success',
    'cancelled': 'bg-danger'
  };
  return statusClasses[status] || 'bg-secondary';
}

function getOrderStatusText(status) {
  const statusTexts = {
    'pending': 'Chờ xử lý',
    'confirmed': 'Đã xác nhận',
    'processing': 'Đang xử lý',
    'shipped': 'Đã gửi',
    'delivered': 'Đã giao',
    'cancelled': 'Đã hủy'
  };
  return statusTexts[status] || 'Không xác định';
}

function viewOrder(orderId) {
  console.log('View order:', orderId);
  
  // Show order details in modal or navigate to detail page
  showSuccessToast('Chức năng xem chi tiết đang phát triển');
}

function updateOrderStatus(orderId) {
  console.log('Update order status:', orderId);
  
  // Show status update options
  Swal.fire({
    title: 'Cập nhật trạng thái đơn hàng',
    input: 'select',
    inputOptions: {
      'pending': 'Chờ xử lý',
      'confirmed': 'Đã xác nhận',
      'processing': 'Đang xử lý',
      'shipped': 'Đã gửi',
      'delivered': 'Đã giao',
      'cancelled': 'Đã hủy'
    },
    inputPlaceholder: 'Chọn trạng thái',
    showCancelButton: true,
    confirmButtonText: 'Cập nhật',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      console.log('Update status to:', result.value);
      showSuccessToast('Đã cập nhật trạng thái đơn hàng (mock)');
      loadOrdersData(); // Reload data
    }
  });
}

function printOrder(orderId) {
  console.log('Print order:', orderId);
  showSuccessToast('Chức năng in đơn hàng đang phát triển');
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const rows = document.querySelectorAll('#ordersTable tr');
  
  rows.forEach(row => {
    const orderId = row.cells[1]?.textContent.toLowerCase() || '';
    const customerInfo = row.cells[2]?.textContent.toLowerCase() || '';
    
    if (orderId.includes(searchTerm) || customerInfo.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function handleStatusFilter(event) {
  const selectedStatus = event.target.value;
  const rows = document.querySelectorAll('#ordersTable tr');
  
  rows.forEach(row => {
    if (!selectedStatus) {
      row.style.display = '';
    } else {
      const statusText = row.cells[5]?.textContent || '';
      const statusMapping = {
        'pending': 'Chờ xử lý',
        'confirmed': 'Đã xác nhận',
        'processing': 'Đang xử lý',
        'shipped': 'Đã gửi',
        'delivered': 'Đã giao',
        'cancelled': 'Đã hủy'
      };
      
      if (statusText.includes(statusMapping[selectedStatus])) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  });
}

function handleDateFilter() {
  const startDate = document.getElementById('startDate')?.value;
  const endDate = document.getElementById('endDate')?.value;
  
  if (!startDate && !endDate) return;
  
  const rows = document.querySelectorAll('#ordersTable tr');
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  
  rows.forEach(row => {
    const dateText = row.cells[1]?.querySelector('small')?.textContent || '';
    
    // Extract date from the formatted date string
    // This is a simple implementation, might need adjustment based on date format
    if (dateText) {
      const orderDate = new Date(dateText);
      
      let showRow = true;
      
      if (start && orderDate < start) {
        showRow = false;
      }
      
      if (end && orderDate > end) {
        showRow = false;
      }
      
      row.style.display = showRow ? '' : 'none';
    }
  });
}