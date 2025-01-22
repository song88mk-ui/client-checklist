import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const MTSOddsFeedSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Max Bet'),
	generateSubTask(2, 'Max Bet (Client)'),
	generateSubTask(3, 'Max Payout'),
	generateSubTask(4, 'Max Payout (Client)'),
	generateSubTask(5, 'Player CCF and Groupings'),
	generateSubTask(6, 'Player CCF and Groupings (Client)'),
	generateSubTask(7, 'Bet Validation'),
	generateSubTask(8, 'Bet Validation (Client)'),
];

export const MTSOddsFeedValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: MTSOddsFeedSubTasks
};
