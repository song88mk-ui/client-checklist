import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const sportsbookSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Color Schemes / Themes', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(2, 'New Player Site Features', '', ClientRowStatus.NotStarted, '')
];

export const SportsbookValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: sportsbookSubTasks
};
