"use strict";
/*
Tabla call tiene llaves foraneas
*/
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const fkName = "call_id";
module.exports = (sequelize, DataTypes) => {
    class Call extends sequelize_1.Model {
        static associate(models) {
            Call.belongsToMany(models.Problem, {
                through: "Call-Problem",
                foreignKey: fkName,
            });
            Call.belongsTo(models.Client, { foreignKey: "client_id" });
            Call.belongsTo(models.User, { foreignKey: "agent_id" });
        }
    }
    Call.init({
        call_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        duration: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 1,
            },
        },
        video_url: {
            type: DataTypes.TEXT,
        },
        transcription_url: {
            type: DataTypes.TEXT,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        sequelize,
        modelName: "Call",
        timestamps: true,
        updatedAt: false,
        createdAt: "created",
    });
    return Call;
};
//# sourceMappingURL=call.js.map