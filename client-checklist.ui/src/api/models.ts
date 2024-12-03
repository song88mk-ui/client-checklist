import type {
	CreateClientFormDataType,
	CreateProductFormDataType,
	DeleteClientFormDataType,
	LoginFormDataType,
	LogoutFormDataType
} from './request.DTOs.model';
import type {
	CreateClientResponse,
	CreateProductResponse,
	DeleteClientResponse,
	FetchClientsResponse,
	GetClientTaskStatusResponse,
	LoginAPIResponse,
	LogoutAPIResponse
} from './response.DTOs.model';

export enum ResponseMessage {
	Success = 'Success',
	Failed = 'Failed'
}

export enum StatusCode {
	Success = 100,
	UnAuthorized = 401
}

export enum FetchErrorStatus {
	BadRequest = 'BadRequest',
	ServerError = 'ServerError',
	UnAuthorized = 'UnAuthorized'
}

export type APIErrorObject = {
	status: FetchErrorStatus;
	statusCode: number;
};

export type APIResponse<T> = {
	data?: T;
	message?: string;
	statusCode?: number;
	error?: {
		status: FetchErrorStatus;
		statusCode: number;
	};
};

export type APIService = {
	fetchPrivate<B, T>(
		method: string,
		url: string,
		body?: B,
		headers?: Record<string, string>
	): Promise<APIResponse<T>>;
};

export type APIGatewayType = {
	login: (formData: LoginFormDataType) => Promise<APIResponse<LoginAPIResponse>>;
	logout: (formData: LogoutFormDataType) => Promise<APIResponse<LogoutAPIResponse>>;
	fetchClients: (headers: Record<string, string>) => Promise<APIResponse<FetchClientsResponse>>;
	deleteClient: (
		formData: DeleteClientFormDataType,
		headers: Record<string, string>
	) => Promise<APIResponse<DeleteClientResponse>>;
	createClient: (
		formData: CreateClientFormDataType,
		headers: Record<string, string>
	) => Promise<APIResponse<CreateClientResponse>>;
	getClientTaskStatus: (
		clientId: string,
		headers: Record<string, string>
	) => Promise<APIResponse<GetClientTaskStatusResponse>>;
	createProduct: (
		formData: CreateProductFormDataType,
		headers: Record<string, string>
	) => Promise<APIResponse<CreateProductResponse>>;
};
