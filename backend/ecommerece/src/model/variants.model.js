const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        }
    }
)

const variantsSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true,
            required: true
        },
        attributes: [attributeSchema],
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Variants = mongoose.model('Variants', variantsSchema);

module.exports = Variants;