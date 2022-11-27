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
exports.checkAuth = void 0;
const userService_1 = require("../services/userService");
const errorMessage_1 = require("../enum/errorMessage");
const status_1 = require("../enum/status");
const jwtService_1 = require("../services/jwtService");
const responseErrors_1 = require("../utils/responseErrors");
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.headers.authorization;
    if (!auth)
        return res.status(401).send({ message: errorMessage_1.ErrorMessage.Authorized });
    const authType = auth.split(' ')[0];
    if (authType !== 'Bearer')
        return res.status(401).send({ message: errorMessage_1.ErrorMessage.Authorized });
    const token = auth.split(' ')[1];
    const userId = jwtService_1.jwtService.getUserIdFromToken(token);
    if (!userId)
        return res.status(401).send({ message: errorMessage_1.ErrorMessage.Authorized });
    const user = yield (0, userService_1.getUserById)(userId);
    console.log('user', user);
    if (!user)
        return (0, responseErrors_1.userNotFoundError)(res);
    if (user.status === status_1.Status.Block)
        return (0, responseErrors_1.blockError)(res);
    console.log('all ok');
    req.user = user;
    return next();
});
exports.checkAuth = checkAuth;
