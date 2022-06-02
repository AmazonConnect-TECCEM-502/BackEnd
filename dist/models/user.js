"use strict";
/*
Tabla Agent tiene llaves foraneas
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const sequelize_1 = require("sequelize");
var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "admin";
    UserRoles["AGENT"] = "agent";
    UserRoles["MANAGER"] = "manager";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate(models) {
            User.hasMany(User, { foreignKey: "manager_id" });
            User.belongsTo(User, { foreignKey: "manager_id" });
            User.hasMany(models.Call, { foreignKey: "agent_id" });
            User.hasMany(models.Problem, { foreignKey: "submitted_by" });
            User.hasMany(models.Solution, { foreignKey: "approved_by" });
            User.hasMany(models.Solution, { foreignKey: "submitted_id" });
        }
    }
    User.init({
        user_id: {
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
            unique: true,
            allowNull: true,
        },
        user_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cognito_uuid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "User",
    });
    return User;
};
//# sourceMappingURL=user.js.map