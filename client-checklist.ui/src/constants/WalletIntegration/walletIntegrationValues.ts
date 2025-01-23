import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const walletIntegrationSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Authentication'),
	generateSubTask(2, 'Bet Placement'),
	generateSubTask(3, 'Bet Full Cashout'),
	generateSubTask(4, 'Bet Cancellation'),
	generateSubTask(5, 'Bet Settlement'),
	generateSubTask(6, 'Bet Resettlement')
];

export const WalletIntegrationValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: walletIntegrationSubTasks
};
