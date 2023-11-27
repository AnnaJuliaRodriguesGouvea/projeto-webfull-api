const Joi = require("joi")

const minLimit = 6
const mediumLimit = 12
const maxLimit = 18

module.exports = {
    validateLimit: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.query.limit)
        if (error) {
            if (error.details && error.details[0].type === 'string.empty') {
                return res.status(400).json("O limite não pode ser nulo");
            }

            return res.status(400).json("Erro na validação do limite da página");
        }

        if(req.query.limit != minLimit && req.query.limit != mediumLimit && req.query.limit != maxLimit) {
            return res.status(400).json("O limite só pode ser 6, 12 ou 18")
        }

        req.query.limit = value
        return next()
    },

    validatePage: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.query.page)
        if (error) {
            if (error.details && error.details[0].type === 'string.empty') {
                return res.status(400).json("A página não pode ser nulo");
            }

            return res.status(400).json("Erro na validação da página");
        }

        req.query.page = value
        return next()
    },

}
