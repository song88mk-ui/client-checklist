import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';

const oddsFeedSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Odds Feed'),
	generateSubTask(2, 'Odds Feed (Client)'),
	generateSubTask(3, 'Live Data'),
	generateSubTask(4, 'Live Data (Client)')
];

export const OddsFeedIntegrationStagingValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: oddsFeedSubTasks
};