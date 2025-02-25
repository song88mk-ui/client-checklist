import type StepStatus from '$enums/StepStatus';
import type { ClientInformationFormType } from '$lib/ClientInformationForm';
import type { ProductFormType } from '$lib/ProductForm';

type Step = {
	stepId: number;
	title: string;
	status: StepStatus;
	formData?: ClientInformationFormType | ProductFormType;
	isIncomplete?: boolean;
};

export type { Step as default };
