"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = __importStar(require("express"));
const bodyParser = __importStar(require("body-parser"));
const models_1 = __importDefault(require("./models"));
const users_1 = require("./routes/users");
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.userRoutes = new users_1.UserRoutes();
        this.app = express.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
        this.app.use((0, cors_1.default)());
        (0, models_1.default)();
    }
    routes() {
        this.app.use("/api/users", new users_1.UserRoutes().router);
    }
}
exports.default = new App().app;
