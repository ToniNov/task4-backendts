import express from "express";
import {Path} from "../enum/path";
import {registerValidation} from "../middleware/validation";
import {Empty, ErrorResponseType, UserResponseType, UserSignupType} from "../types/types";
import {UserController} from "../controllers/index"

const signUpRouter = express.Router()

signUpRouter.post<Empty, UserResponseType | ErrorResponseType, UserSignupType, Empty>(`${Path.Root}`,
    registerValidation, UserController.signup);

export default signUpRouter