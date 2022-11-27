import {UserSendType, UserType} from "../types/types"

export const createUsersData = (user: UserType): UserSendType => {
    const userInstance = JSON.parse(JSON.stringify(user))
    const {password, ...otherUserData} = userInstance

    return {...otherUserData}
}
