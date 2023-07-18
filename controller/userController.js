const User = require('../model/userModel')
const {inDB} = require('../utils/checkDb')

const userController = {
    async createUser(req,res){
        const userData = new User(req.body)
         try {
            const response = await userData.save()
            if(!response)return res.send('try again')
            return res.send('User created successfully')
         } catch (error) {
            res.send(error.message)
         }
    },
    async getUsers(req,res){
        try {
            const response = await User.find({"isActive":true})
            if(!response)return res.send('try again')
            return res.send(response)
        } catch (error) {
            res.send(error.message)
        }
    },
    async updateUser(req,res){
        const userExists = await inDB(User,req.params.id)
        if(!userExists)return res.send('User not found')
        try {
            const response = await User.findByIdAndUpdate(req.params.id,req.body)
            if(!response)return res.send('try again')
            return res.send(response)
        } catch (error) {
            res.send(error.message)
        }
    },
    async deleteUser(req,res){
        const userExists = await inDB(User,req.params.id)
        if(!userExists)return res.send('User not found')
        try {
            const response = await User.findByIdAndUpdate(req.params.id,{$set:{"isActive":false}})
            if(!response)return res.send('Some error occurred')
            return res.send('User deleted successfully')
        } catch (error) {
            res.send(error.message)
        }
    },
    async recoverUser(req,res){
        const userExists = await inDB(User,req.params.id)
        if(!userExists)return res.send('User not found')
        try {
            const response = await User.findByIdAndUpdate(req.params.id,{$set:{"isActive":true}})
            if(!response)return res.send('Some error occurred')
            return res.send('User recovered successfully')
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = userController