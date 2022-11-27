import {Nullable, UserAuthType, UserLoginType, UserSendType, UserSignupType, UserType} from "../types/types";
import {User} from "../models/user";
import {createDate} from "../utils";
import {createAuthUserData} from "../utils/createAuthUserData";

const bcrypt = require("bcrypt");

export const getUsers = async (): Promise<UserSendType[]> => {
    try {
        return User.find({}, {password: false, __v: false})
    } catch (error) {
        throw new Error()
    }
}

export const getUserByEmail = async (email: string): Promise<UserType | undefined | null> => {
    try {
        return await User.findOne({email: new RegExp(email)});
    } catch (error) {
        throw new Error()
    }
}

export const getUserById = async (id: string): Promise<UserType | null> => {
    try {
        return User.findById(id);
    } catch (error) {
        throw new Error()
    }
}

export const deleteSomeUsers = async (users: any): Promise<UserSendType[]> => {
    try {
        await User.deleteMany({_id: {$in: users.id}})
        return await getUsers()
    } catch (error) {
        throw new Error()
    }
}

export const updateUserData = async (id: string, updateData: {}): Promise<UserType | null> => {
    try {
        return await User.findByIdAndUpdate(id, updateData, {upsert: true});
    } catch (error) {
        throw new Error()
    }
}

export const updateSomeUsers = async (users: string[], data: string): Promise<UserSendType[]> => {
    try {
        await User.updateMany({_id: {$in: users}}, {$set: {status: data}})
        return getUsers()
    } catch (error) {
        throw new Error()
    }
}

export const createUser = async (payload: UserSignupType): Promise<UserAuthType> => {
    console.log("createUser payload ", payload)
    try {
        const timeLastLogin = new Date();
        const status = 'Unblocked';
        const userNew = {...payload, timeLastLogin, status};
        const salt = await bcrypt.genSalt(10);
        userNew.password = await bcrypt.hash(userNew.password, salt)
        const user = new User({...userNew});
        const creatingUser = await user.save();
        const userSend = createAuthUserData(creatingUser);
        return await userSend;
    } catch (error) {
        throw new Error()
    }
}


export const loginUser = async (payload: UserLoginType): Promise<UserAuthType | null> => {
    try {
        const user = await getUserByEmail(payload.email)

        if (user) {
            const isValidPassword = await bcrypt.compare(payload.password, user.password);
            if (isValidPassword) {
                const userUpdate = await updateUserData(user._id, {timeLastLogin: createDate()})
                const userSend = createAuthUserData(userUpdate);
                return await userSend;
            } else {
                return null
            }
        } else {
            return null
        }
    } catch (error) {
        throw new Error()
    }
}

export const authUser = async (user: UserType): Promise<Nullable<UserAuthType>> => {
    try {
        if (user) {
            const userSend = createAuthUserData(user);
            return await userSend;
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}