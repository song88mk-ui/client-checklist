import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { ClientRowStatus } from '$enums/ClientRowStatus';
import { defaultValues, generateSubTask } from '$constants/commonValues';

const oddsFeedSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Odds Feed'),
	generateSubTask(2, 'Odds Feed (Client)')
];

export const OddsFeedIntegrationProdValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: oddsFeedSubTasks
};