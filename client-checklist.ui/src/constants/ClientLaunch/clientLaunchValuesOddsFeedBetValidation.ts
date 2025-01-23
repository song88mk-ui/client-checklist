import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';

const subTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Bet Validation'),
];

export const ClientLaunchBetValidationValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: subTasks
};
