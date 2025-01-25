import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';

const businessAcceptanceOddsFeedSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Odds Feed'),
	generateSubTask(2, 'Live Data'),
	generateSubTask(3, 'Bet Validation'),
	generateSubTask(4, 'Performance Test'),
];

export const BusinessAcceptanceOddsFeedValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: businessAcceptanceOddsFeedSubTasks
};
