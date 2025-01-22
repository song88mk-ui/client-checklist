import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const endToEndWalletSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Visiting the URL site', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(2, 'Log in / Log out', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(3, 'Search Functionality', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(4, 'Bet Placement', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(5, 'Odds Format', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(6, 'Full and Partial Cashout', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(7, 'Settlement', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(8, 'Bet Slip / My Bets', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(9, 'Bet History', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(10, 'Supported Languges', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(11, 'Supported Currencies', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(12, 'Odds and Push Updates', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(13, 'My Favorites', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(14, 'LMT, Live Stream, Statistics, Results', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(15, 'Parlay Bonus', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(16, 'Bet Builder', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(17, 'Price Boosts', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(18, 'Happy Path Messages', '', ClientRowStatus.NotStarted, ''),
	generateSubTask(19, 'Invalid Error Messages', '', ClientRowStatus.NotStarted, '')
];

export const EndToEndWalletValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: endToEndWalletSubTasks
};
