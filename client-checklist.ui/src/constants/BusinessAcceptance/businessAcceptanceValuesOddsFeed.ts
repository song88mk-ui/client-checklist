import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const businessAcceptanceOddsFeedSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Odds Feed'),
	generateSubTask(2, 'Odds Feed (Client)'),
	generateSubTask(3, 'Live Data'),
	generateSubTask(4, 'Live Data (Client)'),
	generateSubTask(5, 'Bet Validation'),
	generateSubTask(6, 'Bet Validation (Client)'),
	generateSubTask(7, 'Performance Test'),
	generateSubTask(8, 'Performance Test (Client)')
];

export const BusinessAcceptanceOddsFeedValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: businessAcceptanceOddsFeedSubTasks
};
