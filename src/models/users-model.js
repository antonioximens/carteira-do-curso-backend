const uuid = require('uuid').v4
const bcrypt = require('bcrypt')

// simulaçõa de um banco de dados
let users = [
    {id: '1', name: 'Marcos',email: 'marcos@gmail.com', role: 'admin', course: 'Ciência da Computação', semester: '5', password: '123'},
    {id: uuid(), name: 'Pedro',email: 'pedro@gamail.com', role: 'standard', course: 'Ciência da Computação', semester: '5',password: '123456'}
]

// métodos do usuário
// -> retorna usuário especifico 
// -> procurar pelo email
// -> criar um usuário no forms

module.exports = {
    userAll: () => users,

    userById: (id) => {
        if(!id) return null
        const user = users.find( userFind => userFind.id === id)
        return user || null
    },

    userByEmail: (email) => users.find(user => user.email === email) ,

    userRegister: (name, email, course, semester, password ) => {
        const emailExisting = users.find(user => user.email === email)
        if(emailExisting) return null
        const newUser = {
            id: uuid(),
            name,
            email,
            course,
            semester,
            password: bcrypt.hashSync(password,10),
            role: 'standard'
        }
        users.push(newUser)
        return newUser
    },

    userUpdate: (id, user) => {
        // buscando um usuario, caso não tenha retorna null
        const userIndex = users.findIndex(user => user.id === id)
        if(userIndex === -1) return null
        // setando as novas informações com spread
        const userToUpdate = {...users[userIndex], ...user}
        users[userIndex] = userToUpdate
        return userToUpdate
    },

    userDelete: (id) => {
         // buscando um usuario, caso não tenha retorna null
        const userIndex = users.findIndex(user => user.id === id)
        if(userIndex === -1) return null
        // deleto na posição indicada
        const userToDelete = users[userIndex]
        users = users.filter(user => user.id !== id)
        return userToDelete
    }
}