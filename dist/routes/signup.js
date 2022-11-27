"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("../enum/path");
const validation_1 = require("../middleware/validation");
const index_1 = require("../controllers/index");
const signUpRouter = express_1.default.Router();
signUpRouter.post(`${path_1.Path.Root}`, validation_1.registerValidation, index_1.UserController.signup);
exports.default = signUpRouter;
