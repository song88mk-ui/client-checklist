import { format } from 'date-fns'; 
import { ClientRowStatus } from '$enums/ClientRowStatus';
import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';

const backOfficeSubTasks: ClientSubTaskFormType[] = [
	{
		subtaskId: 1,
		subtaskName: 'Client Account Set Up',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 2,
		subtaskName: 'Back Office User Account',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	}
];

const oddsFeedIntegrationSubTasksStg: ClientSubTaskFormType[] = [
	{
		subtaskId: 1,
		subtaskName: 'Odds Feed',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 2,
		subtaskName: 'Odds Feed (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 3,
		subtaskName: 'Live Data',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 4,
		subtaskName: 'Live Data (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	}
];

const oddsFeedIntegrationSubTasksPrd: ClientSubTaskFormType[] = [
	{
		subtaskId: 1,
		subtaskName: 'Odds Feed',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 2,
		subtaskName: 'Odds Feed (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	}
];

const walletIntegrationSubTasks : ClientSubTaskFormType[] = [
	{
		subtaskId: 1,
		subtaskName: 'Authentication',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 2,
		subtaskName: 'Bet Placement',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 3,
		subtaskName: 'Bet Full Cashout',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 4,
		subtaskName: 'Bet Cancellation',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 5,
		subtaskName: 'Bet Settlement',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 6,
		subtaskName: 'Bet Resettlement',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
]

const sportsbookPlayerSiteSubTasks: ClientSubTaskFormType[] = [
    {  
        subtaskId: 1,
        subtaskName: 'Color Schemes / Themes',
        comment: '',
        taskStatusId: ClientRowStatus.NotStarted,
        assignedTo: ''
    },
    {
        subtaskId: 2,
        subtaskName: 'New Player Site Features',
        comment: '',
        taskStatusId: ClientRowStatus.NotStarted,
        assignedTo: ''
    }
]

const MTSSubTasks: ClientSubTaskFormType[] = [
	{
		subtaskId: 1,
		subtaskName: 'Limit ID Creation',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 2,
		subtaskName: 'Limit ID Creation(Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 3,
		subtaskName: 'Liability Settings',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 4,
		subtaskName: 'Liability Settings(Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 5,
		subtaskName: 'Bookmaker Settings',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 6,
		subtaskName: 'Bookmaker Settings(Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 7,
		subtaskName: 'CCF',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 8,
		subtaskName: 'CCF(Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 9,
		subtaskName: 'Tournament Hierachy',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 10,
		subtaskName: 'Tournament Hierachy(Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 11,
		subtaskName: 'Test Bets for reports',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 12,
		subtaskName: 'Test Bets for reports(Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
];

const endToEndTestSubTasks: ClientSubTaskFormType[] = [
        {
            subtaskId: 1,
            subtaskName: "Visiting the URL site",
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 2,
            subtaskName: 'Log in / Log out',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 3,
            subtaskName: 'Search Functionality',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 4,
            subtaskName: 'Bet Placement',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 5,
            subtaskName: 'Odds Format',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 6,
            subtaskName: 'Full and Partial Cashout',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 7,
            subtaskName: 'Settlement',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 8,
            subtaskName: 'Bet Slip / My Bets',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 9,
            subtaskName: 'Bet History',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 10,
            subtaskName: 'Supported Languges',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 11,
            subtaskName: 'Supported Currencies',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 12,
            subtaskName: 'Odds and Push Updates',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 13,
            subtaskName: 'My Favorites',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 14,
            subtaskName: 'LMT, Live Stream, Statistics, Results',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 15,
            subtaskName: 'Parlay Bonus',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 16,
            subtaskName: 'Bet Builder',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 17,
            subtaskName: 'Price Boosts',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 18,
            subtaskName: 'Happy Path Messages',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        },
        {
            subtaskId: 19,
            subtaskName: 'Invalid Error Messages',
            comment: '',
            taskStatusId: ClientRowStatus.NotStarted,
            assignedTo: ''
        }
]

const operationsSubTasks: ClientSubTaskFormType[] = [
	{
		subtaskId: 1,
		subtaskName: 'Back Office-Customer Training',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 2,
		subtaskName: 'External Provider Customer Support Set Up',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	}
];

const BASubTasks: ClientSubTaskFormType[] = [
	{
		subtaskId: 1,
		subtaskName: 'Visiting the URL site',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 2,
		subtaskName: 'Visiting the URL site (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 3,
		subtaskName: 'Log in/ Log out',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 4,
		subtaskName: 'Log in/ Log out (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 5,
		subtaskName: 'Search Functionality',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 6,
		subtaskName: 'Search Functionality (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 7,
		subtaskName: 'Bet Placement',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 8,
		subtaskName: 'Bet Placement (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 9,
		subtaskName: 'Odds Format',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 10,
		subtaskName: 'Odds Format (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 11,
		subtaskName: 'Full and Partial Cashout',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 12,
		subtaskName: 'Full and Partial Cashout (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 13,
		subtaskName: 'Settlement',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},	
	{
		subtaskId: 14,
		subtaskName: 'Settlement (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 15,
		subtaskName: 'Bet Slip / My Bets',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 16,
		subtaskName: 'Bet Slip / My Bets (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 17,
		subtaskName: 'Bet History',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 18,
		subtaskName: 'Bet History (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 19,
		subtaskName: 'Supported Languages',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 20,
		subtaskName: 'Supported Languages (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 21,
		subtaskName: 'Supported Currencies',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 22,
		subtaskName: 'Supported Currencies (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 23,
		subtaskName: 'Odds and Push Updates',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 24,
		subtaskName: 'Odds and Push Updates (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 25,
		subtaskName: 'My Favorites',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 26,
		subtaskName: 'My Favorites (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 27,
		subtaskName: 'LMT, Live Stream, Statistics, Results',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 28,
		subtaskName: 'LMT, Live Stream, Statistics, Results (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 29,
		subtaskName: 'Parlay Bonus',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 30,
		subtaskName: 'Parlay Bonus (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 31,
		subtaskName: 'Bet Builder',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 32,
		subtaskName: 'Bet Builder (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 33,
		subtaskName: 'Price Boosts',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 34,
		subtaskName: 'Price Boosts (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 35,
		subtaskName: 'Success and Info Messages',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 36,
		subtaskName: 'Success and Info Messages (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 37,
		subtaskName: 'Error Messages',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 38,
		subtaskName: 'Error Messages (Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
];

const clientLaunchSubTasks: ClientSubTaskFormType[] = [
	{
		subtaskId: 1,
		subtaskName: 'Client Launch',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
];


const defaultValues = {
	assignedTo: '',
	targetDateCompleted: null,
	actualDateCompleted: null
};

export const BackOfficeValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: backOfficeSubTasks 
};

export const OddsFeedIntegrationValuesStg: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: oddsFeedIntegrationSubTasksStg
};
export const OddsFeedIntegrationValuesPrd: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: oddsFeedIntegrationSubTasksPrd
};

export const WalletIntegrationValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: walletIntegrationSubTasks 
};


export const SportsbookPlayerSiteValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: sportsbookPlayerSiteSubTasks
};

export const MTSValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: MTSSubTasks
};

export const EndToEndTestValues: ClientTaskFormType = {
    ...defaultValues,
    clientSubTasks: endToEndTestSubTasks
}

export const OperationsValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: operationsSubTasks
};

export const BAValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: BASubTasks
};

export const ClientLaunchValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: clientLaunchSubTasks
};
