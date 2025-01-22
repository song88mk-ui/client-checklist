import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const backOfficeSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Client Account Set Up', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(2, 'Back Office User Account', '', ClientRowStatus.NotStarted, '')
];

export const BackOfficeValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: backOfficeSubTasks
};