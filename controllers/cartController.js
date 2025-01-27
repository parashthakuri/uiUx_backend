const Cart = require("../model/cartModel");
const Product = require("../model/productModel");
const User = require("../model/userModel");

const getCartProductById = async (req, res) => {
  const { userId } = req.params;
  console.log('cart user', userId);// Retrieve userId from request parameters
  try {
    // Populate products field with details from the Product model
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product", // Populate the 'product' field in the 'products' array
      select:
        "productName productDescription productCategory productPrice productImageUrl", // Select the fields you want to include
    });

    if (!cart) {
      return res.status(404).json({ error: "No Cart found" });
    }

    console.log(cart);

    res.json({
      success: true,
      message: "Cart products fetched successfully!",
      cart: cart, // Send the populated cart object to the client
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const getAllUserCarts = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (err) {
    return res.status(400).json({ error: err?.message || "No Cart found" });
  }
};

// //todo: add to cart
const addToCart = async (req, res) => {
  const { user, products } = req.body;

  console.log(req.body);

  try {
    // Parse quantity as integer
    const parsedProducts = products.map((item) => ({
      product: item.product,
      quantity: parseInt(item.quantity), // Parse quantity as integer
    }));

    // Check if quantity is a positive integer
    for (const item of parsedProducts) {
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        return res.status(400).json({ error: "Invalid quantity parameter" });
      }
    }

    const filter = { user: user };
    const updatedCart = await Cart.findOne(filter);

    if (!updatedCart) {
      // Cart doesn't exist, create a new one
      const newCart = new Cart({
        user: user,
        products: parsedProducts, // Use parsedProducts
      });
      await newCart.save();
      return res.json({
        success: true,
        message: "Added To Cart Successfully",
        cart: newCart,
      });
    }

    // Cart exists, update the products
    for (const item of parsedProducts) {
      const existingProductIndex = updatedCart.products.findIndex((p) =>
        p.product.equals(item.product)
      );
      if (existingProductIndex !== -1) {
        // Product already exists in the cart, increment its quantity
        updatedCart.products[existingProductIndex].quantity += item.quantity;
      } else {
        // Product doesn't exist in the cart, add it
        updatedCart.products.push(item);
      }
    }

    await updatedCart.save();
    res.json({ message: "Added To Cart Successfully", cart: updatedCart });
  } catch (err) {
    return res
      .status(400)
      .json({ error: err?.message || "Error adding to cart" });
  }
};

//todo: delete product from cart
const deleteProductFromCart = async (req, res) => {
  const { user, productId } = req.params;

  console.log(user, productId);

  try {
    const filter = { user: user };
    let updatedCart = await Cart.findOne(filter);

    if (!updatedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the index of the product in the cart
    const productIndex = updatedCart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // Remove the product from the cart
    updatedCart.products.splice(productIndex, 1);

    // Save the updated cart
    updatedCart = await updatedCart.save();

    res.json({
      success: true,
      message: "Product deleted from cart successfully",
      cart: updatedCart,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ error: err?.message || "Error deleting product from cart" });
  }
};

// Export all logic
module.exports = {
  getCartProductById,
  getAllUserCarts,
  addToCart,
  deleteProductFromCart,
};
