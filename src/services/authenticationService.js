const jwt = require('jsonwebtoken');
const userService = require("./userService")

module.exports = {
    login: async function(email, password) {
        const user = await userService.getUserByEmail(email);
        if (user != null) {
            if (user.password === password) {
                let token = jwt.sign({idLogged: user.id}, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                })
                return ({status: 200, data: token})
            } else {
                return {status: 400, data: "Senha incorreta"}
            }
        } else {
            return {status: 404, data: "Esse usuario não existe"}
        }
    }
}
