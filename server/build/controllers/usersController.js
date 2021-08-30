"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
class UserController {
    validate(method) {
        switch (method) {
            case 'createUser': {
                return [
                    (0, express_validator_1.check)("email").custom((value) => __awaiter(this, void 0, void 0, function* () {
                        const user = yield models_1.User.findOne({
                            where: {
                                email: value,
                            }
                        });
                        if (user) {
                            return Promise.reject('Email is already in use');
                        }
                    })).not().isEmpty().withMessage("Email can't be blank")
                        .isEmail().withMessage("Email format should be correct"),
                    (0, express_validator_1.check)("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage("Password must includes one uppercase, one lowercase, one special character, one digit and min length is 8"),
                    (0, express_validator_1.check)("firstName").not().isEmpty().withMessage("First Name can't be blank"),
                ];
            }
            case 'login': {
                return [
                    (0, express_validator_1.check)("email").not().isEmpty().withMessage("Email can't be blank")
                        .isEmail().withMessage("Email format should be correct"),
                    (0, express_validator_1.check)("password").not().isEmpty().withMessage("Password can't be blank")
                    // check("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage("Password must includes one uppercase, one lowercase, one special character, one digit and min length is 8")
                ];
            }
        }
    }
    addNewUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ success: false, errors: errors.array() });
                }
                const user = yield models_1.User.create({
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: req.body.password,
                });
                if (user) {
                    return res.json({
                        success: true,
                        data: {
                            id: user.id,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                        }
                    });
                }
                else {
                    res.json({
                        success: false,
                        errors: [
                            { msg: "Unable to create User" },
                        ]
                    });
                }
            }
            catch (errors) {
                res.status(422).json({
                    success: false,
                    errors
                });
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ success: false, errors: errors.array() });
                }
                const user = yield models_1.User.findOne({
                    where: {
                        email: req.body.email,
                    }
                });
                if (user && bcrypt_1.default.compareSync(req.body.password, user.passwordHash)) {
                    res.json({
                        success: true,
                        data: {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                        }
                    });
                }
                else {
                    res.json({
                        success: false,
                        errors: [
                            { msg: "Email or password is incorrect" },
                        ]
                    });
                }
            }
            catch (errors) {
                res.status(422).json({
                    success: false,
                    errors
                });
            }
        });
    }
    current(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // some current user logic here,  need to add JWT
            }
            catch (errors) {
                res.status(422).json({
                    success: false,
                    errors
                });
            }
        });
    }
}
exports.UserController = UserController;
