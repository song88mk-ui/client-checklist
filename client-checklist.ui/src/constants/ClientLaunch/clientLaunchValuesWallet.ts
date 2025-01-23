import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';

const MTSOddsFeedSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Client Launch'),
];

export const ClientLaunchWalletValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: MTSOddsFeedSubTasks
};
