import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues } from '$constants/commonValues';

const subTasks: ClientSubTaskFormType[] = [];

export const ClientLaunchSportsValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: subTasks
};
