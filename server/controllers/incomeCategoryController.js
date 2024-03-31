const IncomeCategory = require("../model/IncomeCategories");


const addCategory = async (req,res) => {
    try{
        const category = await IncomeCategory.create(req.body);
        res.status(200).json(category);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}  

const getAllCategories = async(req,res) => {
    try{
        const categories = await IncomeCategory.find({});
        if(!categories){
            res.status(404).json({message:'No categories found'});
        }
        console.log(categories);
        res.status(200).json(categories);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
} 

const getCategory = async(req,res) => {
    const {id} = req.params;

    try{
        const category = await IncomeCategory.findById(id);
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
        const category = await IncomeCategory.findByIdAndDelete(id);
        if(!category){
            res.status(404).json({message:'Category was not found'});
        }
        res.status(200).json({message:'Category deleted successfully'});
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { type, color } = req.body;
    console.log(type,color)

    try {
        const updatedCategory = await IncomeCategory.findByIdAndUpdate(id, { type, color }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    addCategory,
    deleteCategory,
    getAllCategories,
    getCategory,
    updateCategory
};