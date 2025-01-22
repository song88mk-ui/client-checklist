import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const endToEndOddsFeedSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Odds Feed', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(2, 'Live Data', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(1, 'Bet Validation', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(2, 'Performance Test', '', ClientRowStatus.NotStarted, '')
];

export const EndToEndOddsFeedValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: endToEndOddsFeedSubTasks
};
