const Variants = require("../model/variants.model")

const getVariant = async (req, res) => {
    try {
        const variant = await Variants.findById(req.params.variant_id)

        if (!variant) {
            res.status(404).json({
                success: false,
                message: 'variant not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'variant fetch successfully.',
            data: variant
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}


const listVariants = async (req, res) => {
    try {
        const variant = await Variants.find();
        console.log(variant);

        if (!variant) {
            res.status(404).json({
                success: false,
                meassage: 'variant not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'variant fetch successfully.',
            data: variant
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            meassage: 'Internal Server Error.' + error.meassage
        })
    }
}


const addVariant = async (req, res) => {
    console.log("llllllllllllllll", req.body);
    console.log(req.body);
    console.log(req.file);

    try {
        const variant = await Variants.create(req.body);

        if (!variant) {
            res.status(400).json({
                success: false,
                message: 'variant not created.'
            })
        }

        res.status(201).json({
            success: true,
            message: 'variant created successfully.',
            data: variant
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
const deleteVariant = async (req, res) => {
    try {
        const variant = await Variants.findByIdAndDelete(req.params.variant_id)

        if (!variant) {

            res.status(400).json({
                success: false,
                message: 'variant not deleted.'
            })
        }

        res.status(200).json({
            success: true,
            message: 'variant deleted successfully.',
            data: variant
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            meassage: 'Internal Server Error.' + error.message
        })
    }
}
const updateVariant = async (req, res) => {
    try {
        const variant = await Variants.findByIdAndUpdate(req.params.variant_id, req.body, { new: true, runValidators: true });

        if (!variant) {
            res.status(400).json({
                success: false,
                message: 'variant not updated.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'variant updated successfully.',
            data: variant
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}
module.exports = {
    getVariant,
    listVariants,
    addVariant,
    deleteVariant,
    updateVariant
}