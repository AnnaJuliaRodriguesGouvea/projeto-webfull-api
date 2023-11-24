const FruitModel = require("../models/Fruit")
const UserModel = require("../models/User");

module.exports = {
    list: async function(limit, page) {
        return await FruitModel.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit
        })
    },

    insert: async function(name, family, order, genus, calories, fat, sugar, carbohydrates, protein) {
        return await FruitModel.create({
            name: name,
            family: family,
            order: order,
            genus: genus,
            calories: calories,
            fat: fat,
            sugar: sugar,
            carbohydrates: carbohydrates,
            protein: protein
        })
    },

    getByName: async function(name) {
        return await FruitModel.findOne({ where: { name: name } })
    },
}
