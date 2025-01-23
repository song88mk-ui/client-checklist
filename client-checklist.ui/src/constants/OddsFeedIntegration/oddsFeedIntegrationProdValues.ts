import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';

const oddsFeedSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Odds Feed'),
];

export const OddsFeedIntegrationProdValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: oddsFeedSubTasks
};