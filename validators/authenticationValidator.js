const Joi = require("joi")
const jwt = require('jsonwebtoken')

module.exports = {
    validatePassword: function(req, res, next) {
        const {error, value} = Joi.string()
                                    .required()
                                    .validate(req.body.password)

        if (error) {
            console.log(error.details)
            if (error.details && error.details[0].type === 'string.empty') {
                return res.status(400).json("A senha não pode ser nula");
            }

            return res.status(400).json("Erro na validação da senha");
        }

        req.body.password = value
        return next()
    },

    validateToken: async function(req, res, next) {
        let token = req.headers['authorization']
        if (!token)
            token = ''
        token = token.split('Bearer ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                res.status(403).json("Acesso negado - Token invalido")
                return
            }
            req.idLogged = payload.idLogged
            next()
        })
    },
}
