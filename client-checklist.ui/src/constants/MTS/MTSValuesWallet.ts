import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const MTSWalletSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Limit ID Creation'),
	generateSubTask(2, 'Limit ID Creation(Client)'),
	generateSubTask(3, 'Liability Settings'),
	generateSubTask(4, 'Liability Settings(Client)'),
	generateSubTask(5, 'Bookmaker Settings'),
	generateSubTask(6, 'Bookmaker Settings(Client)'),
	generateSubTask(7, 'CCF'),
	generateSubTask(8, 'CCF(Client)'),
	generateSubTask(9, 'Tournament Hierachy'),
	generateSubTask(10, 'Tournament Hierachy(Client)'),
	generateSubTask(11, 'Test Bets for reports'),
	generateSubTask(12, 'Test Bets for reports (Client)')
];

export const MTSWalletValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: MTSWalletSubTasks
};
