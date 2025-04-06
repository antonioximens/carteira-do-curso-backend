const HttpError = require("../errors/HttpErrors")
const usersModel = require("../models/users-model")

module.exports = {
    // GET /users
    index: (req, res) => {
        const usersAll = usersModel.userAll()
        if(usersAll.length === 0) throw new HttpError(404, 'No users found!')
        return res.status(200).json(usersAll)
    },

    // GET /users/:id
    show: (req, res) => {
        const {id} = req.params
        if(!id) throw new HttpError(400, 'Id is required!')
        const user = usersModel.userById(id)
        if(!user) throw new HttpError(404, 'User not found!')
        return res.status(200).json(user)
    },

    // POST /users
    save: (req, res) => {
        const {name ,email, course, semester, password} = req.body

        if (!name || typeof name !== 'string' || name.trim() === '') throw new HttpError(400, `Invalid name!`)
        if (!email || typeof email !== 'string' || email.trim() === '') throw new HttpError(400, `Invalid email!`)
        if (!course || typeof course !== 'string' || course.trim() === '') throw new HttpError(400, `Invalid course!`)
        if (!semester || typeof semester !== 'string' || semester.trim() === '') throw new HttpError(400, `Invalid semester!`)
        if (!password || typeof password !== 'string' || password.trim() === '') throw new HttpError(400, `Invalid password!`)

        // criando registro e escondendo o password
        const newUser = usersModel.userRegister(name,email,course,semester,password)
        if(!newUser) throw new HttpError(409, `E-mail já existe!`)
        return res.status(201).json({...newUser, password: undefined})
    },

    //PUT /users/:id
    update: (req, res) => {
        const {id} = req.params
        if(!id) throw new HttpError(400, 'Id is required!')

        const user = usersModel.userById(id)
        if(!user) throw new HttpError(404, 'User not found!')
        const {name, email, course, semester} = req.body

        if (!name || typeof name !== 'string' || name.trim() === '') throw new HttpError(400, `Invalid name!`)
        if (!email || typeof email !== 'string' || email.trim() === '') throw new HttpError(400, `Invalid email!`)
        if (!course || typeof course !== 'string' || course.trim() === '') throw new HttpError(400, `Invalid course!`)
        if (!semester || typeof semester !== 'string' || semester.trim() === '') throw new HttpError(400, `Invalid semester!`)

        const userUpdate = usersModel.userUpdate(id, {name, email, course, semester})
        return res.status(200).json(userUpdate)
    },

    // DELETE /users/:id
    delete: (req ,res) => {
        const {id} = req.params
        if(!id) throw new HttpError(400, 'Id is required!')
        
        const userDelete = usersModel.userDelete(id)
        if(!userDelete) throw new HttpError(404, 'User not found!')
        return res.status(200).json(userDelete)
    }

}