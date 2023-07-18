const Cart = require('../model/cartModel')

const cartController = {
    async addToCart(req,res){
        try {
            const cartData = new Cart(req.body)
            const response = cartData.save()
            if(!response)return res.send('some error occured')
            return res.status(200).send(response)
        } catch (error) {
            res.send(error.message)
        }
    },
    async getCart(req,res){
        try {
            // const response = await Cart.find({userId:req.params.userId})
            const response = await Cart.aggregate([
                { $match: {userId:req.params.userId} },
                { $unwind: "$products" },
                { 
                    $lookup:{
                        from:"products",
                        localField:"products.productId",
                        foreignField:"_id",
                        as:"productData"
                    } 
                },
                {
                    $project:{
                        _id:0,
                        quantity:"$products.quantity",
                        productData:1
                    }
                }
            ])
            if(!response)return res.send('some error occured')
            // return res.status(200).json({
            //     count: response.length,
            //     cartItems:response
            // })
            return res.send(response)
        } catch (error) {
            res.send(error.message)
        }
    },
    async removeFromCart(req,res){
        try {
            const response = await Cart.findByIdAndRemove(req.params.cartId)
            if(!response)return res.send('some error occured')
            return res.status(200).send(response)
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = cartController