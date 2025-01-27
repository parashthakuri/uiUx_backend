
const Favorite = require("../model/favoriteModel");
const Product = require("../model/productModel");
const User = require("../model/userModel");

const getFavoritesByUserId = async (req, res) => {
  const { userId } = req.params; // Retrieve userId from request parameters
  try {
    // Populate products field with details from the Product model
    const favorites = await Favorite.findOne({ user: userId }).populate({
      path: "products.product", // Populate the 'product' field in the 'products' array
      select:
        "productName productDescription productCategory productPrice productImageUrl", // Select the fields you want to include
    });

    if (!favorites) {
      return res.status(404).json({ error: "No favorites found" });
    }

    res.json({
      success: true,
      message: "Favorites fetched successfully!",
      favorites, // Send the populated favorites object to the client
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// Add to favorites
const addToFavorites = async (req, res) => {
  const { user, products } = req.body;
console.log(req.body);
  try {
    // Check if user already has favorites
    let favorite = await Favorite.findOne({ user });

    if (!favorite) {
      // Favorites doesn't exist, create a new one
      favorite = new Favorite({
        user,
        products,
      });
    } else {
      // Favorites exist, update the products
      favorite.products.push(...products);
    }

    await favorite.save();

    res.json({
      success: true,
      message: "Added to favorites successfully",
      favorite,
    });
  } catch (err) {
    return res.status(400).json({ error: err?.message || "Error adding to favorites" });
  }
};

// Remove from favorites
const removeFromFavorites = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    let favorite = await Favorite.findOne({ user: userId });

    if (!favorite) {
      return res.status(404).json({ error: "Favorites not found" });
    }

    // Find the index of the product in favorites
    const productIndex = favorite.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in favorites" });
    }

    // Remove the product from favorites
    favorite.products.splice(productIndex, 1);

    // Save the updated favorites
    favorite = await favorite.save();

    res.json({
      success: true,
      message: "Product removed from favorites successfully",
      favorite,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ error: err?.message || "Error removing product from favorites" });
  }
};

// Export all logic
module.exports = {
  getFavoritesByUserId,
  addToFavorites,
  removeFromFavorites,
};
