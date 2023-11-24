//Configurando express
const express = require("express")
const app = express()

//Configuração .env
require("dotenv").config()

//Importantando instalação do banco
const installDB = require('./services/installDBService')

//Configurando arquivos públicos e body parser
const path = require("path")
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//Definindo rotas
app.use("/", require("./controllers/authenticationController"))
app.use("/user", require("./controllers/userController"))
app.use("/fruit", require("./controllers/fruitController"))

app.listen(3000, () => {
    // installDB.install()
    //   .then(() => console.log("Banco instalado com sucesso"))
    //   .catch((error) => console.error(error))
    console.log("Rodando na porta 3000")
})
