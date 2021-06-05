const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            productName: {
                type: String
            },
            hoverImage: {
                type: String
            }, 
            price: {
                type: Number
            },
            quantity: {
                type: Number
            },
            total: {
                type: Number
            }
        }],
        subTotal: {
            type: Number
        }
})

module.exports = mongoose.model('Cart', cartSchema);