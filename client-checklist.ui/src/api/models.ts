export enum ResponseMessage {
    Success = "Success",
    Failed = "Failed"
}

export type CatchExceptionAPIResponse = {
    error: unknown
}

export type SuccessfulAPIResponse = {
    data: unknown
    message: string,
    statusCode: number,
}

export type APIResponse = SuccessfulAPIResponse | CatchExceptionAPIResponse

export type LoginResponse = {
    data: {
        accessType: number,
        roleName: string,
        userToken: string
    }
    message: ResponseMessage
}

export type EndpointNoBody = () => Promise<APIResponse>
export type EndpointWithBody = (data: Record<string, string>) => Promise<APIResponse>

export type APIService = {
    fetchPrivate: (method: string, url: string, body?: Record<string, unknown>) => Promise<APIResponse>
}

export type APIGatewayType = {
    login: EndpointWithBody
}