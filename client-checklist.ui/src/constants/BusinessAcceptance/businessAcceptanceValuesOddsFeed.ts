import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const businessAcceptanceOddsFeedSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Odds Feed', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(2, 'Odds Feed (Client)', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(3, 'Live Data', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(4, 'Live Data (Client)', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(5, 'Bet Validation', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(6, 'Bet Validation (Client)', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(7, 'Performance Test', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(8, 'Performance Test (Client)', '', ClientRowStatus.NotStarted, '')
];

export const BusinessAcceptanceOddsFeedValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: businessAcceptanceOddsFeedSubTasks
};
