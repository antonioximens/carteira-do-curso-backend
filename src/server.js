require('dotenv').config()
const cors = require('cors')
const express = require('express')
const errorMiddlewares = require('./middlewares/error-middlewares')
const authenticRouter = require('./routes/authenticRouter')
const adminRouter = require('./routes/adminRouter')

const app = express()

app.use(express.json())

app.use(cors()); // Permite todas as origens

// Para permitir apenas uma origem específica:
app.use(cors({ origin: "http://localhost:5173" }));


// Rotas autenticaão
app.use(authenticRouter)

// Rotas admin
app.use(adminRouter)

// Tratamento de erro
app.use(errorMiddlewares)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`SERVIDOR INICIADO!\n http://localhost:${PORT}`))