const mongoose = require("mongoose");
const Category = require("../model/categoryModel");

const addCategory = async (req, res) => {

console.log(res.body);

  const { categoryName, description } = req.body;

  // step 3: Validate data
  if (!categoryName || !description) {
    return res.json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    categoryName,
    description,
  });

  try {
    await category.save();
    return res.status(201).json({
      success: true,
      message: "Category has been created",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const data = await Category.find().select("_id categoryName description").exec();
    return res.status(200).json({
      success: true,
      message: "All categoy fetched successfully",
      categories: data,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};

const findCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Category.findOne({ _id: id }).select("_id categoryName description").exec();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};

const removeCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.deleteOne({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Category has been deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { categoryName, description } = req.body;

    await Category.findByIdAndUpdate(id, {
      categoryName,
      description,
    });

    return res.status(200).json({
      success: true,
      message: "Category has been updated",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};

module.exports= { addCategory, getAllCategories, findCategory, removeCategory, updateCategory };





// // categoryControllers.js
// const Category = require("../model/categoryModel");

// // create category
// const createCategory = async (req, res) => {
//     const { categoryName } = req.body;

//     // validate data
//     if (!categoryName) {
//         return res.json({
//             success: false,
//             message: "Please provide a category categoryName."
//         });
//     }

//     try {
//         const newCategory = new Category({
//             categoryName: categoryName
//         });

//         await newCategory.save();
//         res.json({
//             success: true,
//             message: "Category created successfully.",
//             category: newCategory
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error."
//         });
//     }
// };

// // get all categories
// const getCategories = async (req, res) => {
//     try {
//         const allCategories = await Category.find({});
//         res.json({
//             success: true,
//             message: "All categories fetched successfully!",
//             categories: allCategories
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error."
//         });
//     }
// };

// // update category
// const updateCategory = async (req, res) => {
//     const { categoryName } = req.body;

//     // validate data
//     if (!categoryName) {
//         return res.json({
//             success: false,
//             message: "Please provide a category name."
//         });
//     }

//     try {
//         const categoryId = req.params.id;
//         await Category.findByIdAndUpdate(categoryId, { categoryName: categoryName });
//         res.json({
//             success: true,
//             message: "Category updated successfully!",
//             updatedCategory: { categoryName: categoryName }
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error."
//         });
//     }
// };

// //* delete category
// const deleteCategory = async (req, res) => {
//     const categoryId = req.params.id;

//     try {
//         await Category.findByIdAndDelete(categoryId);
//         res.json({
//             success: true,
//             message: "Category deleted successfully!"
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error."
//         });
//     }
// };

// module.exports = {
//     createCategory,
//     getCategories,
//     updateCategory,
//     deleteCategory
// };
