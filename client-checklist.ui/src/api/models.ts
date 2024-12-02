export enum ResponseMessage {
    Success = 'Success',
    Failed = 'Failed'
}

export enum StatusCode {
    Success = 100,
    UnAuthorized = 401
}

export enum FetchStatus {
    BadRequest = 'BadRequest',
    ServerError = 'ServerError',
    UnAuthorized = 'UnAuthorized'
}

export type APIResponse = {
    data?: unknown;
    message?: string;
    statusCode?: number;
    error?: unknown;
};

export type LoginResponse = {
    data: {
        accessType: number;
        roleName: string;
        userToken: string;
    };
    message: ResponseMessage;
};

export type EndpointNoBody = (headers?: Record<string, string>) => Promise<APIResponse>;
export type EndpointWithBody = (
    data: Record<string, unknown>,
    headers?: Record<string, string>
) => Promise<APIResponse>;

export type APIService = {
    fetchPrivate: (
        method: string,
        url: string,
        body?: Record<string, unknown>,
        headers?: Record<string, string>
    ) => Promise<APIResponse>;
};

export type APIGatewayType = {
    login: EndpointWithBody;
    logout: EndpointWithBody;
    fetchClients: EndpointNoBody;
    deleteClient: EndpointWithBody;
    createClient: EndpointWithBody;
    getClientTaskStatus: EndpointWithBody;
};

export type APIErrorObject = {
    status: FetchStatus;
    statusCode: number;
};
