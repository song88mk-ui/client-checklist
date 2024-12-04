import { ClientRowStatus } from '$enums/ClientRowStatus';

const backOfficeSubTasks = [
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

const MTSSubTasks = [
	{
		subtaskId: 1,
		subtaskName: 'Max Bet',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 2,
		subtaskName: 'Max Bet(Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 3,
		subtaskName: 'Max Payout',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 4,
		subtaskName: 'Max Payout(Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 5,
		subtaskName: 'Player CCF and Groupings',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 6,
		subtaskName: 'Player CCF and Groupings(Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 7,
		subtaskName: 'Bet Validation',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskId: 8,
		subtaskName: 'Bet Validation(Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
];

const operationsSubTasks = [
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


const defaultValues = {
	assignedTo: '',
	targetDateCompleted: '',
	actualDateCompleted: ''
};

export const backOfficeValues = {
	...defaultValues,
	clientSubTasks: backOfficeSubTasks
};


export const MTSValues = {
	...defaultValues,
	clientSubTasks: MTSSubTasks
};
export const operationsValues = {
	...defaultValues,
	clientSubTasks: operationsSubTasks
};
