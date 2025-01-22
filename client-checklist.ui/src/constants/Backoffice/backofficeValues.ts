import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';

const backOfficeSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Client Account Set Up'),
	generateSubTask(2, 'Back Office User Account')
];

export const BackOfficeValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: backOfficeSubTasks
};