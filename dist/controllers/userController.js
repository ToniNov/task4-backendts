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
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUsers = exports.removeUsers = exports.fetchUsers = exports.login = exports.auth = exports.signup = void 0;
const express_validator_1 = require("express-validator");
const errorMessage_1 = require("../enum/errorMessage");
const userService_1 = require("../services/userService");
const status_1 = require("../enum/status");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: errorMessage_1.ErrorMessage.CorrectEnter });
        }
        const { name, password, email } = req.body;
        const user = yield (0, userService_1.createUser)({ name, password, email });
        return res.status(200).send({ user });
    }
    catch (error) {
        return res.status(400).send({ message: errorMessage_1.ErrorMessage.EmailIsUse });
    }
});
exports.signup = signup;
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userService_1.authUser)(req.user);
        if (user) {
            return res.status(200).send({ user });
        }
        else {
            return res.status(401).send({ message: errorMessage_1.ErrorMessage.Authorized });
        }
    }
    catch (error) {
        return res.status(401).send({ message: errorMessage_1.ErrorMessage.Authorized });
    }
});
exports.auth = auth;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: errorMessage_1.ErrorMessage.CorrectEnter });
        }
        const email = req.body.email;
        const password = req.body.password;
        const user = yield (0, userService_1.loginUser)({ password, email });
        if (!user) {
            return res.status(401).send({
                message: errorMessage_1.ErrorMessage.Authorized,
                auth: false
            });
        }
        if (user.status === "Blocked") {
            return res.status(403).send({
                message: errorMessage_1.ErrorMessage.Block,
                auth: false
            });
        }
        return res.status(200).send({ user });
    }
    catch (error) {
        return res.status(400).send({ message: errorMessage_1.ErrorMessage.EmailOrPassword });
    }
});
exports.login = login;
const fetchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getUsers)();
        return res.status(200).send({ users });
    }
    catch (error) {
        res.status(400).send({ message: errorMessage_1.ErrorMessage.UserNotFound });
    }
});
exports.fetchUsers = fetchUsers;
const removeUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.deleteSomeUsers)(req.body);
        if (req.body.id.indexOf(req.body.userId) !== -1) {
            return res.status(403).send({ message: errorMessage_1.ErrorMessage.DeleteUserInBase, auth: false });
        }
        return res.status(200).send({ users });
    }
    catch (error) {
        res.status(400).send({ message: errorMessage_1.ErrorMessage.DeleteUsers });
    }
});
exports.removeUsers = removeUsers;
const changeUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.updateSomeUsers)(req.body.id, req.body.data);
        if (req.body.id.indexOf(req.body.userId) !== -1 && req.body.data === status_1.Status.Block) {
            return res.status(403).send({ message: errorMessage_1.ErrorMessage.BlockUserInBase, auth: false });
        }
        return res.status(200).send({ users });
    }
    catch (error) {
        res.status(400).send({ message: errorMessage_1.ErrorMessage.UpdateUsers });
    }
});
exports.changeUsers = changeUsers;
