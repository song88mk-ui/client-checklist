/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchErrorStatus, type APIErrorObject, type APIResponse, type APIService } from "./models";

const BaseAPIService = (): APIService => {
    const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "x-api-key": "B4DhSieTYe7AuNAp",
        "Access-Control-Allow-Origin": "*",
    }

    const fetchPrivate = async <B, T>(method: string, url: string, payload?: B, addHeaders?: Record<string, string>): Promise<APIResponse<T>> => {
        let apiError: APIErrorObject = {
            status: FetchErrorStatus.BadRequest,
            statusCode: 400
        };

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

            if (payload !== null && payload !== undefined) {
                options = {
                    ...options,
                    body: JSON.stringify(payload)
                }
            }

            const response: any = await fetch(
                `${BASE_API_URL}${url}`,
                options
            )

            if (response?.status === 400) {
                apiError = {
                    status: FetchErrorStatus.BadRequest,
                    statusCode: 400
                }
                throw new Error()
            }

            if (response?.status === 401) {
                apiError = {
                    status: FetchErrorStatus.UnAuthorized,
                    statusCode: 401
                }
                throw new Error()
            }

            if (response?.status >= 400) {
                apiError = {
                    status: FetchErrorStatus.ServerError,
                    statusCode: 500
                }
                throw new Error()
            }

            const resJson: any = await response.json()
            const returnValue: APIResponse<T> = {
                data: resJson?.result,
                message: resJson?.message,
                statusCode: resJson?.statusCode
            }

            return returnValue;
        } catch (error: unknown) {
            console.log("Catch exception error", error)

            const errorReturnValue: APIResponse<T> = {
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