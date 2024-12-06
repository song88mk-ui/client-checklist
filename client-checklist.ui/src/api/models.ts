import type {
    CreateClientFormDataType,
    CreateProductFormDataType,
    EditProductFormDataType,
    LoginFormDataType,
    LogoutFormDataType,
    SetClientActiveStatusFormDataType
} from './request.DTOs.model';
import type {
    CreateClientResponse,
    CreateProductResponse,
    EditProductResponse,
    FetchClientsResponse,
    GetClientTaskStatusResponse,
    LoginAPIResponse,
    LogoutAPIResponse,
    SetClientActiveStatusResponse
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
	setClientActiveStatus: (
		formData: SetClientActiveStatusFormDataType,
		headers: Record<string, string>
	) => Promise<APIResponse<SetClientActiveStatusResponse>>;
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
	editProduct: (
		formData: EditProductFormDataType,
		headers: Record<string, string>
	) => Promise<APIResponse<EditProductResponse>>;
};
