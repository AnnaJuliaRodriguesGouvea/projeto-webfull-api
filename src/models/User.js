const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bdConfig")

const UserModel = sequelize.define('User', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

module.exports = UserModel