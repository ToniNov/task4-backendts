"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userNotFoundError = exports.blockError = void 0;
const errorMessage_1 = require("../enum/errorMessage");
const blockError = (res) => {
    return res.status(403).send({
        message: errorMessage_1.ErrorMessage.Block,
        auth: false
    });
};
exports.blockError = blockError;
const userNotFoundError = (res) => {
    res.status(404).send({
        message: errorMessage_1.ErrorMessage.UserNotFound,
        auth: false
    });
};
exports.userNotFoundError = userNotFoundError;
