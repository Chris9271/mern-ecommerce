const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String
    },
    image: {
        type: String
    },
    hoverImage: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    detail: {
        farbicDetail: {
            type: String
        },
        washingInstruction: {
            type: String
        },
        warning: {
            type: String
        }
    },
    quantity: {
        type: Number
    },
    gender: {
        type: String
    },
    new: {
        type: Boolean
    },
    sale: {
        type: Boolean
    },
    accessory: {
        type: Boolean
    }
})

module.exports = mongoose.model('Product', productSchema);