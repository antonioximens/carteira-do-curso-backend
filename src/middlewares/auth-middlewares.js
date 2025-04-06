const HttpError = require("../errors/HttpErrors")
const usersModel = require("../models/users-model")
const jwt = require('jsonwebtoken')

module.exports = {
    ensureAuthentic: (req, res, next) => {
        const headerToken = req.headers.authorization
        if(!headerToken) throw new HttpError(401, `Not authorized`)
        
        const token = headerToken.split(" ")[1]
    
        try {
            const {id} = jwt.verify(token, process.env.JWT_KEY)
            const user = usersModel.userById(id)
            if(!user) throw new HttpError(404, `User not found!`)
            req.user = user
            next()
        } catch (error) {
            throw new HttpError(401, `Invalid Token`) 
        }
    },

    ensureAdmin: (req, res, next) => {
        if(req.user?.role === 'admin') return next()
        throw new HttpError(403, 'Access denied!')
    }
}