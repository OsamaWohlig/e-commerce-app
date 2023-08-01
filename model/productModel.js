const mongoose = require('mongoose');

const productSchema = {
    productName:{
        type:String,
        required:true
    },
    productImage:{
        contentType:String,
        data:Buffer,
    },
    productDescription:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
}

module.exports = mongoose.model('product', productSchema)