import type { LoginFormDataType } from "./request.DTOs.model";
import type { LoginAPIResponse } from "./response.DTOs.model";

export enum ResponseMessage {
    Success = 'Success',
    Failed = 'Failed'
}

export enum StatusCode {
    Success = 100,
    UnAuthorized = 401
}

export enum FetchErrorStatus {
    BadRequest = 'BadRequest',
    ServerError = 'ServerError',
    UnAuthorized = 'UnAuthorized'
}

export type APIResponse<T> = {
	data?: T;
	message?: string;
	statusCode?: number;
	error?: {
		status: FetchErrorStatus;
		statusCode: number;
	};
};

export type APIService = {
    fetchPrivate<B, T>(method: string,
        url: string,
        body?: B,
        headers?: Record<string, string>): Promise<APIResponse<T>>;
};

export type APIGatewayType = {
	login: (formData: LoginFormDataType) => Promise<APIResponse<LoginAPIResponse>>;
};

export type APIErrorObject = {
    status: FetchErrorStatus;
    statusCode: number;
};
