export interface IUserID {
    id: number,
}

export interface IUserRole {
    role: string
}

export interface IUserSigninDetails {
    username: string,
    email: string,
    password: string
}

export interface ICreateUserDto {
    username: string,
    email: string,
}

export type IUserType = IUserID & IUserRole & IUserSigninDetails;