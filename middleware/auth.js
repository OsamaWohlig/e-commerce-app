const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = {
    async userAuth(req,res,next){
        try {
            const token = req.headers['authorization']
            if(!token)return res.json({message:'Token is required'})
            const isAuthenticated = jwt.verify(token,process.env.MY_SECRET_KEY)
            if(!isAuthenticated){
                return res.status(401).json({
                    message: 'Unauthorized'
                })
            }
            next()
        } catch (error) {
            return res.status(200).json({message:'Unauthorized', error})
        }
    }
}

module.exports = auth