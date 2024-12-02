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
	data: unknown;
	message: string;
	statusCode: number;
	error?: {
		message: string;
		statusCode: number;
	};
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
	login: LoginEndpointWithBody;
	logout: EndpointWithBody;
	fetchClients: EndpointNoBody;
	deleteClient: EndpointWithBody;
	createClient: EndpointWithBody;
	getClientTaskStatus: EndpointWithBody;
	createProduct: ProductEndpointWithBody;
};

export type APIErrorObject = {
    status: FetchStatus;
    statusCode: number;
};
