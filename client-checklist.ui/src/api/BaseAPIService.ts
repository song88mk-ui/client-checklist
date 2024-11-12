/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchStatus, type APIErrorObject, type APIResponse, type APIService } from "./models";

const BaseAPIService = (): APIService => {
    const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "x-api-key": "B4DhSieTYe7AuNAp",
        "Access-Control-Allow-Origin": "*",
    }

    const fetchPrivate = async (method: string, url: string, body?: Record<string, unknown>, addHeaders?: Record<string, string>): Promise<APIResponse> => {
        let apiError: APIErrorObject | null = null;

        try {
            let newHeaders: Record<string, string> = {
                ...headers
            }

            if (addHeaders !== undefined && addHeaders !== null) {
                newHeaders = {
                    ...newHeaders,
                    ...addHeaders
                }
            }

            let options: Record<string, unknown> = {
                method,
                headers: newHeaders
            };

            if (body !== null && body !== undefined) {
                options = {
                    ...options,
                    body: JSON.stringify(body)
                }
            }

            const response: any = await fetch(
                `${BASE_API_URL}${url}`,
                options
            )

            if (!response.ok) {
                if (response?.status === 400) {
                    apiError = {
                        status: FetchStatus.BadRequest,
                        statusCode: 400
                    }
                    throw new Error()
                }

                if (response?.status >= 500) {
                    apiError = {
                        status: FetchStatus.ServerError,
                        statusCode: 500
                    }
                    throw new Error()
                }
            }

            const resJson: any = await response.json()
            const returnValue: APIResponse = {
                data: resJson?.result,
                message: resJson?.message,
                statusCode: resJson?.statusCode
            }

            return returnValue;
        } catch {
            const errorReturnValue: APIResponse = {
                error: apiError
            }

            return errorReturnValue
        }
    }

    return {
        fetchPrivate
    }
}

export default BaseAPIService