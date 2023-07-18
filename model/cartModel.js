const mongoose = require('mongoose');

const cartSchema = {
    userId:{
        type: String,
        required: true
    },
    products:[{
        productId:{
            type: mongoose.Types.ObjectId,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        }
    }]
}

const cartModel = mongoose.model('Cart',cartSchema);

module.exports = cartModel;