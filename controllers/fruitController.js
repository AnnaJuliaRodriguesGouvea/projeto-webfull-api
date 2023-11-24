const express = require("express")
const router = express.Router()
const fruitService = require("../services/fruitService")
const fruitValidator = require("../validators/fruitValidator")
const authenticationValidator = require("../validators/authenticationValidator")
const paginationValidator = require("../validators/paginationValidator")

router.get("/",
    authenticationValidator.validateToken,
    paginationValidator.validateLimit,
    paginationValidator.validatePage,
    async (req, res) => {
        const response = await fruitService.listFruit(req.query.limit, req.query.page)
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
        res.status(response.status).json(response.data)
    })

module.exports = router