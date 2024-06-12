const Categories = require("../model/categories.model")

const listCategories = async (req, res) => {
    try {
        const categories = await Categories.find();

        if (!categories || categories.length === 0) {
            res.status(404).json({
                success: false,
                meassage: 'Categories not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Categories fetch successfully.',
            data: categories
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            meassage: 'Internal Server Error.' + error.meassage
        })
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.category_id)

        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Category not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Categories fetch successfully.',
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            meassage: 'Internal Server Error.' + error.meassage
        })
    }
}

const addCategory = async (req, res) => {
    try {
        const category = await Categories.create(req.body);
        console.log(category);

        if (!category) {
            res.status(400).json({
                success: false,
                message: 'Category not created.'
            })
        }

        res.status(201).json({
            success: true,
            message: 'Category created successfully.',
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            meassage: 'Internal Server Error.' + error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await Categories.findByIdAndDelete(req.params.category_id)

        if (!category) {
            res.status(400).json({
                success: false,
                message: 'Category not deleted.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully.',
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            meassage: 'Internal Server Error.' + error.message
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        const category = await Categories.findByIdAndUpdate(req.params.category_id, req.body, { new: true, runValidators: true });
        console.log(category);


        if (!category) {
            res.status(400).json({
                success: false,
                message: 'Category not updated.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Category updated successfully.',
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            meassage: 'Internal Server Error.' + error.message
        })
    }

}
module.exports = {
    listCategories,
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory
}