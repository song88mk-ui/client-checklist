import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';

const sportsbookSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Color Schemes / Themes'),
	generateSubTask(2, 'New Player Site Features')
];

export const SportsbookValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: sportsbookSubTasks
};
