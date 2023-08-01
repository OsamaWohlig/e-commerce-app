const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const {inDB} = require('../utils/checkDb')
const bcrypt = require('bcrypt')

const userController = {
    async createUser(req,res){
        try {
            const {userName,email,password} = req.body
            const hashedPassword = await bcrypt.hash(password,10)
            const userData = new User({userName,email,password:hashedPassword})
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
    },
    async getCurrentUser(req,res){
        try {
            const response = await User.findOne({_id:req.params.id})
            const token = jwt.sign(response.userName, process.env.MY_SECRET_KEY)
            if(!response)return res.status(404).json(response)
            return res.status(200).json({response,token})
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    },
    async login(req,res){
        try {
            const {email,password} = req.body
            const emailExists = await User.findOne({email})
            if(!emailExists)return res.status(200).json({message:"User not found"})
            const isAuthenticated = await bcrypt.compare(password, emailExists.password)
            if(!isAuthenticated)return res.status(200).json({message:'Incorrect password'})
            const token = jwt.sign(emailExists.userName,process.env.MY_SECRET_KEY)
            res.status(200).json({'message':'Logged in successfuly',token})
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = userController