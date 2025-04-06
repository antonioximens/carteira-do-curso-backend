const HttpError = require("../errors/HttpErrors")
const usersModel = require("../models/users-model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
// POST /register
register: (req, res) => {
    const {name ,email, course, semester, password} = req.body

    // validações
    if (!name || typeof name !== 'string' || name.trim() === '') throw new HttpError(400, `Invalid name!`)
    if (!email || typeof email !== 'string' || email.trim() === '') throw new HttpError(400, `Invalid email!`)
    if (!course || typeof course !== 'string' || course.trim() === '') throw new HttpError(400, `Invalid course!`)
    if (!semester || typeof semester !== 'string' || semester.trim() === '') throw new HttpError(400, `Invalid semester!`)
    if (!password || typeof password !== 'string' || password.trim() === '') throw new HttpError(400, `Invalid password!`)
    
    // criando registro e escondendo o password
    const newUser = usersModel.userRegister(name ,email, course, semester, password)
    if(!newUser) throw new HttpError(409, `E-mail já existe!`)
    return res.status(201).json({...newUser, password: undefined})
},

 //POST /login
login: (req, res) => {
    const { email, password } = req.body;

    // Validações
    if (!email || typeof email !== 'string' || email.trim() === '') throw new HttpError(400, "Email is invalid or missing!")
    if (!password || typeof password !== 'string' || password.trim() === '') throw new HttpError(400, "Password is invalid or missing!")

    // Sanitização do e-mail
    const sanitizedEmail = email.trim().toLowerCase();

    // Encontrando usuário
    const user = usersModel.userByEmail(sanitizedEmail);
    if (!user) throw new HttpError(404, "No user found with the provided email!")

    // Verificando senha
    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) throw new HttpError(401, "Incorrect password, please try again!")

    // Gerando token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '1d' })
    // Retornando token
    return res.status(200).json({ token });
}
}