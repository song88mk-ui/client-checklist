import BaseAPIService from './BaseAPIService';
import type { APIGatewayType, APIResponse } from './models';

const APIGateway = (): APIGatewayType => {
    const { fetchPrivate } = BaseAPIService();

    const login = async (formData: Record<string, unknown>): Promise<APIResponse> => {
        const res = await fetchPrivate('POST', '/v1/users/login', formData);
        return res;
    };

    const logout = async (formData: Record<string, unknown>): Promise<APIResponse> => {
        const res = await fetchPrivate('POST', '/v1/users/logout', formData);
        return res;
    };

    const fetchClients = async (headers?: Record<string, string>): Promise<APIResponse> => {
        const res = await fetchPrivate('GET', '/v1/clients', undefined, headers);
        return res;
    };

    const deleteClient = async (
        formData: Record<string, unknown>,
        headers?: Record<string, string>
    ): Promise<APIResponse> => {
        const res = await fetchPrivate('DELETE', '/v1/clients', formData, headers);
        return res;
    };

    const createClient = async (formData: Record<string, unknown>, headers?: Record<string, string>): Promise<APIResponse> => {
        const res = await fetchPrivate('POST', '/v1/clients', formData, headers);
        return res;
    };
    const getClientTaskStatus = async (data: Record<string, string>): Promise<APIResponse> => {
		const {clientId,token} =  data
		const res = await fetchPrivate("GET", `/v1/clients/${clientId}`,undefined,{"x-user-token":token})
		return res;
    }

    return {
        login,
        logout,
        fetchClients,
        deleteClient,
        createClient,
        getClientTaskStatus
    };
};

export default APIGateway;
