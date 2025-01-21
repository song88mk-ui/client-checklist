import type { CreateProductPayload, EditProductPayload } from '$api/request.DTO.model';
import type { APIResponse } from '$api/models';
import type { CreateProductResponse, EditProductResponse } from '$api/response.DTO.model';
import BaseAPIService from '$api/BaseAPIService';

const { fetchPrivate } = BaseAPIService();
const createStep = async (
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

const updateStep = async (
	formData: EditProductPayload,
	headers: Record<string, string>
): Promise<APIResponse<EditProductResponse>> => {
	const res = await fetchPrivate<EditProductPayload, EditProductResponse>(
		'PUT',
		'/v1/clients/steps',
		formData,
		headers
	);
	return res;
};

const Steps = {
	createStep,
	updateStep
}

export default Steps;