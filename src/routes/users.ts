import express from "express";
import {Path} from "../enum/path";
import {checkAuth} from "../middleware/checkAuth";
import {Empty, ErrorResponseType, UserIdType, UsersIdType, UsersResponseType, UsersUpdateType} from "../types/types";
import {UserController} from "../controllers/index"

const usersRouter = express.Router()

usersRouter.use(checkAuth)

usersRouter.get<Empty, UsersResponseType | ErrorResponseType, UserIdType, Empty>(`${Path.Root}`,
    UserController.fetchUsers);

usersRouter.delete<Empty, UsersResponseType | ErrorResponseType, UsersIdType, Empty>(`${Path.Root}`,
    UserController.removeUsers);

usersRouter.post<Empty, UsersResponseType | ErrorResponseType, UsersUpdateType, Empty>(`${Path.Root}`,
    UserController.changeUsers);

export default usersRouter