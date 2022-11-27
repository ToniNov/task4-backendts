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
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const path_1 = require("./enum/path");
const authentication_1 = __importDefault(require("./routes/authentication"));
const login_1 = __importDefault(require("./routes/login"));
const signup_1 = __importDefault(require("./routes/signup"));
const users_1 = __importDefault(require("./routes/users"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)('mongodb+srv://admin:admin@cluster0.mzzphbh.mongodb.net/Users?retryWrites=true&w=majority');
    });
}
run().catch(err => console.log(err));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({}));
app.use(`${path_1.Path.Signup}`, signup_1.default);
app.use(`${path_1.Path.Auth}`, authentication_1.default);
app.use(`${path_1.Path.Login}`, login_1.default);
app.use(`${path_1.Path.Users}`, users_1.default);
const port = process.env.PORT || 7654;
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
