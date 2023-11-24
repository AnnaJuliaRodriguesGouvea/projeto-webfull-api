const userDao = require("../DAO/userDao")

module.exports = {
    getUserByEmail: async function(email) {
        return await userDao.getByEmail(email)
    },

    existEmail: async function(email) {
        return await userDao.getByEmail(email) != null
    },

    registerUser: async function(email, password) {
        if(!await this.existEmail(email)) {
            const user = await userDao.insert(email, password)
            return {status: 201, data: user}
        }
        return {status: 409, data: "Já existe uma conta com esse email"}
    }

}
