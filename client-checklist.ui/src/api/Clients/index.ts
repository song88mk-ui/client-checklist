import type {
	ClientStatusResponse,
	CreateClientResponse,
	EditClientResponse,
	FetchClientsResponse, GetClientTaskStatusResponse
} from '$api/response.DTO.model';
import type { APIResponse } from '$api/models';
import BaseAPIService from '$api/BaseAPIService';
import type { ClientStatusPayload, CreateClientPayload, EditClientPayload } from '$api/request.DTO.model';


const { fetchPrivate } = BaseAPIService();
const getClients = async (
	headers: Record<string, string>
): Promise<APIResponse<FetchClientsResponse>> => {
	const res = await fetchPrivate<null, FetchClientsResponse>('GET', '/v1/clients', null, headers);
	return res;
};

const getClientStatus = async (
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

const updateClient = async (
	payload: EditClientPayload,
	headers: Record<string, string>
): Promise<APIResponse<EditClientResponse>> => {
	const res = await fetchPrivate<EditClientPayload, EditClientResponse>(
		'PUT',
		'/v1/clients',
		payload,
		headers
	);
	return res;
};

const getClient = async (
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

const Clients = {
	getClients,
	getClientStatus,
	getClient,
	createClient,
	updateClient,
}

export default Clients