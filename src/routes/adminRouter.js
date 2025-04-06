const express = require('express')
const userController = require('../controller/user-controller')
const generationCard = require('../controller/generation-card')
const { ensureAuthentic, ensureAdmin } = require('../middlewares/auth-middlewares')

const adminRouter = express.Router()

// rotas

// GET /admin/users
adminRouter.get('/users', ensureAuthentic, ensureAdmin, userController.index)
// GET /admin/users/:id
adminRouter.get('/users/:id', ensureAuthentic, ensureAdmin, userController.show)
// POST /admin/users
adminRouter.post('/users', ensureAuthentic, ensureAdmin, userController.save)
//PUT /admin/users/:id
adminRouter.put('/users/:id', ensureAuthentic, userController.update)
// DELETE /admin/users/:id
adminRouter.delete('/users/:id', ensureAuthentic, ensureAdmin, userController.delete)

// GET /admin/generateCard
adminRouter.post('/generateCard', generationCard.generateCardUser)

module.exports = adminRouter