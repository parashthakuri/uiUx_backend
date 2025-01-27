const router = require('express').Router();
const categoryController = require("../controllers/categoryController.js")
const  {authGuardAdmin}  = require( "../middleware/authGuard.js");



router.post('/create_category',authGuardAdmin,categoryController.addCategory);

// get all category
router.get("/get_category", categoryController.getAllCategories)

// single category
router.get("/get_category/:id", categoryController.findCategory)

// update category
router.put("/update_category/:id", authGuardAdmin,categoryController.updateCategory)

// delete category
router.delete("/delete_category/:id" ,authGuardAdmin,categoryController.removeCategory)

module.exports = router;
 