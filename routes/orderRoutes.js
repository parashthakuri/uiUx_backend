
const router = require('express').Router();
const orderController = require('../controllers/orderController')

//* create order
router.post("/create_order", orderController.createOrder)

//* get orders
router.get("/get_all_orders", orderController.getOrders);


router.get('/get_order_by_id/:userId', orderController.getOrdersByUserId);

module.exports = router;
