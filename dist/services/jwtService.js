"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const secret_1 = require("../enum/secret");
const jwt = require('jsonwebtoken');
exports.jwtService = {
    createNewToken(userId) {
        return jwt.sign({ _id: userId }, secret_1.Secret.Secret, { expiresIn: '2d' });
    },
    getUserIdFromToken(token) {
        console.log('tok', token);
        try {
            const payload = jwt.verify(token, secret_1.Secret.Secret);
            return payload._id;
        }
        catch (e) {
            return null;
        }
    }
};
