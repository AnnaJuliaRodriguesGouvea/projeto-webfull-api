const UserModel = require("../models/User")

module.exports = {
    insert: async function(email, password) {
        return await UserModel.create({
            email: email,
            password: password
        })
    },

    getByEmail: async function(email) {
        return await UserModel.findOne({ where: { email: email } })
    },
}
