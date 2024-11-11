import BaseAPIService from "./BaseAPIService"
import type { APIGatewayType, APIResponse } from "./models"

const APIGateway = (): APIGatewayType => {
    const { fetchPrivate } = BaseAPIService();

    const login = async (formData: Record<string, string>): Promise<APIResponse> => {
        const res = await fetchPrivate("POST", "/v1/users/login", formData)
        return res;
    }

    return {
        login
    };
}

export default APIGateway;