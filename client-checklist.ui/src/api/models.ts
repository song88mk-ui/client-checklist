import type { LoginEndpointWithBody } from './auth.model';
import type { ProductEndpointWithBody } from './product.model';

export enum ResponseMessage {
    Success = 'Success',
    Failed = 'Failed'
}

export enum FetchStatus {
    BadRequest = 'BadRequest',
    ServerError = 'ServerError',
    UnAuthorized = 'UnAuthorized'
}

export type APIResponse = {
<<<<<<< HEAD
	data: unknown;
	message: string;
	statusCode: number;
	error?: {
		message: string;
		statusCode: number;
	};
=======
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
>>>>>>> d286304c3b9fc738a15ca965e5ab845181ecacc9
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
<<<<<<< HEAD
	login: LoginEndpointWithBody;
	logout: EndpointWithBody;
	fetchClients: EndpointNoBody;
	deleteClient: EndpointWithBody;
	createClient: EndpointWithBody;
	getClientTaskStatus: EndpointWithBody;
	createProduct: ProductEndpointWithBody;
=======
    login: EndpointWithBody;
    logout: EndpointWithBody;
    fetchClients: EndpointNoBody;
    deleteClient: EndpointWithBody;
    createClient: EndpointWithBody;
    getClientTaskStatus: EndpointWithBody;
>>>>>>> d286304c3b9fc738a15ca965e5ab845181ecacc9
};

export type APIErrorObject = {
    status: FetchStatus;
    statusCode: number;
};
