const request = require('supertest');
const app = require('../index'); // Assuming your Express app is exported from '../app'

const loginMock = {
    email: 'clfa@gmail.com',
    password: 'clfa1234'
};


describe('API Testing', () => {
    // Testing /test endpoint
    it('GET /test | Test Should Work', async () => {
        const response = await request(app).get('/test');
        expect(response.status).toBe(200);
    });

    // Login test
    it('POST /api/user/login | Login Successful', async () => {
        const response = await request(app)
            .post('/api/user/login')
            .send(loginMock); // Assuming login_mock is defined
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    // Get all products
    it('GET /api/product/get_products | Should work', async () => {
        const response = await request(app).get('/api/product/get_products');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("All products fetched successfully!");
        expect(response.body.products).toBeDefined();
    });

    // Get single product
    it('GET /api/product/get_product/:id | Get Single Product', async () => {
        const productId = '659448490d23a0cd9e06f2ae'; // Replace with a valid product ID
        const response = await request(app).get(`/api/product/get_product/${productId}`);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Single product fetched successfully!");
        expect(response.body.product).toBeDefined();
    });

    // Update product
    it('PUT /api/product/update_product/:id | Update Product', async () => {
        const productId = '6594488e0d23a0cd9e06f2b2'; // Replace with a valid product ID
        const updatedProductData = {
            productName: 'Updated Test Product',
            productPrice: '19.99',
            productDescription: 'Updated test description',
            productCategory: 'Updated Test Category',
            productImageUrl: 'Updated Test Category'
        };
        const response = await request(app)
            .put(`/api/product/update_product/${productId}`)
            .send(updatedProductData);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Product updated successfully without Image!");
        expect(response.body.updatedProduct).toBeDefined();
    });

    // Delete product
    it('DELETE /api/product/delete_product/:id | Delete Product (Admin)', async () => {
        const productId = '65e37bcf4cd6cd0f11761a04'; // Replace with a valid product ID
        const response = await request(app).delete(`/api/product/delete_product/${productId}`);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Product deleted successfully!");
    });

    // Search products
    it('GET /api/product/search_products | Search Products', async () => {
        const query = 'test';
        const response = await request(app).get(`/api/product/search_products?query=${query}`);
        expect(response.status).toBe(200);
        expect(response.body.products).toBeDefined();
    });

    // Get products by category
    it('GET /api/product/get_product_by_category/:category | Get Products by Category', async () => {
        const category = 'test_category'; // Replace with a valid category
        const response = await request(app).get(`/api/product/get_product_by_category/${category}`);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe(`Products in category "${category}" fetched successfully!`);
        expect(response.body.products).toBeDefined();
    });

    // // Get counts
    it('GET /api/product/get_counts | Get Counts', async () => {
        const response = await request(app).get('/api/product/get_counts');
        expect(response.status).toBe(200);
        expect(response.body.productCount).toBeDefined();
        expect(response.body.categoryCount).toBeDefined();
        expect(response.body.orderCount).toBeDefined();
        expect(response.body.userCount).toBeDefined();
    });

    // // Create category (Admin)
    it('POST /api/category/create_category | Create Category (Admin)', async () => {
        const newCategoryData = {
            categoryName: 'Test Category',
            description: 'Test category description'
        };
        const response = await request(app)
            .post('/api/category/create_category')
            .send(newCategoryData);
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Category has been created");
    });

    // Get all categories
    it('GET /api/category/get_category | Get All Categories', async () => {
        const response = await request(app).get('/api/category/get_category');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.categories).toBeDefined();
    });
});






// const request = require('supertest');
// const app = require('../index');

// // Make collection of test cases
// describe('API Endpoints Test', ()=>{
    
//     // testing test route '/test'
//     it('GET /test | Response should be text', async () => {
//         const response = await request(app).get('/test');
//         expect(response.statusCode).toBe(200);
//         expect(response.text).toBe("Hello");
//     })

//     // testing fetch all products route '/api/product/get_products'
//     it('GET /api/product/get_products | Response should be json', async () => {
//         const response = await request(app).get('/api/product/get_products');
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toBeDefined();
//         expect(response.body.message).toEqual("All products fetched successfully!");
//     }

//     // Creating a user
//     it('POST /api/user/create | Response with success message', async () => {
//         const response = await request(app).post('/api/user/create').send({
//             'firstName' : 'John',
//             'lastName' : 'Cena',
//             'email': 'johnn@gmail.com',
//             'password': '123456'
//         })
//         if(response.body.success){
//             expect(response.statusCode).toBe(200);
//             expect(response.body.message).toEqual("User created successfully.");
//         } else{
//             expect(response.body.success).toBe(false);
//             expect(response.body.message).toEqual("User already exists.");
//         }
//     })

    // fetching single product
    // it('GET /api/product/get_product/:id | Response should be json', async () => {
    //     const response = await request(app)
    //     .get('/api/product/get_product/6583a241aa79864c6cbf9df9');

    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toHaveProperty('product');
    // })


