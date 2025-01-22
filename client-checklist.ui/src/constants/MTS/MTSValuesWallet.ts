import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const MTSWalletSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Limit ID Creation', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(2, 'Limit ID Creation(Client)', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(3, 'Liability Settings', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(4, 'Liability Settings(Client)', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(5, 'Bookmaker Settings', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(6, 'Bookmaker Settings(Client)', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(7, 'CCF', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(8, 'CCF(Client)', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(9, 'Tournament Hierachy', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(10, 'Tournament Hierachy(Client)', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(11, 'Test Bets for reports', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(12, 'Test Bets for reports (Client)', '', ClientRowStatus.NotStarted, '')
];

export const MTSWalletValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: MTSWalletSubTasks
};
