"use strict";
/*
Tabla cliente No llaves foraneas
*/
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const fkName = "client_id";
module.exports = (sequelize, DataTypes) => {
    class Client extends sequelize_1.Model {
        static associate(models) {
            Client.hasMany(models.Call, { foreignKey: fkName });
            Client.hasMany(models.Order, { foreignKey: fkName });
        }
    }
    Client.init({
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Client",
    });
    return Client;
};
//# sourceMappingURL=client.js.map