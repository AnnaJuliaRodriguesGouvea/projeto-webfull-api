const Joi = require("joi")

module.exports = {
    validateEmail: function(req, res, next) {
        const {error, value} = Joi.string().email().required().validate(req.body.email)
        if (error) {
            if (error.details && error.details[0].type === 'string.empty') {
              return res.status(400).json("O email não pode ser nulo");
            }

            if (error.details && error.details[0].type === 'string.email') {
              return res.status(400).json("O email não está no formato correto");
            }

            return res.status(400).json("Erro na validação do email");
        }

        req.body.email = value
        return next()
    },

    validatePassword: function(req, res, next) {
        const {error, value} = Joi.string()
                                    .min(6)
                                    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
                                    .required()
                                    .validate(req.body.password)

        if (error) {
            console.log(error.details)
            if (error.details && error.details[0].type === 'string.empty') {
                return res.status(400).json("A senha não pode ser nula");
            }

            if (error.details && error.details[0].type === 'string.min') {
                return res.status(400).json("A senha deve ter pelo menos 6 caracteres");
            }

            if (error.details && error.details[0].type === 'string.pattern.base') {
                return res.status(400).json("A senha não atende aos requisitos mínimos");
            }

            return res.status(400).json("Erro na validação da senha");
        }

        req.body.password = value
        return next()
    },
}
