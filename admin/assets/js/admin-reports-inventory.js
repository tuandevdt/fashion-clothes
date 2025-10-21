document.addEventListener('DOMContentLoaded', function() {
  // Kiểm tra đăng nhập
  if (!checkAuth()) {
    return;
  }

  // Load layout components
  loadLayoutComponents();

  // Khởi tạo biến toàn cục
  let currentPage = 0;
  let pageSize = 10;
  let totalPages = 0;
  let categoryStockChart, categoryValueChart;

  // Load dữ liệu ban đầu
  loadCategories();
  loadSuppliers();
  loadInventoryData();

  // Xử lý sự kiện
  setupEventListeners();

  // Hàm load danh mục
  async function loadCategories() {
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

      const categories = await window.AdminMockData.getCategories();
      const filterCategorySelect = document.getElementById('filterCategory');

      // Xóa options cũ
      filterCategorySelect.innerHTML = '<option value="">Tất cả danh mục</option>';

      // Thêm options mới
      categories.content.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        filterCategorySelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  // Hàm load nhà cung cấp
  async function loadSuppliers() {
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

      const suppliers = await window.AdminMockData.getSuppliers();
      const filterSupplierSelect = document.getElementById('filterSupplier');

      // Xóa options cũ
      filterSupplierSelect.innerHTML = '<option value="">Tất cả nhà cung cấp</option>';

      // Thêm options mới
      suppliers.content.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier.id;
        option.textContent = supplier.name;
        filterSupplierSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error loading suppliers:', error);
    }
  }

  // Hàm load dữ liệu tồn kho
  async function loadInventoryData() {
    const categoryId = document.getElementById('filterCategory').value;
    const supplierId = document.getElementById('filterSupplier').value;
    const stockStatus = document.getElementById('filterStock').value;

    // Hiển thị loading
    document.getElementById('inventoryTable').innerHTML = `
      <tr>
        <td colspan="9" class="text-center">
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

      const inventoryData = await window.AdminMockData.getInventoryReports();

      // Hiển thị tổng quan
      displayOverview(inventoryData.overview);

      // Hiển thị biểu đồ tồn kho theo danh mục
      displayCategoryStockChart(inventoryData.stockByCategory);

      // Hiển thị biểu đồ giá trị tồn kho theo danh mục
      displayCategoryValueChart(inventoryData.valueByCategory);

      // Hiển thị bảng chi tiết
      displayInventoryTable(inventoryData.products);

      // Cập nhật thông tin phân trang (mock data doesn't have real pagination)
      document.getElementById('displayedProducts').textContent = inventoryData.products.length;
      document.getElementById('totalFilteredProducts').textContent = inventoryData.products.length;
      totalPages = 1;

      // Hiển thị phân trang
      displayPagination(currentPage, totalPages);

    } catch (error) {
      console.error('Error loading inventory data:', error);

      // Hiển thị thông báo lỗi trong bảng
      document.getElementById('inventoryTable').innerHTML = `
        <tr>
          <td colspan="9" class="text-center text-danger">
            Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.
          </td>
        </tr>
      `;
    }
  }

  // Hàm hiển thị tổng quan
  function displayOverview(overview) {
    document.getElementById('totalProducts').textContent = overview.totalProducts;
    document.getElementById('totalStock').textContent = overview.totalStock;
    document.getElementById('lowStockProducts').textContent = overview.lowStockProducts;
    document.getElementById('inventoryValue').textContent = formatCurrency(overview.inventoryValue);
  }

  // Hàm hiển thị biểu đồ tồn kho theo danh mục
  function displayCategoryStockChart(stockByCategory) {
    const ctx = document.getElementById('categoryStockChart').getContext('2d');

    // Nếu biểu đồ đã tồn tại, hủy nó
    if (categoryStockChart) {
      categoryStockChart.destroy();
    }

    // Chuẩn bị dữ liệu
    const labels = stockByCategory.map(item => item.category);
    const data = stockByCategory.map(item => item.quantity);

    // Tạo biểu đồ mới
    categoryStockChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Số lượng tồn kho',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Hàm hiển thị biểu đồ giá trị tồn kho theo danh mục
  function displayCategoryValueChart(valueByCategory) {
    const ctx = document.getElementById('categoryValueChart').getContext('2d');

    // Nếu biểu đồ đã tồn tại, hủy nó
    if (categoryValueChart) {
      categoryValueChart.destroy();
    }

    // Chuẩn bị dữ liệu
    const labels = valueByCategory.map(item => item.category);
    const data = valueByCategory.map(item => item.value);

    // Tạo biểu đồ mới
    categoryValueChart = new Chart(ctx, {
      type: 'pie',
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

  // Hàm hiển thị bảng chi tiết tồn kho
  function displayInventoryTable(products) {
    const tableBody = document.getElementById('inventoryTable');
    tableBody.innerHTML = '';

    if (products.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center">
            Không có sản phẩm nào
          </td>
        </tr>
      `;
      return;
    }

    products.forEach((product, index) => {
      const row = document.createElement('tr');

      // Tạo badge cho trạng thái tồn kho
      let stockBadge = '';
      if (product.stock === 0) {
        stockBadge = '<span class="badge badge-out-of-stock">Hết hàng</span>';
      } else if (product.stock <= 5) {
        stockBadge = '<span class="badge badge-low-stock">Sắp hết</span>';
      } else if (product.stock >= 50) {
        stockBadge = '<span class="badge badge-overstock">Tồn kho cao</span>';
      } else {
        stockBadge = '<span class="badge badge-in-stock">Còn hàng</span>';
      }

      row.innerHTML = `
        <td>${index + 1 + currentPage * pageSize}</td>
        <td>
          <img src="${product.image || '../../assets/image/default-image.avif'}" alt="${product.name}" class="img-thumbnail" style="width: 50px; height: 50px; object-fit: cover;">
        </td>
        <td>
          <strong>${product.name}</strong>
          <br>
          <small class="text-muted">SKU: ${product.sku}</small>
        </td>
        <td>${product.category}</td>
        <td>${product.supplier}</td>
        <td>${formatCurrency(product.price)}</td>
        <td>${product.stock}</td>
        <td>${formatCurrency(product.price * product.stock)}</td>
        <td>${stockBadge}</td>
      `;

      tableBody.appendChild(row);
    });
  }

  // Hàm hiển thị phân trang
  function displayPagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    if (totalPages <= 1) {
      return;
    }

    const pagination = createPagination(currentPage, totalPages, (page) => {
      currentPage = page;
      loadInventoryData();
    });

    paginationContainer.appendChild(pagination);
  }

  // Hàm thiết lập các sự kiện
  function setupEventListeners() {
    // Sự kiện nút áp dụng bộ lọc
    document.getElementById('btnApplyFilter').addEventListener('click', function() {
      currentPage = 0;
      loadInventoryData();
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

  // Hàm xuất báo cáo
  function exportReport(type) {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const categoryId = document.getElementById('filterCategory').value;
    const supplierId = document.getElementById('filterSupplier').value;
    const stockStatus = document.getElementById('filterStock').value;

    // Xây dựng URL với các tham số lọc
    let url = `/api/reports/inventory/export?type=${type}`;

    if (categoryId) {
      url += `&categoryId=${categoryId}`;
    }

    if (supplierId) {
      url += `&supplierId=${supplierId}`;
    }

    if (stockStatus) {
      url += `&stockStatus=${stockStatus}`;
    }

    // Tải file
    window.open(url, '_blank');
  }
});



