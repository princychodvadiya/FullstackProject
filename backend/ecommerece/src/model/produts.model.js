const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
    {
        subcategory_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Subcategories',
            required: true
        },
        seller_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            // required: true
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
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Products = mongoose.model('Products', productsSchema);

module.exports = Products;