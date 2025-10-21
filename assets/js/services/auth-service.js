// Authentication Service
class AuthService {
    constructor() {
        this.currentUser = null;
        this.loadCurrentUser();
    }

    // Load current user from localStorage
    loadCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        const token = localStorage.getItem('token') || localStorage.getItem('authToken'); // Support both token keys
        
        if (userData && token) {
            this.currentUser = JSON.parse(userData);
        }
    }

    // Register new user
    async register(userData) {
        try {
            const response = await window.MockDataService.registerUser(userData);
            
            if (response.success) {
                // Auto login after successful registration
                await this.login(userData.email, userData.password);
                return response;
            } else {
                throw new Error(response.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            throw error;
        }
    }

    // Login user
    async login(email, password) {
        try {
            const response = await window.MockDataService.loginUser(email, password);
            
            if (response.success) {
                // Save user data and token (using 'token' key for admin compatibility)
                this.currentUser = response.user;
                localStorage.setItem('currentUser', JSON.stringify(response.user));
                localStorage.setItem('token', response.token); // Use 'token' instead of 'authToken'
                localStorage.setItem('authToken', response.token); // Keep both for backward compatibility
                localStorage.setItem('userId', response.user.id.toString());
                localStorage.setItem('role', response.user.role.toUpperCase());
                
                return response;
            } else {
                throw new Error(response.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            throw error;
        }
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        localStorage.removeItem('token'); // Remove both token keys
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        
        // Redirect to login page
        window.location.href = 'login.html';
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null && (localStorage.getItem('authToken') !== null || localStorage.getItem('token') !== null);
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Get user ID
    getCurrentUserId() {
        return this.currentUser ? this.currentUser.id : null;
    }

    // Check if user has admin role
    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }

    // Update user profile
    async updateProfile(updateData) {
        try {
            const userId = this.getCurrentUserId();
            if (!userId) {
                throw new Error('Người dùng chưa đăng nhập');
            }

            const response = await window.MockDataService.updateUserProfile(userId, updateData);
            
            if (response.success) {
                // Update current user data
                this.currentUser = response.user;
                localStorage.setItem('currentUser', JSON.stringify(response.user));
                return response;
            } else {
                throw new Error(response.message || 'Cập nhật thông tin thất bại');
            }
        } catch (error) {
            throw error;
        }
    }

    // Change password
    async changePassword(oldPassword, newPassword) {
        try {
            const userId = this.getCurrentUserId();
            if (!userId) {
                throw new Error('Người dùng chưa đăng nhập');
            }

            const response = await window.MockDataService.changePassword(userId, oldPassword, newPassword);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Validate email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate password strength
    validatePassword(password) {
        if (password.length < 6) {
            return { valid: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' };
        }
        return { valid: true };
    }
}

// Create global instance
window.AuthService = new AuthService();