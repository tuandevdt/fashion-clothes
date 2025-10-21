document.addEventListener('DOMContentLoaded', function() {
  // Kiểm tra đăng nhập
  if (!checkAuth()) {
    return;
  }

  // Load layout components
  loadLayoutComponents();

  // Fetch dashboard data
  fetchDashboardData();

  // Initialize charts
  initCharts();

  // Setup year filter event
  setupYearFilter();
});

// Fetch dashboard data
async function fetchDashboardData() {
  try {
    console.log('=== LOADING DASHBOARD DATA ===');
    
    // Wait for AdminMockData to be available
    let attempts = 0;
    while (!window.AdminMockData && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    if (!window.AdminMockData) {
      throw new Error('AdminMockData not available after waiting');
    }
    
    console.log('AdminMockData loaded successfully');
    const dashboardData = await window.AdminMockData.getDashboardStats();
    console.log('Dashboard data:', dashboardData);
    
    // Update main stats
    document.getElementById('totalOrders').textContent = dashboardData.totalOrders || 0;
    document.getElementById('totalRevenue').textContent = formatCurrency(dashboardData.totalRevenue || 0);
    document.getElementById('totalProducts').textContent = dashboardData.totalProducts || 0;
    document.getElementById('totalCustomers').textContent = dashboardData.totalCustomers || 0;

    // Display detailed data
    displayRecentOrders(window.AdminMockData.orders || []);
    displayTopProducts(dashboardData.topSellingProducts || []);
    displayNewCustomers(dashboardData.newCustomers || []);
    
    console.log('=== DASHBOARD DATA LOADED SUCCESSFULLY ===');
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    showErrorToast('Không thể tải dữ liệu dashboard');
    
    // Display default values when error occurs
    document.getElementById('totalOrders').textContent = '0';
    document.getElementById('totalRevenue').textContent = formatCurrency(0);
    document.getElementById('totalProducts').textContent = '0';
    document.getElementById('totalCustomers').textContent = '0';
  }
}

// Display recent orders
function displayRecentOrders(orders) {
  const tableBody = document.querySelector('#recentOrdersTable');
  if (!tableBody) {
    console.log('Table recentOrdersTable not found');
    return;
  }

  if (orders.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="5" class="text-center">Không có đơn hàng nào</td></tr>';
    return;
  }

  tableBody.innerHTML = orders.map(order => `
    <tr>
      <td>#${order.id}</td>
      <td>${order.customerName}</td>
      <td>${formatCurrency(order.totalAmount)}</td>
      <td>
        <span class="badge ${getStatusBadgeClass(order.status)}">
          ${getStatusText(order.status)}
        </span>
      </td>
      <td>${formatDate(order.createdAt)}</td>
    </tr>
  `).join('');
}

// Display top products
function displayTopProducts(products) {
  const tableBody = document.querySelector('#topProductsTable');
  if (!tableBody) {
    console.log('Table topProductsTable not found');
    return;
  }

  if (!products || products.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4" class="text-center">Không có sản phẩm nào</td></tr>';
    return;
  }

  tableBody.innerHTML = products.map(product => `
    <tr>
      <td>
        <div class="d-flex align-items-center">
          <img src="${product.image}" alt="${product.name}" class="me-2" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
          <span>${product.name}</span>
        </div>
      </td>
      <td>Thời trang</td>
      <td>${formatCurrency(Math.round(product.revenue / product.sold))}</td>
      <td>${product.sold} đã bán</td>
    </tr>
  `).join('');
}

// Display new customers
function displayNewCustomers(customers) {
  const tableBody = document.querySelector('#newCustomersTable');
  if (!tableBody) {
    console.log('Table newCustomersTable not found');
    return;
  }

  if (!customers || customers.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4" class="text-center">Không có khách hàng mới</td></tr>';
    return;
  }

  tableBody.innerHTML = customers.map(customer => `
    <tr>
      <td>${customer.fullName}</td>
      <td>${customer.email}</td>
      <td>${formatDate(customer.joinDate)}</td>
      <td>${customer.phone || 'N/A'}</td>
    </tr>
  `).join('');
}

// Initialize charts
async function initCharts() {
  try {
    if (window.AdminMockData) {
      const dashboardData = await window.AdminMockData.getDashboardStats();
      
      // Revenue chart
      const revenueCtx = document.getElementById('revenueChart');
      if (revenueCtx) {
        new Chart(revenueCtx, {
          type: 'line',
          data: {
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            datasets: [{
              label: 'Doanh thu (VNĐ)',
              data: dashboardData.monthlyRevenue,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.1)',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return formatCurrency(value);
                  }
                }
              }
            }
          }
        });
      }

      // Orders chart
      const ordersCtx = document.getElementById('orderStatusChart');
      if (ordersCtx) {
        new Chart(ordersCtx, {
          type: 'bar',
          data: {
            labels: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            datasets: [{
              label: 'Số đơn hàng',
              data: dashboardData.dailyOrders,
              backgroundColor: 'rgba(54, 162, 235, 0.8)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  } catch (error) {
    console.error('Error initializing charts:', error);
  }
}

// Setup year filter
function setupYearFilter() {
  const yearSelect = document.getElementById('yearSelect');
  if (yearSelect) {
    yearSelect.addEventListener('change', function() {
      const selectedYear = this.value;
      // In mock mode, just log the selection
      console.log('Selected year:', selectedYear);
      // In real implementation, this would refetch data for the selected year
    });
  }
}

// Helper functions
function getStatusBadgeClass(status) {
  const statusClasses = {
    'pending': 'bg-warning',
    'confirmed': 'bg-info',
    'processing': 'bg-primary',
    'shipped': 'bg-secondary',
    'delivered': 'bg-success',
    'cancelled': 'bg-danger'
  };
  return statusClasses[status] || 'bg-secondary';
}

function getStatusText(status) {
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

function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(amount);
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
}
