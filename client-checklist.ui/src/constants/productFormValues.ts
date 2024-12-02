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

const defaultValues = {
	assignedTo: '',
	targetDateCompleted: '',
	actualDateCompleted: ''
};

export const backOfficeValues = {
	...defaultValues,
	clientSubTasks: backOfficeSubTasks
};
