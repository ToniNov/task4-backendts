import {Status} from "../enum/status";

export type DocumentResultType<T> = {
    _doc: T
}

export type Empty = {}

export type ErrorResponseType = {
    message: string,
    auth?: boolean
}

export type Nullable<T> = null | T

export type StatusType = Status.Unblock | Status.Block

export type UserAuthResponseType = {
    user: UserSendType
}

export type UserAuthType = UserSendType & {
    token: string,
}

export type UserIdType = {
    userId?: string
}

export type UserLoginType = UserIdType & {
    email: string,
    password: string,
}

export type UserSignupType = {
    name: string,
    email: string,
    password: string,
}

export type UserResponseType = {
    user: UserAuthType
}

export type UserType = UserSendType & {
    password: string,
}

export type UserSendType = {
    _id: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    timeLastLogin: string,
    status: StatusType,
}

export type UsersIdType = {
    id: string[],
    userId?: string
}

export type UsersResponseType = {
    users: UserSendType[]
}

export type UsersUpdateType = UsersIdType & {
    data: string
    userId?: string
}









