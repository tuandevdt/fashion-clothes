// Simple API Service - Mock Data Only

// API Functions for Mock Data
const apiService = {
    // Products
    getProducts: async (params = {}) => {
        if (window.MockDataService) {
            const page = params.page || 0;
            const limit = params.limit || 12;
            const categoryId = params.categoryId || null;
            const keyword = params.keyword || '';
            return await window.MockDataService.getProducts(page, limit, categoryId, keyword);
        }
        throw new Error('Mock data service not available');
    },

    getProductById: async (id) => {
        if (window.MockDataService) {
            return await window.MockDataService.getProductById(id);
        }
        throw new Error('Mock data service not available');
    },

    getFeaturedProducts: async () => {
        if (window.MockDataService) {
            return await window.MockDataService.getFeaturedProducts(8);
        }
        throw new Error('Mock data service not available');
    },

    getProductsByCategory: async (categoryId, page = 1, limit = 8) => {
        if (window.MockDataService) {
            return await window.MockDataService.getProducts(page, limit, categoryId);
        }
        throw new Error('Mock data service not available');
    },

    // Categories
    getCategories: async () => {
        if (window.MockDataService) {
            return await window.MockDataService.getCategories();
        }
        throw new Error('Mock data service not available');
    },

    // Cart
    getCartByUser: async (userId) => {
        if (window.MockDataService) {
            return await window.MockDataService.getCartByUser(userId);
        }
        throw new Error('Mock data service not available');
    },

    addToCart: async (cartData) => {
        if (window.MockDataService) {
            return await window.MockDataService.fakeAddToCart(
                cartData.productId, 
                cartData.quantity
            );
        }
        throw new Error('Mock data service not available');
    },

    updateCartItem: async (id, quantity) => {
        if (window.MockDataService) {
            return await window.MockDataService.updateCartItem(id, quantity);
        }
        throw new Error('Mock data service not available');
    },

    deleteCartItem: async (id) => {
        if (window.MockDataService) {
            return await window.MockDataService.removeCartItem(id);
        }
        throw new Error('Mock data service not available');
    },

    clearCart: async (userId) => {
        if (window.MockDataService) {
            return await window.MockDataService.clearCart(userId);
        }
        throw new Error('Mock data service not available');
    },

    // Blog
    getBlogs: async (params = {}) => {
        if (window.MockDataService) {
            const page = params.page || 0;
            const limit = params.limit || 10;
            return await window.MockDataService.getBlogs(page, limit);
        }
        throw new Error('Mock data service not available');
    },

    getBlogById: async (id) => {
        if (window.MockDataService) {
            return await window.MockDataService.getBlogById(id);
        }
        throw new Error('Mock data service not available');
    }
};
