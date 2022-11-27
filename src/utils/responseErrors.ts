import {ErrorMessage} from "../enum/errorMessage";
import {Response} from "express";

export const blockError = (res: Response) => {
    return res.status(403).send({
        message: ErrorMessage.Block,
        auth: false
    })
}

export const userNotFoundError = (res: Response) => {
    res.status(404).send({
        message: ErrorMessage.UserNotFound,
        auth: false
    })
}
