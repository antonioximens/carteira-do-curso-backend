require('dotenv').config()
const express = require('express')
const errorMiddlewares = require('./middlewares/error-middlewares')
const authenticRouter = require('./routes/authenticRouter')
const adminRouter = require('./routes/adminRouter')

const app = express()

app.use(express.json())

// Rotas autenticaão
app.use('/auth', authenticRouter)

// Rotas admin
app.use('/admin', adminRouter)

// Tratamento de erro
app.use(errorMiddlewares)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`SERVIDOR INICIADO!\n http://localhost:${PORT}`))