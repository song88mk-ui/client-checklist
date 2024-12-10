import type StepStatus from '$enums/StepStatus';
import type { ClientInformationFormType } from '$lib/ClientInformationForm';
import type { ProductFormType } from '$lib/ProductForm';
import StepEnum from '$enums/Step';

type Step = {
	stepId: StepEnum;
	title: string;
	status: StepStatus;
	formData?: ClientInformationFormType | ProductFormType;
};

export type { Step as default };
