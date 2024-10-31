export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    roleName: string
    userToken: string
    accessType: number
}

export interface LogoutRequest {
    userToken: string
}