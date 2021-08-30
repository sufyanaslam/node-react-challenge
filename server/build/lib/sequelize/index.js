"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const env = process.env.NODE_ENV || 'development';
const config = require('./../../../config/database.json')[env];
let sequelize;
sequelize = new sequelize_1.default.Sequelize(config.database, config.username, config.password, config);
exports.default = sequelize;
