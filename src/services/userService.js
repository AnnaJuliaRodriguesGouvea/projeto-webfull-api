const userDao = require("../DAO/userDao")
const logger = require('../helpers/loggerConfig')

module.exports = {
    getUserById: async function(id) {
        return await userDao.getById(id)
    },

    getUserByEmail: async function(email) {
        return await userDao.getByEmail(email)
    },

    existEmail: async function(email) {
        return await userDao.getByEmail(email) != null
    },

    registerUser: async function(email, password) {
        if(!await this.existEmail(email)) {
            const user = await userDao.insert(email, password)
            logger.logger.log('info', "Sucesso ao cadastrar usuário!")
            return {status: 201, data: user}
        }

        let messageError = "Já existe uma conta com esse email"
        logger.logger.log('error', messageError)
        return {status: 409, data: messageError}
    }

}
