import type {
	CreateClientPayload,
	CreateProductPayload,
	LoginPayload,
	LogoutPayload,
	ClientStatusPayload,
	EditProductPayload
} from './request.DTO.model';
import BaseAPIService from './BaseAPIService';
import type { APIGatewayType, APIResponse } from './models';
import type {
	CreateClientResponse,
	CreateProductResponse,
	EditProductResponse,
	FetchClientsResponse,
	GetClientTaskStatusResponse,
	LoginAPIResponse,
	LogoutAPIResponse,
	ClientStatusResponse
} from './response.DTO.model';

const APIGateway = (): APIGatewayType => {
	const { fetchPrivate } = BaseAPIService();

	const login = async (payload: LoginPayload): Promise<APIResponse<LoginAPIResponse>> => {
		const res = await fetchPrivate<LoginPayload, LoginAPIResponse>(
			'POST',
			'/v1/users/login',
			payload
		);
		return res;
	};

	const logout = async (payload: LogoutPayload): Promise<APIResponse<LogoutAPIResponse>> => {
		const res = await fetchPrivate<LogoutPayload, LogoutAPIResponse>(
			'POST',
			'/v1/users/logout',
			payload
		);
		return res;
	};

	const fetchClients = async (
		headers: Record<string, string>
	): Promise<APIResponse<FetchClientsResponse>> => {
		const res = await fetchPrivate<null, FetchClientsResponse>('GET', '/v1/clients', null, headers);
		return res;
	};

	const ClientStatus = async (
		payload: ClientStatusPayload,
		headers: Record<string, string>
	): Promise<APIResponse<ClientStatusResponse>> => {
		const res = await fetchPrivate<ClientStatusPayload, ClientStatusResponse>(
			'PUT',
			'/v1/clients/status',
			payload,
			headers
		);
		return res;
	};

	const createClient = async (
		payload: CreateClientPayload,
		headers: Record<string, string>
	): Promise<APIResponse<CreateClientResponse>> => {
		const res = await fetchPrivate<CreateClientPayload, CreateClientResponse>(
			'POST',
			'/v1/clients',
			payload,
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
		payload: CreateProductPayload,
		headers: Record<string, string>
	): Promise<APIResponse<CreateProductResponse>> => {
		const res = await fetchPrivate<CreateProductPayload, CreateProductResponse>(
			'POST',
			'/v1/clients/steps',
			payload,
			headers
		);
		return res;
	};

	const editProduct = async (
		formData: EditProductPayload,
		headers: Record<string, string>
	): Promise<APIResponse<EditProductResponse>> => {
		const res = await fetchPrivate<EditProductPayload, EditProductResponse>(
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
		ClientStatus,
		createClient,
		getClientTaskStatus,
		createProduct,
		editProduct
	};
};

export default APIGateway;
