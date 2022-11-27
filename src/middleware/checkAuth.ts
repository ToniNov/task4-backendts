import {getUserById} from "../services/userService";
import {ErrorMessage} from "../enum/errorMessage";

import {NextFunction, Request, RequestHandler, Response} from 'express';
import {Status} from "../enum/status";
import {jwtService} from "../services/jwtService";
import {blockError, userNotFoundError} from "../utils/responseErrors";

export const checkAuth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).send({message: ErrorMessage.Authorized})
    const authType = auth.split(' ')[0]
    if (authType !== 'Bearer') return res.status(401).send({message: ErrorMessage.Authorized})
    const token = auth.split(' ')[1]
    const userId = jwtService.getUserIdFromToken(token)
    if (!userId) return res.status(401).send({message: ErrorMessage.Authorized})
    const user = await getUserById(userId)
    console.log('user', user)
    if (!user) return userNotFoundError(res)
    if (user.status === Status.Block) return blockError(res)
    console.log('all ok')
    req.user = user
    return next()
}
