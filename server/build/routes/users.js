"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
class UserRoutes {
    constructor() {
        this.userController = new usersController_1.UserController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/sign-up", this.userController.validate('createUser'), this.userController.addNewUser);
        this.router.post("/sign-in", this.userController.validate('login'), this.userController.signIn);
    }
}
exports.UserRoutes = UserRoutes;
