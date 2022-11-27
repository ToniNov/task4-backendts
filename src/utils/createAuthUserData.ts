import { Secret } from "../enum/secret";
import {UserAuthType, UserSendType} from "../types/types";

const jwt = require('jsonwebtoken')

export const createAuthUserData = async (user: (UserSendType & { password: string }) | undefined | null): Promise<UserAuthType> => {
    const userInstance = JSON.parse(JSON.stringify(user))
    const token = jwt.sign({
        _id: userInstance._id,
    }, Secret.Secret, { expiresIn: '2d' })
    const { password, ...otherUserData } = userInstance

    return Promise.resolve({ token, ...otherUserData })

}
