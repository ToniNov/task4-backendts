import express from "express";
import {Path} from "../enum/path";
import {loginValidation} from "../middleware/validation";
import {Empty, ErrorResponseType, UserLoginType, UserResponseType} from "../types/types";
import {UserController} from "../controllers/index"

const loginRouter = express.Router()

loginRouter.post<Empty, UserResponseType | ErrorResponseType, UserLoginType, Empty>(`${Path.Root}`,
    loginValidation, UserController.login);

export default loginRouter