const Category = require("../model/Categories");


const addCategory = async (req,res) => {
    try{
        const category = await Category.create(req.body);
        res.status(200).json(category);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}  

const getAllCategories = async(req,res) => {
    try{
        const categories = await Category.find({});
        if(!categories){
            res.status(404).json({message:'No categories found'});
        }
        res.status(200).json(categories);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
} 

const getCategory = async(req,res) => {
    const {id} = req.params;

    try{
        const category = await Category.findById(id);
        if(!category){
            res.status(404).json({message:'Category was not found'});
        }
        res.status(200).json(category);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const deleteCategory = async(req,res) => {
    const {id} = req.params;

    try{
        const category = await Category.findByIdAndDelete(id);
        if(!category){
            res.status(404).json({message:'Category was not found'});
        }
        res.status(200).json({message:'Category deleted successfully'});
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}


module.exports = {
    addCategory,
    deleteCategory,
    getAllCategories,
    getCategory
};