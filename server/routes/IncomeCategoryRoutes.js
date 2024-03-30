const express = require("express");
const router = express.Router();
const {addCategory,getAllCategories,deleteCategory,getCategory,updateCategory} = require("../controllers/incomeCategoryController");


router.post('/', addCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);
module.exports = router;