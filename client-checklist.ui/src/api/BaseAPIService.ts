/* eslint-disable @typescript-eslint/no-explicit-any */
import { type APIResponse, type APIService, type CatchExceptionAPIResponse, type SuccessfulAPIResponse } from "./models";

const BaseAPIService = (): APIService => {
    const BASE_API_URL = import.meta.env.MODE === "production" ? "https://startapi.jmj.bet" : "https://preprod-startapi.jmj.bet";

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "x-api-key": "B4DhSieTYe7AuNAp",
        "Access-Control-Allow-Origin": "*",
    }

    const fetchPrivate = async (method: string, url: string, body?: Record<string, unknown>): Promise<APIResponse> => {
        try {
            let options: Record<string, unknown> = {
                method,
                headers
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
            ).then(res => res.json())
                .catch((error: unknown) => {
                    console.log(error)
                }
            );
            
            const returnValue: SuccessfulAPIResponse = {
                data: response?.result,
                message: response?.message,
                statusCode: response?.statusCode
            }

            return returnValue;
        } catch (error: unknown) {
            const errorReturnValue: CatchExceptionAPIResponse = {
                error
            }

            return errorReturnValue
        }
    }

    return {
        fetchPrivate
    }
}

export default BaseAPIService