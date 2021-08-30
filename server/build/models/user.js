"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../lib/sequelize"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
}
User.init({
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Email is not valid.'
            },
            notEmpty: {
                msg: 'Email is required.'
            }
        }
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: 'First name is required.'
            }
        }
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
    },
    fullName: {
        type: sequelize_1.DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value!');
        }
    },
    password: {
        type: sequelize_1.DataTypes.VIRTUAL
    },
    passwordHash: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: sequelize_2.default,
});
User.beforeCreate((user, options) => {
    if (user.password) {
        user.passwordHash = bcrypt_1.default.hashSync(user.password, 10);
    }
});
User.beforeUpdate((user, options) => {
    if (user.password) {
        user.passwordHash = bcrypt_1.default.hashSync(user.password, 10);
    }
});
exports.default = User;
