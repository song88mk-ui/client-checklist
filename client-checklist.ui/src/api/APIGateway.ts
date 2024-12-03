import type {
	CreateClientFormDataType,
	CreateProductFormDataType,
	DeleteClientFormDataType,
	LoginFormDataType,
	LogoutFormDataType
} from './request.DTOs.model';
import BaseAPIService from './BaseAPIService';
import type { APIGatewayType, APIResponse } from './models';
import type {
	CreateClientResponse,
	CreateProductResponse,
	DeleteClientResponse,
	FetchClientsResponse,
	GetClientTaskStatusResponse,
	LoginAPIResponse,
	LogoutAPIResponse
} from './response.DTOs.model';

const APIGateway = (): APIGatewayType => {
	const { fetchPrivate } = BaseAPIService();

	const login = async (formData: LoginFormDataType): Promise<APIResponse<LoginAPIResponse>> => {
		const res = await fetchPrivate<LoginFormDataType, LoginAPIResponse>(
			'POST',
			'/v1/users/login',
			formData
		);
		return res;
	};

	const logout = async (formData: LogoutFormDataType): Promise<APIResponse<LogoutAPIResponse>> => {
		const res = await fetchPrivate<LogoutFormDataType, LogoutAPIResponse>(
			'POST',
			'/v1/users/logout',
			formData
		);
		return res;
	};

	const fetchClients = async (
		headers: Record<string, string>
	): Promise<APIResponse<FetchClientsResponse>> => {
		const res = await fetchPrivate<null, FetchClientsResponse>('GET', '/v1/clients', null, headers);
		return res;
	};

	const deleteClient = async (
		formData: DeleteClientFormDataType,
		headers: Record<string, string>
	): Promise<APIResponse<DeleteClientResponse>> => {
		const res = await fetchPrivate<DeleteClientFormDataType, DeleteClientResponse>(
			'DELETE',
			'/v1/clients',
			formData,
			headers
		);
		return res;
	};

	const createClient = async (
		formData: CreateClientFormDataType,
		headers: Record<string, string>
	): Promise<APIResponse<CreateClientResponse>> => {
		const res = await fetchPrivate<CreateClientFormDataType, CreateClientResponse>(
			'POST',
			'/v1/clients',
			formData,
			headers
		);
		return res;
	};

	const getClientTaskStatus = async (
		clientId: string,
		headers: Record<string, string>
	): Promise<APIResponse<GetClientTaskStatusResponse>> => {
		const res = await fetchPrivate<null, GetClientTaskStatusResponse>(
			'GET',
			`/v1/clients/${clientId}`,
			undefined,
			headers
		);
		return res;
	};

	const createProduct = async (
		formData: CreateProductFormDataType,
		headers: Record<string, string>
	): Promise<APIResponse<CreateProductResponse>> => {
		const res = await fetchPrivate<CreateProductFormDataType, CreateProductResponse>(
			'POST',
			'/v1/clients/steps',
			formData,
			headers
		);
		return res;
	};

	return {
		login,
		logout,
		fetchClients,
		deleteClient,
		createClient,
		getClientTaskStatus,
		createProduct
	};
};

export default APIGateway;
