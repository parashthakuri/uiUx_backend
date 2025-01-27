const Orders = require('../model/orderModel')
const Cart = require('../model/cartModel')
const mongoose = require("mongoose");
// //todo: create order

const createOrder = async (req, res) => {
  const { userId, products, totalAmount } = req.body;

  //*validate data
  if (!userId || !products || !totalAmount) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the fields.",
    });
  }

  try {
    const order = new Orders({
      userId,
      products,
      totalAmount,
    });
    await order.save();

    // Debug log to check the userId and products
    console.log("userId:", userId);
    console.log("products:", products);

    // Remove ordered products from the user's cart
    const productIds = products.map(p => new mongoose.Types.ObjectId(p.product));
    console.log("productIds to remove:", productIds);

    const updateResult = await Cart.updateOne(
      { user: userId },
      { $pull: { products: { product:  { $in: productIds }  } } }
    );

    // Debug line to check the result of the update operation
    console.log("Cart update result:", updateResult);

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



  
  //todo: get orders and populate 

// Controller function to get all orders from admin perspective
const getOrders = async (req, res) => {
  try {
    // Assuming you have an isAdmin check middleware to ensure the user is an admin

    // Retrieve all orders and populate necessary fields from related models
    const orders = await Orders.find({})
      .populate({
        path: 'userId',
        select: 'firstName email' // Assuming you want to select specific fields from the user model
      })
      .populate({
        path: 'products.product',
        select: 'productName productPrice' // Assuming you want to select specific fields from the product model
      });

      return res.json({
              success: true,
              message: "All orders fetched successfully",
              orders: orders,
            });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



  
//todo: get order by id

const getOrdersByUserId = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    const orders = await Orders.find({userId}).populate('userId').populate({
      path: 'products.product',
      select: 'productName' // Assuming you want to select specific fields from the product model
    });
    return res.json({
      success: true,
      message: "Your orders fetched successfully",
      orders: orders,
    });
  } catch (error) {
    throw new Error(`Error while fetching orders: ${error.message}`);
  }
};


  module.exports = {
    createOrder,
    getOrders,
    getOrdersByUserId
  }