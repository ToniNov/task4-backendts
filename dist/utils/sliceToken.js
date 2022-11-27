"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sliceToken = void 0;
const sliceToken = (token) => (token || '').replace(/Bearer\s?/, '');
exports.sliceToken = sliceToken;
