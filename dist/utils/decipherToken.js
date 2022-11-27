"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decipherToken = void 0;
const jwt = require('jsonwebtoken');
const decipherToken = (token, secret) => (jwt.verify(token, secret))._id;
exports.decipherToken = decipherToken;
