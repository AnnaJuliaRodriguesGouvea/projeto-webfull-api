const fruitDao = require("../DAO/fruitDao")
const {Op} = require("sequelize");

module.exports = {
    existFruit: async function(name) {
        return await fruitDao.getByName(name) != null
    },

    registerFruit: async function(name, family, order, genus, calories, fat, sugar, carbohydrates, protein) {
        if(!await this.existFruit(name)) {
            const fruit = await fruitDao.insert(name, family, order, genus, calories, fat, sugar, carbohydrates, protein)
            return {status: 201, data: fruit}
        }
        return {status: 409, data: "Já existe uma fruta com esse nome"}
    },

    listFruit: async function(limit, page, filter, substring) {
        let whereCondition = {}
        if (filter !== "null" && substring !== "null") {
            whereCondition[filter] = { [Op.iLike]: `%${substring}%` };
        }

        const fruits = await fruitDao.list(limit, page, whereCondition)
        if (fruits) {
            if(fruits.rows.length > 0) {
                const formattedFruits = await Promise.all(
                    fruits.rows.map(async (fruit) => {
                        return {
                            id: fruit.dataValues.id,
                            name: fruit.dataValues.name,
                            family: fruit.dataValues.family,
                            order: fruit.dataValues.order,
                            genus: fruit.dataValues.genus,
                            nutritions: {
                                calories: fruit.dataValues.calories,
                                fat: fruit.dataValues.fat,
                                sugar: fruit.dataValues.sugar,
                                carbohydrates: fruit.dataValues.carbohydrates,
                                protein: fruit.dataValues.protein,
                            },
                        };
                    })
                );

                const response = {
                    rows: formattedFruits,
                    count: fruits.count,
                    pageCount: Math.ceil(fruits.count / limit)
                }
                return {status: 200, data: response}
            }
            return {status: 204, data: "Não possui dados suficientes para essa página com esse limite"}
        }
        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}
    },

}
