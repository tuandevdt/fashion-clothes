// Mock Data Service for Fashion Shop
// This file contains all mock data for products, categories, blogs, users, orders, cart

const MockDataService = {
    // Categories for fashion shop
    categories: [
        {
            id: 1,
            name: 'Áo thun',
            slug: 'ao-thun',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
            description: 'Áo thun nam nữ thời trang, chất lượng cao',
            count: 6
        },
        {
            id: 2,
            name: 'Áo sơ mi',
            slug: 'ao-so-mi',
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop',
            description: 'Áo sơ mi công sở, dạo phố phong cách',
            count: 4
        },
        {
            id: 3,
            name: 'Quần jeans',
            slug: 'quan-jeans',
            image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
            description: 'Quần jeans nam nữ, nhiều kiểu dáng',
            count: 4
        },
        {
            id: 4,
            name: 'Váy đầm',
            slug: 'vay-dam',
            image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=400&h=300&fit=crop',
            description: 'Váy đầm nữ thanh lịch, quyến rũ cho mọi dịp',
            count: 4
        },
        {
            id: 5,
            name: 'Phụ kiện',
            slug: 'phu-kien',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
            description: 'Phụ kiện thời trang: túi xách, giày dép, trang sức',
            count: 6
        },
    ],

    // Products for fashion shop
    products: [
        {
            id: 1,
            name: 'Áo thun cotton nam basic',
            price: 250000,
            salePrice: 199000,
            description: 'Áo thun nam cotton 100% cao cấp, form regular fit thoải mái. Chất liệu cotton mềm mại, thấm hút mồ hôi tốt. Phù hợp mặc hàng ngày, đi chơi.',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop'
            ],
            categoryId: 1,
            category: 'Áo thun',
            brand: 'Fashion House',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Trắng', 'Đen', 'Xám', 'Navy'],
            rating: 4.5,
            reviewCount: 28,
            stock: 50,
            sku: 'AT001',
            featured: true
        },
        {
            id: 2,
            name: 'Áo sơ mi nữ công sở',
            price: 450000,
            salePrice: 360000,
            description: 'Áo sơ mi nữ chất liệu voan cao cấp, thiết kế thanh lịch phù hợp cho môi trường công sở. Form dáng vừa vặn, tôn dáng.',
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500&h=600&fit=crop'
            ],
            categoryId: 2,
            category: 'Áo sơ mi',
            brand: 'Office Style',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Trắng', 'Hồng nhạt', 'Xanh mint'],
            rating: 4.8,
            reviewCount: 35,
            stock: 30,
            sku: 'ASM001',
            featured: true
        },
        {
            id: 3,
            name: 'Quần jeans slim fit nam',
            price: 650000,
            salePrice: 520000,
            description: 'Quần jeans nam form slim fit, chất liệu denim co giãn thoải mái. Thiết kế hiện đại, phù hợp nhiều phong cách.',
            image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1584370848010-d7fe6bc6ce47?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop'
            ],
            categoryId: 3,
            category: 'Quần jeans',
            brand: 'Denim Co',
            sizes: ['29', '30', '31', '32', '33', '34'],
            colors: ['Xanh đậm', 'Xanh nhạt', 'Đen'],
            rating: 4.3,
            reviewCount: 42,
            stock: 25,
            sku: 'QJ001',
            featured: false
        },
        {
            id: 4,
            name: 'Váy maxi hoa nhí',
            price: 580000,
            description: 'Váy maxi họa tiết hoa nhí duyên dáng, chất liệu voan mềm mại. Thiết kế nữ tính, phù hợp dạo phố, đi chơi.',
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1583496661160-fb5886a13804?w=500&h=600&fit=crop'
            ],
            categoryId: 4,
            category: 'Váy',
            brand: 'Feminine',
            sizes: ['S', 'M', 'L'],
            colors: ['Hoa xanh', 'Hoa hồng', 'Hoa vàng'],
            rating: 4.7,
            reviewCount: 19,
            stock: 15,
            sku: 'V001',
            featured: true
        },
        {
            id: 5,
            name: 'Áo khoác bomber unisex',
            price: 750000,
            salePrice: 600000,
            description: 'Áo khoác bomber phong cách unisex, chất liệu polyester chống gió nhẹ. Thiết kế trẻ trung, năng động.',
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1525972021-04b3cf09fb96?w=500&h=600&fit=crop'
            ],
            categoryId: 5,
            category: 'Áo khoác',
            brand: 'Urban Style',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Đen', 'Navy', 'Olive'],
            rating: 4.4,
            reviewCount: 26,
            stock: 20,
            sku: 'AK001',
            featured: true
        },
        {
            id: 6,
            name: 'Túi tote canvas',
            price: 350000,
            salePrice: 280000,
            description: 'Túi tote chất liệu canvas bền đẹp, thiết kế tối giản hiện đại. Phù hợp đi học, đi làm, shopping.',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=600&fit=crop'
            ],
            categoryId: 6,
            category: 'Phụ kiện',
            brand: 'Canvas Co',
            sizes: ['One Size'],
            colors: ['Đen', 'Trắng', 'Be'],
            rating: 4.6,
            reviewCount: 31,
            stock: 40,
            sku: 'PK001',
            featured: false
        },
        {
            id: 7,
            name: 'Áo hoodie nam nữ',
            price: 550000,
            salePrice: 440000,
            description: 'Áo hoodie unisex chất liệu nỉ cotton pha, form oversized thoải mái. Có mũ và túi kangaroo tiện lợi.',
            image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=600&fit=crop'
            ],
            categoryId: 5,
            category: 'Áo khoác',
            brand: 'Street Wear',
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: ['Đen', 'Xám', 'Navy', 'Trắng'],
            rating: 4.5,
            reviewCount: 38,
            stock: 35,
            sku: 'AH001',
            featured: true
        },
        {
            id: 8,
            name: 'Chân váy chữ A',
            price: 420000,
            description: 'Chân váy chữ A dáng xòe nhẹ, chất liệu vải tuyết mưa cao cấp. Phù hợp đi làm, đi chơi.',
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1582142306909-195724d75c9f?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500&h=600&fit=crop'
            ],
            categoryId: 4,
            category: 'Váy',
            brand: 'Classic',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Đen', 'Navy', 'Be', 'Xám'],
            rating: 4.2,
            reviewCount: 15,
            stock: 22,
        },
        {
            id: 9,
            name: 'Áo thun polo nam',
            price: 320000,
            salePrice: 280000,
            description: 'Áo polo nam chất liệu cotton pique thấm hút mồ hôi tốt, thiết kế thanh lịch phù hợp đi làm.',
            image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop'
            ],
            categoryId: 1,
            category: 'Áo thun',
            brand: 'Polo Classic',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Trắng', 'Đen', 'Navy', 'Xám'],
            rating: 4.3,
            reviewCount: 22,
            stock: 35,
            sku: 'AT002',
            featured: false
        },
        {
            id: 10,
            name: 'Áo thun nữ croptop',
            price: 180000,
            salePrice: 150000,
            description: 'Áo thun nữ form croptop trẻ trung, chất liệu cotton co giãn thoải mái.',
            image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&h=600&fit=crop'
            ],
            categoryId: 1,
            category: 'Áo thun',
            brand: 'Young Style',
            sizes: ['S', 'M', 'L'],
            colors: ['Trắng', 'Hồng', 'Đen', 'Vàng'],
            rating: 4.2,
            reviewCount: 18,
            stock: 28,
            sku: 'AT003',
            featured: false
        },
        {
            id: 11,
            name: 'Áo thun nam oversized',
            price: 280000,
            description: 'Áo thun nam form oversized hiện đại, chất liệu cotton 100% mềm mại.',
            image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=600&fit=crop'
            ],
            categoryId: 1,
            category: 'Áo thun',
            brand: 'Street Fashion',
            sizes: ['M', 'L', 'XL', 'XXL'],
            colors: ['Đen', 'Trắng', 'Xám', 'Navy'],
            rating: 4.4,
            reviewCount: 31,
            stock: 42,
            sku: 'AT004',
            featured: true
        },
        {
            id: 12,
            name: 'Áo sơ mi nam tay dài',
            price: 520000,
            salePrice: 450000,
            description: 'Áo sơ mi nam tay dài chất liệu cotton cao cấp, thiết kế formal phù hợp công sở.',
            image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop'
            ],
            categoryId: 2,
            category: 'Áo sơ mi',
            brand: 'Business Style',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Trắng', 'Xanh nhạt', 'Hồng nhạt'],
            rating: 4.5,
            reviewCount: 25,
            stock: 20,
            sku: 'ASM002',
            featured: true
        },
        {
            id: 13,
            name: 'Áo sơ mi nữ tay ngắn',
            price: 380000,
            salePrice: 320000,
            description: 'Áo sơ mi nữ tay ngắn thiết kế trẻ trung, phù hợp đi học và dạo phố.',
            image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1551803091-e20673f15770?w=500&h=600&fit=crop'
            ],
            categoryId: 2,
            category: 'Áo sơ mi',
            brand: 'Casual Chic',
            sizes: ['S', 'M', 'L'],
            colors: ['Trắng', 'Vàng nhạt', 'Xanh mint'],
            rating: 4.3,
            reviewCount: 19,
            stock: 30,
            sku: 'ASM003',
            featured: false
        },
        {
            id: 14,
            name: 'Quần jeans nữ skinny',
            price: 590000,
            salePrice: 480000,
            description: 'Quần jeans nữ form skinny ôm dáng, chất liệu denim co giãn thoải mái.',
            image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop'
            ],
            categoryId: 3,
            category: 'Quần jeans',
            brand: 'Denim Girl',
            sizes: ['25', '26', '27', '28', '29', '30'],
            colors: ['Xanh đậm', 'Đen', 'Xanh nhạt'],
            rating: 4.4,
            reviewCount: 33,
            stock: 25,
            sku: 'QJ002',
            featured: true
        },
        {
            id: 15,
            name: 'Quần jeans nam straight',
            price: 680000,
            description: 'Quần jeans nam form straight classic, chất liệu denim bền đẹp.',
            image: 'https://images.unsplash.com/photo-1506629905920-48644d2b4ac1?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1506629905920-48644d2b4ac1?w=500&h=600&fit=crop'
            ],
            categoryId: 3,
            category: 'Quần jeans',
            brand: 'Classic Denim',
            sizes: ['30', '31', '32', '33', '34', '36'],
            colors: ['Xanh đậm', 'Đen'],
            rating: 4.2,
            reviewCount: 28,
            stock: 18,
            sku: 'QJ003',
            featured: false
        },
        {
            id: 16,
            name: 'Váy mini jean',
            price: 350000,
            salePrice: 280000,
            description: 'Váy mini chất liệu jean trẻ trung, phù hợp phong cách năng động.',
            image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop'
            ],
            categoryId: 4,
            category: 'Váy đầm',
            brand: 'Denim Style',
            sizes: ['S', 'M', 'L'],
            colors: ['Xanh jean', 'Đen'],
            rating: 4.1,
            reviewCount: 16,
            stock: 24,
            sku: 'V002',
            featured: false
        },
        {
            id: 17,
            name: 'Đầm midi thanh lịch',
            price: 720000,
            salePrice: 620000,
            description: 'Đầm midi thiết kế thanh lịch, chất liệu voan cao cấp phù hợp dự tiệc.',
            image: 'https://images.unsplash.com/photo-1566479179817-c28e05e8b1b4?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1566479179817-c28e05e8b1b4?w=500&h=600&fit=crop'
            ],
            categoryId: 4,
            category: 'Váy đầm',
            brand: 'Elegant',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Đen', 'Navy', 'Đỏ đậm'],
            rating: 4.6,
            reviewCount: 21,
            stock: 12,
            sku: 'V003',
            featured: true
        },
        {
            id: 18,
            name: 'Túi xách tay nữ',
            price: 480000,
            salePrice: 390000,
            description: 'Túi xách tay nữ chất liệu da PU cao cấp, thiết kế sang trọng.',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop'
            ],
            categoryId: 5,
            category: 'Phụ kiện',
            brand: 'Luxury Bag',
            sizes: ['One Size'],
            colors: ['Đen', 'Nâu', 'Be'],
            rating: 4.5,
            reviewCount: 27,
            stock: 15,
            sku: 'PK002',
            featured: true
        },
        {
            id: 19,
            name: 'Balo mini nữ',
            price: 350000,
            description: 'Balo mini nữ thiết kế xinh xắn, chất liệu vải canvas bền đẹp.',
            image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500&h=600&fit=crop'
            ],
            categoryId: 5,
            category: 'Phụ kiện',
            brand: 'Mini Style',
            sizes: ['One Size'],
            colors: ['Hồng', 'Xanh', 'Đen', 'Trắng'],
            rating: 4.3,
            reviewCount: 24,
            stock: 32,
            sku: 'PK003',
            featured: false
        },
        {
            id: 20,
            name: 'Áo thun nữ basic',
            price: 190000,
            salePrice: 160000,
            description: 'Áo thun nữ basic form regular fit, chất liệu cotton mềm mại.',
            image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1544441893-675973e31985?w=500&h=600&fit=crop'
            ],
            categoryId: 1,
            category: 'Áo thun',
            brand: 'Basic Line',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Trắng', 'Đen', 'Xám', 'Hồng nhạt'],
            rating: 4.4,
            reviewCount: 29,
            stock: 45,
            sku: 'AT005',
            featured: false
        },
        {
            id: 21,
            name: 'Áo sơ mi kẻ sọc',
            price: 420000,
            salePrice: 350000,
            description: 'Áo sơ mi họa tiết kẻ sọc trẻ trung, phù hợp nhiều phong cách.',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop'
            ],
            categoryId: 2,
            category: 'Áo sơ mi',
            brand: 'Striped Style',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Xanh sọc', 'Đỏ sọc', 'Đen sọc'],
            rating: 4.2,
            reviewCount: 17,
            stock: 22,
            sku: 'ASM004',
            featured: false
        },
        {
            id: 22,
            name: 'Quần jeans rách gối',
            price: 620000,
            salePrice: 520000,
            description: 'Quần jeans nam với điểm nhấn rách gối cá tính, phong cách street style.',
            image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop'
            ],
            categoryId: 3,
            category: 'Quần jeans',
            brand: 'Street Denim',
            sizes: ['29', '30', '31', '32', '33'],
            colors: ['Xanh nhạt', 'Xanh đậm'],
            rating: 4.3,
            reviewCount: 22,
            stock: 16,
            sku: 'QJ004',
            featured: true
        },
        {
            id: 23,
            name: 'Váy suông nữ tính',
            price: 450000,
            description: 'Váy suông nữ tính dáng rộng thoải mái, chất liệu vải mềm mại.',
            image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop'
            ],
            categoryId: 4,
            category: 'Váy đầm',
            brand: 'Feminine Touch',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Hồng nhạt', 'Xanh mint', 'Trắng'],
            rating: 4.4,
            reviewCount: 26,
            stock: 19,
            sku: 'V004',
            featured: false
        },
        {
            id: 24,
            name: 'Kính râm unisex',
            price: 280000,
            salePrice: 220000,
            description: 'Kính râm unisex bảo vệ mắt khỏi tia UV, thiết kế thời trang.',
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=600&fit=crop'
            ],
            categoryId: 5,
            category: 'Phụ kiện',
            brand: 'Sun Style',
            sizes: ['One Size'],
            colors: ['Đen', 'Nâu', 'Navy'],
            rating: 4.2,
            reviewCount: 15,
            stock: 28,
            sku: 'PK004',
            featured: false
        },
        {
            id: 25,
            name: 'Áo thun thể thao',
            price: 240000,
            salePrice: 200000,
            description: 'Áo thun thể thao chất liệu polyester thoáng mát, thấm hút mồ hôi tốt.',
            image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=600&fit=crop'
            ],
            categoryId: 1,
            category: 'Áo thun',
            brand: 'Sport Active',
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: ['Đen', 'Xám', 'Navy', 'Xanh lá'],
            rating: 4.5,
            reviewCount: 34,
            stock: 40,
            sku: 'AT006',
            featured: true
        },
        {
            id: 26,
            name: 'Áo sơ mi jean nữ',
            price: 480000,
            salePrice: 400000,
            description: 'Áo sơ mi jean nữ phong cách casual, kết hợp được nhiều outfit.',
            image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500&h=600&fit=crop'
            ],
            categoryId: 2,
            category: 'Áo sơ mi',
            brand: 'Casual Jean',
            sizes: ['S', 'M', 'L'],
            colors: ['Xanh jean', 'Đen jean'],
            rating: 4.3,
            reviewCount: 20,
            stock: 25,
            sku: 'ASM005',
            featured: false
        },
        {
            id: 27,
            name: 'Quần jeans wide leg',
            price: 720000,
            salePrice: 580000,
            description: 'Quần jeans nữ dáng wide leg trendy, chất liệu denim cao cấp.',
            image: 'https://images.unsplash.com/photo-1582142306909-195724d75c9f?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1582142306909-195724d75c9f?w=500&h=600&fit=crop'
            ],
            categoryId: 3,
            category: 'Quần jeans',
            brand: 'Trendy Denim',
            sizes: ['25', '26', '27', '28', '29'],
            colors: ['Xanh nhạt', 'Đen', 'Xanh đậm'],
            rating: 4.6,
            reviewCount: 31,
            stock: 14,
            sku: 'QJ005',
            featured: true
        },
        {
            id: 28,
            name: 'Đầm bodycon',
            price: 580000,
            salePrice: 480000,
            description: 'Đầm bodycon ôm dáng quyến rũ, phù hợp dự tiệc và đi chơi.',
            image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13804?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1583496661160-fb5886a13804?w=500&h=600&fit=crop'
            ],
            categoryId: 4,
            category: 'Váy đầm',
            brand: 'Sexy Style',
            sizes: ['S', 'M', 'L'],
            colors: ['Đen', 'Đỏ', 'Navy'],
            rating: 4.5,
            reviewCount: 23,
            stock: 18,
            sku: 'V005',
            featured: true
        },
        {
            id: 29,
            name: 'Thắt lưng da nam',
            price: 320000,
            salePrice: 270000,
            description: 'Thắt lưng da nam cao cấp, khóa kim loại bền đẹp phù hợp công sở.',
            image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=600&fit=crop'
            ],
            categoryId: 5,
            category: 'Phụ kiện',
            brand: 'Leather Craft',
            sizes: ['M', 'L', 'XL'],
            colors: ['Đen', 'Nâu đậm', 'Nâu nhạt'],
            rating: 4.4,
            reviewCount: 18,
            stock: 22,
            sku: 'PK005',
            featured: false
        },
        {
            id: 30,
            name: 'Mũ bucket unisex',
            price: 150000,
            salePrice: 120000,
            description: 'Mũ bucket unisex bảo vệ khỏi nắng, thiết kế trẻ trung hiện đại.',
            image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=600&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=600&fit=crop'
            ],
            categoryId: 5,
            category: 'Phụ kiện',
            brand: 'Hat Style',
            sizes: ['One Size'],
            colors: ['Đen', 'Be', 'Xanh rêu', 'Trắng'],
            rating: 4.1,
            reviewCount: 12,
            stock: 35,
            sku: 'PK006',
            featured: false
        }
    ],

    // Blog posts for fashion shop
    blogs: [
        {
            id: 1,
            title: 'Xu hướng thời trang Thu Đông 2024',
            excerpt: 'Khám phá những xu hướng thời trang hot nhất mùa Thu Đông 2024 với những gam màu ấm áp và phong cách layer độc đáo.',
            content: 'Mùa Thu Đông 2024 đang đến gần với những xu hướng thời trang đầy thú vị. Gam màu earth tone như nâu, be, cam đất sẽ là những tông màu chủ đạo...',
            image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop',
            createDate: '2024-09-15',
            author: 'Nguyễn Thị Lan',
            category: 'Xu hướng thời trang',
            tags: ['fashion', 'trend', 'autumn', 'winter'],
            views: 1250,
            comments: 23
        },
        {
            id: 2,
            title: 'Cách phối đồ với áo thun basic',
            excerpt: 'Áo thun basic là item không thể thiếu trong tủ đồ. Hãy cùng tìm hiểu cách phối đồ đa dạng với chiếc áo thun đơn giản này.',
            content: 'Áo thun basic tưởng chừng đơn giản nhưng lại có thể tạo ra vô vàn outfit khác nhau. Với quần jeans, chúng ta có thể tạo ra phong cách năng động...',
            image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop',
            createDate: '2024-09-10',
            author: 'Trần Minh Anh',
            category: 'Phối đồ',
            tags: ['styling', 'basic', 'casual'],
            views: 890,
            comments: 15
        },
        {
            id: 3,
            title: 'Chọn size quần áo phù hợp',
            excerpt: 'Việc chọn đúng size quần áo rất quan trọng để có được outfit hoàn hảo. Bài viết này sẽ hướng dẫn bạn cách đo và chọn size chuẩn.',
            content: 'Việc chọn size quần áo phù hợp không chỉ giúp bạn thoải mái mà còn tôn lên vóc dáng. Đầu tiên, bạn cần biết số đo 3 vòng của mình...',
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
            createDate: '2024-09-05',
            author: 'Lê Thị Hương',
            category: 'Hướng dẫn',
            tags: ['size guide', 'fitting', 'tips'],
            views: 654,
            comments: 8
        },
        {
            id: 4,
            title: 'Bảo quản quần áo đúng cách',
            excerpt: 'Cách bảo quản quần áo đúng cách sẽ giúp tăng tuổi thọ và giữ được chất lượng sản phẩm lâu dài.',
            content: 'Việc bảo quản quần áo đúng cách rất quan trọng để duy trì chất lượng và màu sắc của sản phẩm. Với áo cotton, bạn nên giặt ở nhiệt độ thường...',
            image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=400&fit=crop',
            createDate: '2024-08-28',
            author: 'Phạm Văn Đức',
            category: 'Chăm sóc',
            tags: ['care', 'maintenance', 'tips'],
            views: 423,
            comments: 12
        },
        {
            id: 5,
            title: 'Street style Hàn Quốc đang hot',
            excerpt: 'Phong cách thời trang đường phố Hàn Quốc đang được giới trẻ Việt Nam yêu thích. Cùng khám phá những điểm đặc biệt của style này.',
            content: 'Street style Hàn Quốc được đặc trưng bởi sự kết hợp giữa tính thực dụng và thẩm mỹ. Các item oversized, layer nhiều lớp và màu sắc tương phản...',
            image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=400&fit=crop',
            createDate: '2024-08-20',
            author: 'Kim Min Jun',
            category: 'Phong cách',
            tags: ['korean style', 'street fashion', 'k-fashion'],
            views: 1089,
            comments: 29
        }
    ],

    // Cart items (fake data for demo)
    cart: [
        {
            id: 1,
            userId: 3,
            productId: 1,
            productName: 'Áo thun cotton nam basic',
            price: 199000,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop'
        },
        {
            id: 2,
            userId: 3,
            productId: 18,
            productName: 'Túi xách tay nữ',
            price: 390000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop'
        },
        {
            id: 3,
            userId: 3,
            productId: 25,
            productName: 'Áo thun thể thao',
            price: 200000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=600&fit=crop'
        }
    ],

    // Order history (fake orders)
    orders: [
        {
            id: 1001,
            userId: 3,
            fullname: 'Nguyễn Văn An',
            phone: '0912345678',
            orderDetails: [
                { 
                    productId: 1, 
                    productName: 'Áo thun cotton nam basic', 
                    quantity: 2, 
                    price: 199000,
                    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
                    color: 'Trắng',
                    size: 'L'
                },
                { 
                    productId: 4, 
                    productName: 'Váy maxi hoa nhí', 
                    quantity: 1, 
                    price: 580000,
                    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
                    color: 'Hoa nhí',
                    size: 'M'
                }
            ],
            totalAmount: 978000,
            status: 'delivered',
            orderDate: '2024-09-20',
            deliveryDate: '2024-09-25',
            shippingAddress: '123 Nguyễn Văn Cừ, Quận 5, TP.HCM',
            paymentMethod: 'Thanh toán khi nhận hàng (COD)',
            note: 'Giao hàng giờ hành chính'
        },
        {
            id: 1002,
            userId: 3,
            fullname: 'Trần Thị Bình',
            phone: '0987654321',
            orderDetails: [
                { 
                    productId: 2, 
                    productName: 'Áo sơ mi nữ công sở', 
                    quantity: 1, 
                    price: 360000,
                    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
                    color: 'Xanh navy',
                    size: 'S'
                }
            ],
            totalAmount: 360000,
            status: 'processing',
            orderDate: '2024-09-25',
            shippingAddress: '456 Lê Văn Việt, Quận 9, TP.HCM',
            paymentMethod: 'Chuyển khoản ngân hàng',
            note: 'Liên hệ trước khi giao'
        },
        {
            id: 1003,
            userId: 3,
            fullname: 'Lê Văn Cường',
            phone: '0901234567',
            orderDetails: [
                { 
                    productId: 14, 
                    productName: 'Quần jeans nữ skinny', 
                    quantity: 1, 
                    price: 480000,
                    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
                    color: 'Xanh đậm',
                    size: '29'
                },
                { 
                    productId: 20, 
                    productName: 'Áo thun nữ basic', 
                    quantity: 2, 
                    price: 160000,
                    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
                    color: 'Hồng pastel',
                    size: 'M'
                }
            ],
            totalAmount: 800000,
            status: 'shipping',
            orderDate: '2024-09-22',
            shippingAddress: '789 Trần Hưng Đạo, Quận 1, TP.HCM',
            paymentMethod: 'Thẻ tín dụng',
            note: ''
        },
        {
            id: 1004,
            userId: 3,
            fullname: 'Phạm Thị Dung',
            phone: '0913456789',
            orderDetails: [
                { 
                    productId: 27, 
                    productName: 'Quần jeans wide leg', 
                    quantity: 1, 
                    price: 580000,
                    image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400',
                    color: 'Xanh nhạt',
                    size: '30'
                }
            ],
            totalAmount: 580000,
            status: 'pending',
            orderDate: '2024-09-28',
            shippingAddress: '321 Võ Văn Tần, Quận 3, TP.HCM',
            paymentMethod: 'Ví điện tử MoMo',
            note: 'Giao hàng cuối tuần'
        }
    ],

    // User data
    users: [
        {
            id: 1,
            username: 'user123',
            email: 'user@gmail.com',
            fullName: 'Nguyễn Văn A',
            phone: '0123456789',
            address: '123 Nguyễn Văn Cừ, Quận 5, TP.HCM',
            password: '123456',
            role: 'customer',
            createdAt: '2024-01-15',
            isActive: true
        },
        {
            id: 2,
            username: 'admin',
            email: 'admin@gmail.com',
            fullName: 'Quản trị viên',
            phone: '0987654321',
            address: 'Hà Nội',
            password: '123456',
            role: 'admin',
            createdAt: '2024-01-01',
            isActive: true
        }
    ],

    // Wishlist (stored in localStorage)
    wishlist: [],

    // API simulation methods
    async getCategories() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.categories);
            }, 500);
        });
    },

    async getProducts(page = 0, size = 12, categoryId = null, keyword = '') {
        return new Promise((resolve) => {
            setTimeout(() => {
                let filteredProducts = [...this.products];

                if (categoryId) {
                    filteredProducts = filteredProducts.filter(p => p.categoryId == categoryId);
                }

                if (keyword) {
                    filteredProducts = filteredProducts.filter(p => 
                        p.name.toLowerCase().includes(keyword.toLowerCase()) ||
                        p.description.toLowerCase().includes(keyword.toLowerCase())
                    );
                }

                const startIndex = page * size;
                const endIndex = startIndex + size;
                const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

                resolve({
                    content: paginatedProducts,
                    totalElements: filteredProducts.length,
                    totalPages: Math.ceil(filteredProducts.length / size),
                    currentPage: page,
                    size: size
                });
            }, 300);
        });
    },

    async getProductById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const product = this.products.find(p => p.id == id);
                if (product) {
                    resolve(product);
                } else {
                    reject(new Error('Product not found'));
                }
            }, 200);
        });
    },

    async getFeaturedProducts(size = 8) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const featuredProducts = this.products.filter(p => p.featured).slice(0, size);
                resolve({
                    content: featuredProducts,
                    totalElements: featuredProducts.length
                });
            }, 300);
        });
    },

    async getBlogs(page = 0, size = 10) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const startIndex = page * size;
                const endIndex = startIndex + size;
                const paginatedBlogs = this.blogs.slice(startIndex, endIndex);

                resolve({
                    content: paginatedBlogs,
                    totalElements: this.blogs.length,
                    totalPages: Math.ceil(this.blogs.length / size),
                    currentPage: page,
                    size: size
                });
            }, 300);
        });
    },

    async getBlogById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const blog = this.blogs.find(b => b.id == id);
                if (blog) {
                    resolve(blog);
                } else {
                    reject(new Error('Blog not found'));
                }
            }, 200);
        });
    },

    // Fake add to cart (just show toast)
    async fakeAddToCart(productId, quantity = 1) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ 
                    success: true, 
                    message: 'Đã thêm vào giỏ hàng thành công!' 
                });
            }, 300);
        });
    },

    // Fake checkout (just show toast)  
    async fakeCheckout(orderData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ 
                    success: true, 
                    message: 'Đặt hàng thành công!', 
                    orderId: 'ORD' + Date.now()
                });
            }, 500);
        });
    },

    async addToCart(userId, productId, quantity = 1) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const product = this.products.find(p => p.id == productId);
                if (!product) {
                    reject(new Error('Product not found'));
                    return;
                }

                const existingItem = this.cart.find(item => 
                    item.userId == userId && item.productId == productId
                );

                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    this.cart.push({
                        id: Date.now(),
                        userId: userId,
                        productId: productId,
                        productName: product.name,
                        price: product.salePrice || product.price,
                        quantity: quantity,
                        image: product.image
                    });
                }

                resolve({ message: 'Added to cart successfully' });
            }, 200);
        });
    },

    async getCartByUser(userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userCart = this.cart.filter(item => item.userId == userId);
                resolve(userCart);
            }, 200);
        });
    },

    async updateCartItem(itemId, quantity) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const item = this.cart.find(item => item.id == itemId);
                if (item) {
                    item.quantity = quantity;
                    resolve({ message: 'Cart updated successfully' });
                } else {
                    reject(new Error('Cart item not found'));
                }
            }, 200);
        });
    },

    async removeCartItem(itemId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = this.cart.findIndex(item => item.id == itemId);
                if (index > -1) {
                    this.cart.splice(index, 1);
                }
                resolve({ message: 'Item removed from cart' });
            }, 200);
        });
    },

    async clearCart(userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.cart = this.cart.filter(item => item.userId != userId);
                resolve({ message: 'Cart cleared' });
            }, 200);
        });
    },

    async getCartCount(userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userCart = this.cart.filter(item => item.userId == userId);
                const count = userCart.reduce((total, item) => total + item.quantity, 0);
                resolve(count);
            }, 100);
        });
    },

    // Authentication methods
    async registerUser(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('MockDataService.registerUser called with:', userData);
                console.log('Current users array:', this.users);
                
                // Check if user already exists
                const existingUser = this.users.find(user => 
                    user.email === userData.email || user.username === userData.username
                );
                
                if (existingUser) {
                    console.log('User already exists:', existingUser);
                    reject(new Error('Email hoặc tên đăng nhập đã tồn tại'));
                    return;
                }
                
                // Create new user
                const newUser = {
                    id: this.users.length + 1,
                    username: userData.username || userData.email.split('@')[0],
                    email: userData.email,
                    fullName: userData.fullName,
                    phone: userData.phone || '',
                    address: userData.address || '',
                    password: userData.password, // In real app, this should be hashed
                    role: 'customer',
                    createdAt: new Date().toISOString().split('T')[0],
                    isActive: true
                };
                
                console.log('Creating new user:', newUser);
                
                // Add to users array
                this.users.push(newUser);
                console.log('Users array after adding:', this.users);
                
                // Return user without password
                const { password, ...userWithoutPassword } = newUser;
                resolve({ 
                    success: true, 
                    message: 'Đăng ký thành công', 
                    user: userWithoutPassword 
                });
            }, 500);
        });
    },

    async loginUser(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Find user by email
                const user = this.users.find(u => u.email === email);
                
                if (!user) {
                    reject(new Error('Email không tồn tại'));
                    return;
                }
                
                // Check password (in real app, compare hashed passwords)
                if (user.password !== password) {
                    reject(new Error('Mật khẩu không đúng'));
                    return;
                }
                
                if (!user.isActive) {
                    reject(new Error('Tài khoản đã bị khóa'));
                    return;
                }
                
                // Return user without password
                const { password: pwd, ...userWithoutPassword } = user;
                resolve({ 
                    success: true, 
                    message: 'Đăng nhập thành công', 
                    user: userWithoutPassword,
                    token: 'mock_token_' + user.id // Mock JWT token
                });
            }, 300);
        });
    },

    async getUserById(userId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this.users.find(u => u.id == userId);
                if (user) {
                    const { password, ...userWithoutPassword } = user;
                    resolve(userWithoutPassword);
                } else {
                    reject(new Error('User not found'));
                }
            }, 200);
        });
    },

    async updateUserProfile(userId, updateData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const userIndex = this.users.findIndex(u => u.id == userId);
                if (userIndex === -1) {
                    reject(new Error('User not found'));
                    return;
                }
                
                // Update user data (except password and sensitive fields)
                const allowedFields = ['fullName', 'phone', 'address'];
                allowedFields.forEach(field => {
                    if (updateData[field] !== undefined) {
                        this.users[userIndex][field] = updateData[field];
                    }
                });
                
                const { password, ...userWithoutPassword } = this.users[userIndex];
                resolve({ 
                    success: true, 
                    message: 'Cập nhật thông tin thành công', 
                    user: userWithoutPassword 
                });
            }, 300);
        });
    },

    async changePassword(userId, oldPassword, newPassword) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this.users.find(u => u.id == userId);
                if (!user) {
                    reject(new Error('User not found'));
                    return;
                }
                
                if (user.password !== oldPassword) {
                    reject(new Error('Mật khẩu cũ không đúng'));
                    return;
                }
                
                user.password = newPassword;
                
                resolve({ 
                    success: true, 
                    message: 'Đổi mật khẩu thành công' 
                });
            }, 300);
        });
    }
};

// Make it globally available
window.MockDataService = MockDataService;
