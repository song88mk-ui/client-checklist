import type {
	DeleteClientFormDataType,
	LoginFormDataType,
	LogoutFormDataType
} from './request.DTOs.model';
import BaseAPIService from './BaseAPIService';
import type { APIGatewayType, APIResponse } from './models';
import type {
	DeleteClientResponse,
	FetchClientsResponse,
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

	// const logout = async (formData: Record<string, unknown>): Promise<APIResponse> => {
	//     const res = await fetchPrivate('POST', '/v1/users/logout', formData);
	//     return res;
	// };

	// const fetchClients = async (headers?: Record<string, string>): Promise<APIResponse> => {
	//     const res = await fetchPrivate('GET', '/v1/clients', undefined, headers);
	//     return res;
	// };

	// const deleteClient = async (
	//     formData: Record<string, unknown>,
	//     headers?: Record<string, string>
	// ): Promise<APIResponse> => {
	//     const res = await fetchPrivate('DELETE', '/v1/clients', formData, headers);
	//     return res;
	// };

	// const createClient = async (formData: Record<string, unknown>, headers?: Record<string, string>): Promise<APIResponse> => {
	//     const res = await fetchPrivate('POST', '/v1/clients', formData, headers);
	//     return res;
	// };
	// const getClientTaskStatus = async (data: Record<string, string>): Promise<APIResponse> => {
	// 	const {clientId,token} =  data
	// 	const res = await fetchPrivate("GET", `/v1/clients/${clientId}`,undefined,{"x-user-token":token})
	// 	return res;
	// };

	// const createProduct = async (formData: ProductFormDataType, headers?: Record<string, string>): Promise<ProductAPIResponse> => {
	//     const res = await fetchPrivate('POST', '/v1/clients/steps', formData, headers);
	//     return res as ProductAPIResponse;
	// }

	return {
		login,
		logout,
		fetchClients,
		deleteClient
	};
};

export default APIGateway;
