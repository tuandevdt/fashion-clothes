document.addEventListener('DOMContentLoaded', function() {
  // Kiểm tra đăng nhập
  if (!checkAuth()) {
    return;
  }

  // Load layout components
  loadLayoutComponents();

  // Load user profile data
  loadUserProfile();

  // Setup form handlers
  setupFormHandlers();
});

async function loadUserProfile() {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    console.error('User ID not found');
    return;
  }

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
    
    console.log('Loading admin profile...');
    const user = await window.AdminMockData.getAdminProfile();
    console.log('Admin profile loaded:', user);
      
    if (user) {
      // Update profile display
      if (document.getElementById('profileAvatar')) document.getElementById('profileAvatar').src = user.avatar || '../../assets/image/default-image.avif';
      if (document.getElementById('profileFullName')) document.getElementById('profileFullName').textContent = user.fullName || user.username;
      if (document.getElementById('profileUsername')) document.getElementById('profileUsername').textContent = `@${user.username}`;
      if (document.getElementById('profileEmail')) document.getElementById('profileEmail').textContent = user.email || 'Đang tải...';
      if (document.getElementById('profilePhone')) document.getElementById('profilePhone').textContent = user.phone || 'Đang tải...';
      if (document.getElementById('profileAddress')) document.getElementById('profileAddress').textContent = user.address || 'Đang tải...';
      if (document.getElementById('profileRole')) document.getElementById('profileRole').textContent = user.role === 'admin' ? 'Quản trị viên' : user.role;
      
      // Update system info
      if (document.getElementById('profileCreateDate')) document.getElementById('profileCreateDate').textContent = formatDate(user.createdAt);
      if (document.getElementById('profileCreateBy')) document.getElementById('profileCreateBy').textContent = 'Hệ thống';
      if (document.getElementById('profileUpdateDate')) document.getElementById('profileUpdateDate').textContent = formatDate(user.lastLogin);
      if (document.getElementById('profileUpdateBy')) document.getElementById('profileUpdateBy').textContent = user.fullName;

      // Update form fields if they exist
      if (document.getElementById('username')) document.getElementById('username').value = user.username || '';
      if (document.getElementById('email')) document.getElementById('email').value = user.email || '';
      if (document.getElementById('fullname')) document.getElementById('fullname').value = user.fullName || '';
      if (document.getElementById('phone')) document.getElementById('phone').value = user.phone || '';
      if (document.getElementById('address')) document.getElementById('address').value = user.address || '';
    }
  } catch (error) {
    console.error('Error loading user profile:', error);
    handleError(error);
  }
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function setupFormHandlers() {
  // Profile update form
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', handleProfileUpdate);
  }

  // Password change form
  const passwordForm = document.getElementById('passwordForm');
  if (passwordForm) {
    passwordForm.addEventListener('submit', handlePasswordChange);
  }

  // Avatar upload
  const avatarInput = document.getElementById('avatarInput');
  if (avatarInput) {
    avatarInput.addEventListener('change', handleAvatarUpload);
  }
}

async function handleProfileUpdate(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const userData = {
    username: formData.get('username'),
    email: formData.get('email'),
    fullname: formData.get('fullname'),
    phone: formData.get('phone'),
    address: formData.get('address')
  };

  try {
    const userId = localStorage.getItem('userId');
    
    if (window.AdminMockData) {
      await window.AdminMockData.updateUser(userId, userData);
      
      Swal.fire({
        title: 'Thành công!',
        text: 'Cập nhật thông tin thành công',
        icon: 'success'
      });

      // Update localStorage if needed
      if (userData.fullname) {
        localStorage.setItem('fullName', userData.fullname);
      }
      
    } else {
      throw new Error('Mock data not available');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    Swal.fire({
      title: 'Lỗi!',
      text: 'Không thể cập nhật thông tin',
      icon: 'error'
    });
  }
}

async function handlePasswordChange(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const passwordData = {
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
    confirmPassword: formData.get('confirmPassword')
  };

  // Validate passwords match
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    Swal.fire({
      title: 'Lỗi!',
      text: 'Mật khẩu mới và xác nhận mật khẩu không khớp',
      icon: 'error'
    });
    return;
  }

  try {
    // In mock mode, just simulate success
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    Swal.fire({
      title: 'Thành công!',
      text: 'Đổi mật khẩu thành công',
      icon: 'success'
    });

    // Reset form
    event.target.reset();
    
  } catch (error) {
    console.error('Error changing password:', error);
    Swal.fire({
      title: 'Lỗi!',
      text: 'Không thể đổi mật khẩu',
      icon: 'error'
    });
  }
}

async function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith('image/')) {
    Swal.fire({
      title: 'Lỗi!',
      text: 'Vui lòng chọn file hình ảnh',
      icon: 'error'
    });
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    Swal.fire({
      title: 'Lỗi!',
      text: 'Kích thước file không được vượt quá 5MB',
      icon: 'error'
    });
    return;
  }

  try {
    // In mock mode, just show the selected image
    const reader = new FileReader();
    reader.onload = function(e) {
      const avatarElement = document.getElementById('profileAvatar');
      if (avatarElement) {
        avatarElement.src = e.target.result;
      }
    };
    reader.readAsDataURL(file);

    Swal.fire({
      title: 'Thành công!',
      text: 'Cập nhật ảnh đại diện thành công',
      icon: 'success'
    });
    
  } catch (error) {
    console.error('Error uploading avatar:', error);
    Swal.fire({
      title: 'Lỗi!',
      text: 'Không thể tải lên ảnh đại diện',
      icon: 'error'
    });
  }
}

function handleError(error) {
  console.error('Profile error:', error);
  Swal.fire({
    title: 'Lỗi!',
    text: 'Có lỗi xảy ra khi tải thông tin người dùng',
    icon: 'error'
  });
}
