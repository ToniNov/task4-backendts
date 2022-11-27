import express from "express";
import {Path} from "../enum/path";
import {checkAuth} from "../middleware/checkAuth";
import {Empty, ErrorResponseType, UserLoginType, UserResponseType} from "../types/types";
import {UserController} from "../controllers/index"

const authenticationRouter = express.Router()

authenticationRouter.get<Empty, UserResponseType | ErrorResponseType, UserLoginType, Empty>(`${Path.Root}`,
    checkAuth, UserController.auth);

export default authenticationRouter