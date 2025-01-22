import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const endToEndOddsFeedSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Odds Feed'),
	generateSubTask(2, 'Live Data'),
	generateSubTask(1, 'Bet Validation'),
	generateSubTask(2, 'Performance Test')
];

export const EndToEndOddsFeedValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: endToEndOddsFeedSubTasks
};
