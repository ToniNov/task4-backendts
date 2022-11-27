import {Secret} from "../enum/secret";
import {ObjectId} from "mongoose";

const jwt = require('jsonwebtoken')

export const jwtService = {
    createNewToken(userId: ObjectId) {
        return jwt.sign({_id: userId}, Secret.Secret, {expiresIn: '2d'})
    },

    getUserIdFromToken(token: string) {
        console.log('tok', token)
        try {
            const payload = jwt.verify(token, Secret.Secret)
            return payload._id
        } catch (e) {
            return null
        }
    }
}