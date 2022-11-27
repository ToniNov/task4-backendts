"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("../enum/path");
const checkAuth_1 = require("../middleware/checkAuth");
const index_1 = require("../controllers/index");
const authenticationRouter = express_1.default.Router();
authenticationRouter.get(`${path_1.Path.Root}`, checkAuth_1.checkAuth, index_1.UserController.auth);
exports.default = authenticationRouter;
