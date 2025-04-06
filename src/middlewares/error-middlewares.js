const HttpError = require("../errors/HttpErrors")
module.exports = (error, req, res, next) => {
    if(error){
        // verificando se é da intancia HttpError
        if(error instanceof HttpError) return res.status(error.status).json({ message: error.message})
        // retorna o padrão
        return res.status(400).json({message: error.message})
    } else {
        next()
    }
}