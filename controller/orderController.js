const Order = require('../model/orderModel')

const orderController = {
    async getOrders(req,res){
        try {
            const response = await Order.find({ userId:req.params.userId})
            if(!response)return res.status(404).json({message:response})
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    },
    async createOrder(req,res){
        try {
            const orderDetails = new Order(req.body)
            const response = await orderDetails.save()
            if(!response)return res.status(404).json({message:response})
            return res.status(200).json({message:response})
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    },
    async cancelOrder(req,res){
        try {
            const response = await Order.findByIdAndUpdate(req.params.orderId,{$set:{"orderStatus":'Cancelled'}},{returnDocument:'after'})
            if(!response)return res.status(404).json(response)
            return res.status(200).json(response)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
}

module.exports = orderController