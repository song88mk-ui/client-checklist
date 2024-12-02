import type { ClientTaskFormType } from "$lib/ProductForm/validationSchema";
import type { APIResponse } from "./models";

export type ProductFormDataType = ClientTaskFormType & {
  clientId: string,
  stepId: number,
  stepName: string,
  serviceTypeId: number,
  sortOrder: number,
  environment: number,
};

export type ProductAPIResponse = APIResponse & {
  data: {
    id: string;
  }
};

export type ProductEndpointWithBody = (
  data: ProductFormDataType,
  headers?: Record<string, string>
) => Promise<ProductAPIResponse>;