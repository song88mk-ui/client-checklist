import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';

const MTSWalletSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Limit ID Creation'),
	generateSubTask(2, 'Liability Settings'),
	generateSubTask(3, 'Bookmaker Settings'),
	generateSubTask(4, 'CCF'),
	generateSubTask(5, 'Tournament Hierachy'),
	generateSubTask(6, 'Test Bets for reports'),
];

export const MTSWalletValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: MTSWalletSubTasks
};
