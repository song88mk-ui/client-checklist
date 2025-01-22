import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const operationsSubTasks: ClientSubTaskFormType[] = [
    generateSubTask(1, 'Back Office-Customer Training', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(2, 'External Provider Customer Support Set Up', '', ClientRowStatus.NotStarted, ''),
];

export const OperationsValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: operationsSubTasks
};
