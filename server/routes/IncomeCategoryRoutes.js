const express = require("express");
const router = express.Router();
const {addCategory,getAllCategories,deleteCategory,getCategory} = require("../controllers/incomeCategoryController");


router.post('/', addCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.delete('/:id', deleteCategory);
module.exports = router;