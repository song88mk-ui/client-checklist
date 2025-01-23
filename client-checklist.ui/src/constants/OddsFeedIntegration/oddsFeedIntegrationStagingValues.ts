import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';

const oddsFeedSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Odds Feed'),
	generateSubTask(3, 'Live Data'),
];

export const OddsFeedIntegrationStagingValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: oddsFeedSubTasks
};