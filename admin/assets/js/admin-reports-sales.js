document.addEventListener('DOMContentLoaded', function() {
  // Kiểm tra đăng nhập
  if (!checkAuth()) {
    return;
  }

  // Load layout components
  loadLayoutComponents();

  // Khởi tạo biến toàn cục
  let revenueChart, categoryChart, paymentMethodChart;

  // Thiết lập ngày mặc định cho bộ lọc
  setupDefaultDates();

  // Load dữ liệu ban đầu
  loadReportData();

  // Xử lý sự kiện
  setupEventListeners();

  // Hàm thiết lập ngày mặc định cho bộ lọc
  function setupDefaultDates() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    document.getElementById('filterDateFrom').valueAsDate = firstDayOfMonth;
    document.getElementById('filterDateTo').valueAsDate = today;

    // Vô hiệu hóa các trường ngày khi không chọn tùy chỉnh
    toggleDateFields(false);
  }

  // Hàm load dữ liệu báo cáo
  async function loadReportData() {
    const period = document.getElementById('filterPeriod').value;
    const dateFrom = document.getElementById('filterDateFrom').value;
    const dateTo = document.getElementById('filterDateTo').value;

    // Hiển thị loading
    document.getElementById('revenueTable').innerHTML = `
      <tr>
        <td colspan="5" class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Đang tải...</span>
          </div>
        </td>
      </tr>
    `;

    try {
      // Wait for AdminMockData to be available
      let attempts = 0;
      while (!window.AdminMockData && attempts < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }
      
      if (!window.AdminMockData) {
        throw new Error('AdminMockData not available');
      }

      const reportData = await window.AdminMockData.getSalesReports();

      // Hiển thị tổng quan
      displayOverview(reportData.overview);

      // Hiển thị biểu đồ doanh thu
      displayRevenueChart(reportData.monthlyData);

      // Hiển thị biểu đồ danh mục
      displayCategoryChart(reportData.categoryData);

      // Hiển thị biểu đồ phương thức thanh toán
      displayPaymentMethodChart(reportData.paymentMethodData);

      // Hiển thị bảng chi tiết
      displayRevenueTable(reportData.dailyData);

    } catch (error) {
      console.error('Error loading sales report:', error);

      // Hiển thị thông báo lỗi trong bảng
      document.getElementById('revenueTable').innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-danger">
            Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.
          </td>
        </tr>
      `;
    }
  }

  // Hàm hiển thị tổng quan
  function displayOverview(overview) {
    document.getElementById('totalRevenue').textContent = formatCurrency(overview.totalRevenue);
    document.getElementById('totalOrders').textContent = overview.totalOrders;
    document.getElementById('averageOrderValue').textContent = formatCurrency(overview.averageOrderValue);
    document.getElementById('totalProductsSold').textContent = overview.totalProductsSold;
  }

  // Hàm hiển thị biểu đồ doanh thu
  function displayRevenueChart(monthlyData) {
    const ctx = document.getElementById('revenueChart').getContext('2d');

    // Nếu biểu đồ đã tồn tại, hủy nó
    if (revenueChart) {
      revenueChart.destroy();
    }

    // Chuẩn bị dữ liệu
    const labels = monthlyData.map(item => item.month);
    const data = monthlyData.map(item => item.revenue);

    // Tạo biểu đồ mới
    revenueChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Doanh thu',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return formatCurrency(value);
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return formatCurrency(context.raw);
              }
            }
          }
        }
      }
    });
  }

  // Hàm hiển thị biểu đồ danh mục
  function displayCategoryChart(categoryData) {
    const ctx = document.getElementById('categoryChart').getContext('2d');

    // Nếu biểu đồ đã tồn tại, hủy nó
    if (categoryChart) {
      categoryChart.destroy();
    }

    // Chuẩn bị dữ liệu
    const labels = categoryData.map(item => item.name);
    const data = categoryData.map(item => item.revenue);

    // Tạo biểu đồ mới
    categoryChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(199, 199, 199, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = formatCurrency(context.raw);
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
  }

  // Hàm hiển thị biểu đồ phương thức thanh toán
  function displayPaymentMethodChart(paymentMethodData) {
    const ctx = document.getElementById('paymentMethodChart').getContext('2d');

    // Nếu biểu đồ đã tồn tại, hủy nó
    if (paymentMethodChart) {
      paymentMethodChart.destroy();
    }

    // Chuẩn bị dữ liệu
    const labels = paymentMethodData.map(item => item.method);
    const data = paymentMethodData.map(item => item.amount);

    // Tạo biểu đồ mới
    paymentMethodChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = formatCurrency(context.raw);
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
  }

  // Hàm hiển thị bảng chi tiết
  function displayRevenueTable(dailyData) {
    const tableBody = document.getElementById('revenueTable');
    tableBody.innerHTML = '';

    if (dailyData.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center">
            Không có dữ liệu
          </td>
        </tr>
      `;
      return;
    }

    dailyData.forEach(item => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${item.date}</td>
        <td>${item.orders}</td>
        <td>${formatCurrency(item.revenue)}</td>
        <td>${item.products}</td>
        <td>${formatCurrency(item.averageOrder)}</td>
      `;

      tableBody.appendChild(row);
    });
  }

  // Hàm thiết lập các sự kiện
  function setupEventListeners() {
    // Sự kiện thay đổi khoảng thời gian
    document.getElementById('filterPeriod').addEventListener('change', function() {
      const isCustom = this.value === 'custom';
      toggleDateFields(isCustom);
    });

    // Sự kiện nút áp dụng bộ lọc
    document.getElementById('btnApplyFilter').addEventListener('click', function() {
      loadReportData();
    });

    // Sự kiện nút xuất PDF
    document.getElementById('btnExportPDF').addEventListener('click', function() {
      exportReport('pdf');
    });

    // Sự kiện nút xuất Excel
    document.getElementById('btnExportExcel').addEventListener('click', function() {
      exportReport('excel');
    });

    // Sự kiện nút in
    document.getElementById('btnPrint').addEventListener('click', function() {
      window.print();
    });
  }

  // Hàm bật/tắt các trường ngày
  function toggleDateFields(enabled) {
    document.getElementById('filterDateFrom').disabled = !enabled;
    document.getElementById('filterDateTo').disabled = !enabled;
  }

  // Hàm xuất báo cáo
  function exportReport(type) {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const period = document.getElementById('filterPeriod').value;
    const dateFrom = document.getElementById('filterDateFrom').value;
    const dateTo = document.getElementById('filterDateTo').value;

    // Xây dựng URL với các tham số lọc
    let url = `/api/reports/sales/export?period=${period}&type=${type}`;

    if (period === 'custom' && dateFrom && dateTo) {
      url += `&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    }

    // Tải file
    window.open(url, '_blank');
  }
});



