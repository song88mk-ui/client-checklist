import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const walletIntegrationSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Authentication', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(2, 'Bet Placement', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(3, 'Bet Full Cashout', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(4, 'Bet Cancellation', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(5, 'Bet Settlement', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(6, 'Bet Resettlement', '', ClientRowStatus.NotStarted, '')
];

export const WalletIntegrationValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: walletIntegrationSubTasks
};
