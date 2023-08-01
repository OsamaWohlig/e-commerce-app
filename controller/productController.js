const Product = require('../model/productModel')
const {inDB} = require('../utils/checkDb')

const productController = {
    async uploadImage(file){

    },

    async getProducts(req,res){
        try {
            const products  = await Product.find({isActive: true})
            if(products.length<1){
                return res.send('No products found')
            }
            res.status(200).json({
                productsCount: products.length,
                products
            })
        } catch (error) {
            res.send(error)
        }
    },

    async getProduct(req,res){
        try {
            const response = await Product.findOne({_id: req.params.id})
            if(!response)return res.send(response)
            return res.status(200).send(response)
        } catch (error) {
            res.send(error.message)
        }
    },

    async addProduct(req,res){
        try {
            const product = new Product(req.body)
            console.log(req.body.productImage)
            const response = await product.save()
            if(!response)return res.send(response)
            return res.status(200).json({
                message:'product added successfully',
                product:response
            })
        } catch (error) {
            res.send(error.message)
        }
    },

    async updateProduct(req,res){
        const productExists = await inDB(Product,req.params.id)
        if(!productExists)return res.send('Product not found')
        try {
            const response = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
            if(!response)return res.send(response)
            return res.status(200).json({
                message:'Product updated successfully',
                product:response
            })
        } catch (error) {
            res.send(error.message)
        }
    },

    async deleteProduct(req,res){
        try {
            const productExists = await inDB(Product,req.params.id)
            if(!productExists)return res.send('Product not found')
            const response = await Product.findByIdAndUpdate({_id:req.params.id},{$set:{"isActive":false}},{returnDocument:'after'})
            if(!response)return res.send('some error occured')
            return res.status(200).json({
                message:'Product deleted successfully',
                product:response
            })
        } catch (error) {
            res.send(error.message)
        }
    },

    async recoverProduct(req,res){
        const productExists = await inDB(Product,req.params.id)
        if(!productExists)return res.send('Product not found')
        try {
            const response = await Product.findByIdAndUpdate({_id:req.params.id},{$set:{"isActive":true}},{returnDocument:'after'})
            if(!response)return res.send('Some Error Occured')
            return res.status(200).json({
                message:'Product recovered successfully',
                product:response
            })
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = productController