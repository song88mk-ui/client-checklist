import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const MTSWalletSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Bet Validation', '', ClientRowStatus.NotStarted, ''),
];

export const MTSWalletValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: MTSWalletSubTasks
};
