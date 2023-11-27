//Configurando express
const express = require("express")
const cors = require('cors')
const app = express()


//Configuração .env
require("dotenv").config()

//Importantando instalação do banco
const installDB = require('./src/services/installDBService')

//Configurando arquivos públicos e body parser
app.use(express.json(), cors())
const path = require("path")
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//Definindo rotas
app.use("/", require("./src/controllers/authenticationController"))
app.use("/user", require("./src/controllers/userController"))
app.use("/fruit", require("./src/controllers/fruitController"))

app.listen(3001, () => {
    // installDB.install()
    //   .then(() => console.log("Banco instalado com sucesso"))
    //   .catch((error) => console.error(error))
    console.log("Rodando na porta 3001")
})
