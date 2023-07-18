const mongoose =  require('mongoose');

const orderSchema = {
    userId:{
        type: String,
        required: true
    },
    products:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:'products'
        },
        quantity:{
            type: Number,
            required: true
        }
    }],
    totalAmount:{
        type: Number,
        required: true
    },
    paymentMethod:{
        type: String,
        required: true,
        enum: ['Paypal', 'Credit Card','Cash on Delivery']
    },
    orderStatus:{
        type: String,
        required: true,
        enum: ['Pending', 'Shipped', 'Delivered','Cancelled']
    }
}

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;