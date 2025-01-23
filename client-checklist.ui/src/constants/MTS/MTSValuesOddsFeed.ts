import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';

const MTSOddsFeedSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Limit ID Creation'),
	generateSubTask(2, 'Liability Settings'),
	generateSubTask(3, 'Bookmaker Settings'),
	generateSubTask(4, 'CCF'),
	generateSubTask(5, 'Tournament Hierarchy'),
	generateSubTask(6, 'Test Bet for Reports'),
	generateSubTask(7, 'Bet Validation'),
];

export const MTSOddsFeedValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: MTSOddsFeedSubTasks
};
