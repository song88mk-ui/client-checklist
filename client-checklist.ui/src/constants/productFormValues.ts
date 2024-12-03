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
		subtaskName: 'Max Bet',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskName: 'Max Bet(Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskName: 'Max Payout',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskName: 'Max Payout(Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskName: 'Player CCF and Groupings',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskName: 'Player CCF and Groupings(Client)',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskName: 'Bet Validation',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
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
