const jwt = require('jsonwebtoken');
const userService = require("./userService")
const logger = require('../helpers/loggerConfig')

module.exports = {
    login: async function(email, password) {
        const user = await userService.getUserByEmail(email);
        let messageError = "";
        if (user != null) {
            if (user.password === password) {
                let token = jwt.sign({idLogged: user.id}, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                })
                logger.logger.log('info', "Logado com sucesso!")
                return {status: 200, data: token}
            } else {
                messageError = "Senha incorreta"
                logger.logger.log('error', messageError)
                return {status: 400, data: messageError}
            }
        } else {
            messageError = "Esse usuario não existe"
            logger.logger.log('error', messageError)
            return {status: 404, data: messageError}
        }
    }
}
