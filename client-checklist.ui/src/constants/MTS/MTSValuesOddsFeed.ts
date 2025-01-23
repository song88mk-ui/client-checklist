import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const MTSOddsFeedSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Max Bet'),
	generateSubTask(2, 'Max Payout'),
	generateSubTask(3, 'Player CCF and Groupings'),
	generateSubTask(4, 'Bet Validation'),
];

export const MTSOddsFeedValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: MTSOddsFeedSubTasks
};
