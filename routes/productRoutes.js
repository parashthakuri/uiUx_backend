const router = require('express').Router();
const productController = require("../controllers/productControllers");
const { authGuard,authGuardAdmin } = require('../middleware/authGuard');
const Product = require('../model/productModel');
const Category = require('../model/categoryModel');
const Order = require('../model/orderModel');
const Users = require('../model/userModel');

router.post('/create_product', productController.createProduct)

// get all products
router.get("/get_products", productController.getProducts)

// single product
router.get("/get_product/:id", productController.getSingleProduct)

// update product 
router.put("/update_product/:id", productController.updateProduct);

// delete product
router.delete("/delete_product/:id",authGuardAdmin ,productController.deleteProduct)


//* pagination route
router.get("/get_pagination", productController.getPagination);


// Product search route
router.get("/search_products", productController.searchProducts);

// filte product by category
router.get("/get_product_by_category/:category", productController.getProductsByCategory);


//coutnt proudct, order, category
router.get('/get_counts', async(req, res)=>{
    try{
        const productCount = await Product.countDocuments({});
        const categoryCount = await Category.countDocuments({});
        const orderCount = await Order.countDocuments({});
        const userCount = await Users.countDocuments({});
        res.status(200).json({productCount, categoryCount, orderCount, userCount})
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Internal Server Error"});
    }
})

module.exports = router;