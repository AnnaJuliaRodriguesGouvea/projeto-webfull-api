const Joi = require("joi")

module.exports = {
    validateName: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.name)
        if (error) {
            if (error.details && error.details[0].type === 'string.empty') {
                return res.status(400).json("O nome não pode ser nulo");
            }

            return res.status(400).json("Erro na validação do nome");
        }

        req.body.name = value
        return next()
    },

    validateFamily: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.family)
        if (error) {
            if (error.details && error.details[0].type === 'string.empty') {
                return res.status(400).json("A família não pode ser nula");
            }

            return res.status(400).json("Erro na validação da família");
        }

        req.body.family = value
        return next()
    },

    validateOrder: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.order)
        if (error) {
            if (error.details && error.details[0].type === 'string.empty') {
                return res.status(400).json("A ordem não pode ser nula");
            }

            return res.status(400).json("Erro na validação da ordem");
        }

        req.body.order = value
        return next()
    },

    validateGenus: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.genus)
        if (error) {
            if (error.details && error.details[0].type === 'string.empty') {
                return res.status(400).json("O gênero não pode ser nula");
            }

            return res.status(400).json("Erro na validação do gênero");
        }

        req.body.genus = value
        return next()
    },

    validateCalories: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.calories)
        if (error) {
            if (error.details && error.details[0].type === 'number.base') {
                return res.status(400).json("As calorias não podem ser nula");
            }

            return res.status(400).json("Erro na validação das calorias");
        }

        req.body.calories = value
        return next()
    },

    validateFat: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.fat)
        if (error) {
            if (error.details && error.details[0].type === 'number.base') {
                return res.status(400).json("A gordura não pode ser nula");
            }

            return res.status(400).json("Erro na validação da gordura");
        }

        req.body.fat = value
        return next()
    },

    validateSugar: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.sugar)
        if (error) {
            if (error.details && error.details[0].type === 'number.base') {
                return res.status(400).json("O açúcar não pode ser nulo");
            }

            return res.status(400).json("Erro na validação do açúcar");
        }

        req.body.sugar = value
        return next()
    },

    validateCarbohydrates: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.carbohydrates)
        if (error) {
            console.log("TESTE", error.details)
            if (error.details && error.details[0].type === 'number.base') {
                return res.status(400).json("Os carboidratos não podem ser nulo");
            }

            return res.status(400).json("Erro na validação dos carboidratos");
        }

        req.body.carbohydrates = value
        return next()
    },

    validateProtein: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.protein)
        if (error) {
            if (error.details && error.details[0].type === 'number.base') {
                return res.status(400).json("A proteína não pode ser nula");
            }

            return res.status(400).json("Erro na validação da proteína");
        }

        req.body.protein = value
        return next()
    },

    validateFilter: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.query.filter)
        if (error) {
            return res.status(400).json("Erro na validação do filter");
        }

        req.query.filter = value
        return next()
    },

    validateSubstring: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.query.substring)
        if (error) {
            return res.status(400).json("Erro na validação da substring");
        }

        req.query.substring = value
        return next()
    },
}
