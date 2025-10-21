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
  console.log('Manage blogs page initialized');
  
  // Override all edit/delete buttons
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-edit') || e.target.classList.contains('btn-delete') || 
        e.target.closest('.btn-edit') || e.target.closest('.btn-delete')) {
      e.preventDefault();
      showWarningToast('Chức năng đang phát triển');
    }
  });

  // Load blogs data
  loadBlogsData();
}

async function loadBlogsData() {
  try {
    let blogs = [];
    
    // Use mock data service
    if (window.MockDataService) {
      const blogsData = await window.MockDataService.getBlogs(0, 50);
      blogs = blogsData.content || [];
    }
    
    displayBlogs(blogs);
    
  } catch (error) {
    console.error('Error loading blogs:', error);
    showErrorToast('Không thể tải danh sách bài viết');
  }
}

function displayBlogs(blogs) {
  const tableBody = document.getElementById('blogTable');
  if (!tableBody) {
    console.error('Table body with id "blogTable" not found');
    return;
  }

  if (blogs.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="6" class="text-center">Không có bài viết nào</td></tr>';
    return;
  }

  tableBody.innerHTML = blogs.map((blog, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>
        <img src="${blog.image || '../assets/image/default-image.avif'}" 
             alt="${blog.title}" style="width: 60px; height: 40px; object-fit: cover; border-radius: 4px;">
      </td>
      <td>
        <strong>${blog.title}</strong><br>
        <small class="text-muted">${blog.excerpt?.substring(0, 100) || ''}...</small>
      </td>
      <td>${blog.author || 'Admin'}</td>
      <td>${blog.category || 'Chung'}</td>
      <td>${formatDate(blog.createDate)}</td>
      <td>
        <div class="btn-group btn-group-sm">
          <button class="btn btn-outline-primary" onclick="editBlog(${blog.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-outline-danger" onclick="deleteBlog(${blog.id})">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Các hàm xử lý CRUD
function editBlog(id) {
  showWarningToast('Chức năng đang phát triển');
}

function deleteBlog(id) {
  showWarningToast('Chức năng đang phát triển');
}

function editBlog(id) {
  console.log('Edit blog:', id);
  showSuccessToast('Chức năng đang phát triển');
}

function deleteBlog(id) {
  showConfirmDialog('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa bài viết này?', function() {
    console.log('Delete blog:', id);
    showSuccessToast('Đã xóa bài viết (mock)');
    loadBlogsData();
  });
}