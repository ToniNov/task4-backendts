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
exports.authUser = exports.loginUser = exports.createUser = exports.updateSomeUsers = exports.updateUserData = exports.deleteSomeUsers = exports.getUserById = exports.getUserByEmail = exports.getUsers = void 0;
const user_1 = require("../models/user");
const utils_1 = require("../utils");
const createAuthUserData_1 = require("../utils/createAuthUserData");
const bcrypt = require("bcrypt");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return user_1.User.find({}, { password: false, __v: false });
    }
    catch (error) {
        throw new Error();
    }
});
exports.getUsers = getUsers;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_1.User.findOne({ email: new RegExp(email) });
    }
    catch (error) {
        throw new Error();
    }
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return user_1.User.findById(id);
    }
    catch (error) {
        throw new Error();
    }
});
exports.getUserById = getUserById;
const deleteSomeUsers = (users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.User.deleteMany({ _id: { $in: users.id } });
        return yield (0, exports.getUsers)();
    }
    catch (error) {
        throw new Error();
    }
});
exports.deleteSomeUsers = deleteSomeUsers;
const updateUserData = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_1.User.findByIdAndUpdate(id, updateData, { upsert: true });
    }
    catch (error) {
        throw new Error();
    }
});
exports.updateUserData = updateUserData;
const updateSomeUsers = (users, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.User.updateMany({ _id: { $in: users } }, { $set: { status: data } });
        return (0, exports.getUsers)();
    }
    catch (error) {
        throw new Error();
    }
});
exports.updateSomeUsers = updateSomeUsers;
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("createUser payload ", payload);
    try {
        const timeLastLogin = new Date();
        const status = 'Unblocked';
        const userNew = Object.assign(Object.assign({}, payload), { timeLastLogin, status });
        const salt = yield bcrypt.genSalt(10);
        userNew.password = yield bcrypt.hash(userNew.password, salt);
        const user = new user_1.User(Object.assign({}, userNew));
        const creatingUser = yield user.save();
        const userSend = (0, createAuthUserData_1.createAuthUserData)(creatingUser);
        return yield userSend;
    }
    catch (error) {
        throw new Error();
    }
});
exports.createUser = createUser;
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, exports.getUserByEmail)(payload.email);
        if (user) {
            const isValidPassword = yield bcrypt.compare(payload.password, user.password);
            if (isValidPassword) {
                const userUpdate = yield (0, exports.updateUserData)(user._id, { timeLastLogin: (0, utils_1.createDate)() });
                const userSend = (0, createAuthUserData_1.createAuthUserData)(userUpdate);
                return yield userSend;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    catch (error) {
        throw new Error();
    }
});
exports.loginUser = loginUser;
const authUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (user) {
            const userSend = (0, createAuthUserData_1.createAuthUserData)(user);
            return yield userSend;
        }
        else {
            return null;
        }
    }
    catch (error) {
        return null;
    }
});
exports.authUser = authUser;
