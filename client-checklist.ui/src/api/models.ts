import type {
	CreateClientPayload,
	CreateProductPayload,
	EditProductPayload,
	EditClientPayload,
	LoginPayload,
	LogoutPayload,
	ClientStatusPayload
} from './request.DTO.model';
import type {
	CreateClientResponse,
	CreateProductResponse,
	EditProductResponse,
	EditClientResponse,
	FetchClientsResponse,
	GetClientTaskStatusResponse,
	LoginAPIResponse,
	LogoutAPIResponse,
	ClientStatusResponse
} from './response.DTO.model';

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
	login: (payload: LoginPayload) => Promise<APIResponse<LoginAPIResponse>>;
	logout: (payload: LogoutPayload) => Promise<APIResponse<LogoutAPIResponse>>;
	getClients: (headers: Record<string, string>) => Promise<APIResponse<FetchClientsResponse>>;
	getClientStatus: (
		payload: ClientStatusPayload,
		headers: Record<string, string>
	) => Promise<APIResponse<ClientStatusResponse>>;
	createClient: (
		payload: CreateClientPayload,
		headers: Record<string, string>
	) => Promise<APIResponse<CreateClientResponse>>;
	updateClient: (
		payload: EditClientPayload,
		headers: Record<string, string>
	) => Promise<APIResponse<EditClientResponse>>;
	getClient: (
		clientId: string,
		headers: Record<string, string>
	) => Promise<APIResponse<GetClientTaskStatusResponse>>;
	createStep: (
		payload: CreateProductPayload,
		headers: Record<string, string>
	) => Promise<APIResponse<CreateProductResponse>>;
	updateStep: (
		formData: EditProductPayload,
		headers: Record<string, string>
	) => Promise<APIResponse<EditProductResponse>>;
};
