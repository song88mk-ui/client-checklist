import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const MTSOddsFeedSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Max Bet', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(2, 'Max Bet (Client)', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(3, 'Max Payout', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(4, 'Max Payout (Client)', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(5, 'Player CCF and Groupings', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(6, 'Player CCF and Groupings (Client)', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(7, 'Bet Validation', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(8, 'Bet Validation (Client)', '', ClientRowStatus.NotStarted, ''),
];

export const MTSOddsFeedValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: MTSOddsFeedSubTasks
};
