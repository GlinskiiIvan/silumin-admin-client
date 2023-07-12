export interface IAuthRequest {
    name: string,
    password: string
}

export interface IAuthResponse {
    token: string;
}

export interface IUser {
    id: number,
    name: string,
    roles: {
        id: number,
        value: string
    }[]
}