import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import { defaultValues, generateSubTask } from '$constants/commonValues';
import { ClientRowStatus } from '$enums/ClientRowStatus';

const businessAcceptanceWalletSubTasks: ClientSubTaskFormType[] = [
    generateSubTask(1, 'Visiting the URL site', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(2, 'Visiting the URL site (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(3, 'Log in/ Log out', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(4, 'Log in/ Log out (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(5, 'Search Functionality', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(6, 'Search Functionality (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(7, 'Bet Placement', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(8, 'Bet Placement (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(9, 'Odds Format', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(10, 'Odds Format (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(11, 'Full and Partial Cashout', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(12, 'Full and Partial Cashout (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(13, 'Settlement', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(14, 'Settlement (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(15, 'Bet Slip / My Bets', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(16, 'Bet Slip / My Bets (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(17, 'Bet History', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(18, 'Bet History (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(19, 'Supported Languages', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(20, 'Supported Languages (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(21, 'Supported Currencies', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(22, 'Supported Currencies (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(23, 'Odds and Push Updates', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(24, 'Odds and Push Updates (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(25, 'My Favorites', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(26, 'My Favorites (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(27, 'LMT, Live Stream, Statistics, Results', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(28, 'LMT, Live Stream, Statistics, Results (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(29, 'Parlay Bonus', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(30, 'Parlay Bonus (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(31, 'Bet Builder', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(32, 'Bet Builder (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(33, 'Price Boosts', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(34, 'Price Boosts (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(35, 'Success and Info Messages', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(36, 'Success and Info Messages (Client)', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(37, 'Error Messages', '', ClientRowStatus.NotStarted, ''),
    generateSubTask(38, 'Error Messages (Client)', '', ClientRowStatus.NotStarted, ''),
];

export const BusinessAcceptanceWalletValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: businessAcceptanceWalletSubTasks
};
