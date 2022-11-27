import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {ErrorMessage} from "../enum/errorMessage";
import {authUser, createUser, deleteSomeUsers, getUsers, loginUser, updateSomeUsers} from "../services/userService";
import {Status} from "../enum/status";


export const signup = async (req:Request, res:Response) => {
    try {
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: ErrorMessage.CorrectEnter })
        }
        const { name, password, email } = req.body
        const user = await createUser({ name, password, email })
        return res.status(200).send({ user })
    } catch (error) {
        return res.status(400).send({ message: ErrorMessage.EmailIsUse })
    }
}

export const auth = async (req:Request,res:Response) => {
    try {
        const user = await authUser(req.user!)
        if (user) {
            return res.status(200).send({ user })
        } else {
            return res.status(401).send({ message: ErrorMessage.Authorized })
        }
    } catch (error) {
        return res.status(401).send({ message: ErrorMessage.Authorized })
    }
}

export const login = async (req:Request, res:Response) => {
    try {
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: ErrorMessage.CorrectEnter })
        }
        const email = req.body.email;
        const password = req.body.password;
        const user = await loginUser({ password, email })
        if (!user) {
            return res.status(401).send({
                message: ErrorMessage.Authorized,
                auth: false
            })
        }
        if (user.status === "Blocked") {
            return res.status(403).send({
                message: ErrorMessage.Block,
                auth: false
            })
        }
        return res.status(200).send({ user })
    } catch (error) {
        return res.status(400).send({ message: ErrorMessage.EmailOrPassword })
    }
}

export const fetchUsers =  async (req: Request, res: Response) => {
    try {
        const users = await getUsers()
        return res.status(200).send({ users })
    } catch (error) {
        res.status(400).send({ message: ErrorMessage.UserNotFound })
    }
}

export const removeUsers = async (req: Request, res: Response) => {
    try {
        const users = await deleteSomeUsers(req.body)
        if(req.body.id.indexOf(req.body.userId) !== -1) {
            return res.status(403).send({ message: ErrorMessage.DeleteUserInBase, auth: false })
        }
        return res.status(200).send({ users })
    } catch (error) {
        res.status(400).send({ message: ErrorMessage.DeleteUsers })
    }
}

export const changeUsers = async (req: Request, res: Response) => {
    try {
        const users = await updateSomeUsers(req.body.id, req.body.data)
        if(req.body.id.indexOf(req.body.userId) !== -1 && req.body.data === Status.Block) {
            return res.status(403).send({ message: ErrorMessage.BlockUserInBase, auth: false })
        }
        return res.status(200).send({ users })
    } catch (error) {
        res.status(400).send({ message: ErrorMessage.UpdateUsers })
    }
}