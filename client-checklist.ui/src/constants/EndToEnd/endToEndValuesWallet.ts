import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const endToEndWalletSubTasks: ClientSubTaskFormType[] = [
	generateSubTask(1, 'Visiting the URL site'),
	generateSubTask(2, 'Log in / Log out'),
	generateSubTask(3, 'Search Functionality'),
	generateSubTask(4, 'Bet Placement'),
	generateSubTask(5, 'Odds Format'),
	generateSubTask(6, 'Full and Partial Cashout'),
	generateSubTask(7, 'Settlement'),
	generateSubTask(8, 'Bet Slip / My Bets'),
	generateSubTask(9, 'Bet History'),
	generateSubTask(10, 'Supported Languges'),
	generateSubTask(11, 'Supported Currencies'),
	generateSubTask(12, 'Odds and Push Updates'),
	generateSubTask(13, 'My Favorites'),
	generateSubTask(14, 'LMT, Live Stream, Statistics, Results'),
	generateSubTask(15, 'Parlay Bonus'),
	generateSubTask(16, 'Bet Builder'),
	generateSubTask(17, 'Price Boosts'),
	generateSubTask(18, 'Happy Path Messages'),
	generateSubTask(19, 'Invalid Error Messages')
];

export const EndToEndWalletValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: endToEndWalletSubTasks
};
