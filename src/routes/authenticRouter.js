const express = require('express')
const authenticController = require('../controller/authentic-controller')
const authenticRouter = express.Router()

// rotas de autenticação
authenticRouter.post('/register', authenticController.register)
authenticRouter.post('/login', authenticController.login)

module.exports = authenticRouter