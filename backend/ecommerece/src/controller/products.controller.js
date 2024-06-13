const Products = require("../model/produts.model");
const uploadFile = require("../utils/cloudinary");

const listProducts = async (req, res) => {
    try {
        const products = await Products.find();

        if (!products || products.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Products not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Products fetch successfully.',
            data: products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

const getProduct = async (req, res) => {

    try {
        const product = await Products.findById(req.params.product_id)
        console.log(product);

        if (!product) {
            res.status(404).json({
                success: false,
                message: 'product not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'product fetch successfully.',
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

const addProduct = async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const fileRes = await uploadFile(req.file.path, "Product");
    console.log(fileRes);

    try {
        const product = await Products.create({
            ...req.body,
            product_image: {
                public_id: fileRes.public_id,
                url: fileRes.url
            }

        });

        if (!product) {
            res.status(400).json({
                success: false,
                message: 'product not created.'
            })
        }

        res.status(201).json({
            success: true,
            message: 'product created successfully.',
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            meassage: 'Internal Server Error.' + error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.product_id)

        if (!product) {

            res.status(400).json({
                success: false,
                message: 'product not deleted.'
            })
        }

        res.status(200).json({
            success: true,
            message: 'product deleted successfully.',
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Products.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators: true });

        if (!product) {
            res.status(400).json({
                success: false,
                message: 'product not updated.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'product updated successfully.',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

module.exports = {
    listProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
}