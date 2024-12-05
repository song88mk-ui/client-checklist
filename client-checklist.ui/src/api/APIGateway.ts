import type {
	CreateClientPayload,
	CreateProductPayload,
	LoginPayload,
	LogoutPayload,
    ClientStatusPayload
} from './request.DTO.model';
import BaseAPIService from './BaseAPIService';
import type { APIGatewayType, APIResponse } from './models';
import type {
	CreateClientResponse,
	CreateProductResponse,
	FetchClientsResponse,
	GetClientTaskStatusResponse,
	LoginAPIResponse,
	LogoutAPIResponse,
    ClientStatusResponse
} from './response.DTO.model';

const APIGateway = (): APIGatewayType => {
	const { fetchPrivate } = BaseAPIService();

	const login = async (formData: LoginPayload): Promise<APIResponse<LoginAPIResponse>> => {
		const res = await fetchPrivate<LoginPayload, LoginAPIResponse>(
			'POST',
			'/v1/users/login',
			formData
		);
		return res;
	};

	const logout = async (formData: LogoutPayload): Promise<APIResponse<LogoutAPIResponse>> => {
		const res = await fetchPrivate<LogoutPayload, LogoutAPIResponse>(
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

    const ClientStatus = async (
		formData: ClientStatusPayload,
		headers: Record<string, string>
	): Promise<APIResponse<ClientStatusResponse>> => {
		const res = await fetchPrivate<ClientStatusPayload, ClientStatusResponse>(
			'PUT',
			'/v1/clients/status',
			formData,
			headers
		);
		return res;
	};

	const createClient = async (
		formData: CreateClientPayload,
		headers: Record<string, string>
	): Promise<APIResponse<CreateClientResponse>> => {
		const res = await fetchPrivate<CreateClientPayload, CreateClientResponse>(
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
		formData: CreateProductPayload,
		headers: Record<string, string>
	): Promise<APIResponse<CreateProductResponse>> => {
		const res = await fetchPrivate<CreateProductPayload, CreateProductResponse>(
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
		createProduct
	};
};

export default APIGateway;
