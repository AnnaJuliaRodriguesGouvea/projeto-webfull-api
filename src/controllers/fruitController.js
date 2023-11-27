const express = require("express")
const router = express.Router()
const fruitService = require("../services/fruitService")
const fruitValidator = require("../validators/fruitValidator")
const authenticationValidator = require("../validators/authenticationValidator")
const paginationValidator = require("../validators/paginationValidator")
const cache = require('../helpers/redisConfig')
const userService = require("../services/userService");

router.get("/",
    authenticationValidator.validateToken,
    paginationValidator.validateLimit,
    paginationValidator.validatePage,
    fruitValidator.validateFilter,
    fruitValidator.validateSubstring,
    async (req, res, next) => {
        if (req.query.filter === "null" && req.query.substring === "null") {
            const user = await userService.getUserById(req.idLogged)
            if(!user) {
                return res.status(500).json( "Usuário não encontrado");
            }

            fruitService.publish(req.idLogged, user, "buscaRealizadaCache")
            return await cache.route()(req, res, next);
        } else {
            next();
        }
    },
    async (req, res) => {
        const response = await fruitService.listFruit(
            req.idLogged,
            req.query.limit,
            req.query.page,
            req.query.filter,
            req.query.substring
        )
        res.status(response.status).json(response.data)
    })

router.post("/",
    authenticationValidator.validateToken,
    fruitValidator.validateName,
    fruitValidator.validateFamily,
    fruitValidator.validateOrder,
    fruitValidator.validateGenus,
    fruitValidator.validateCalories,
    fruitValidator.validateFat,
    fruitValidator.validateSugar,
    fruitValidator.validateCarbohydrates,
    fruitValidator.validateProtein,
    cache.invalidate(),
    async (req, res) => {
        const response = await fruitService.registerFruit(
            req.body.name,
            req.body.family,
            req.body.order,
            req.body.genus,
            req.body.calories,
            req.body.fat,
            req.body.sugar,
            req.body.carbohydrates,
            req.body.protein
        )

        res.status(response.status).json(response.data);
    })

module.exports = router
