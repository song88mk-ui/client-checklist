import { ClientRowStatus } from '$enums/ClientRowStatus';

const backOfficeSubTasks = [
	{
		subtaskName: 'Client Account Set Up',
		comment: 'Test #1',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
		subtaskName: 'Back Office User Account',
		comment: 'Test #1',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	}
];

const defaultValues = {
	assignedTo: '',
	targetDateCompleted: new Date().toISOString(),
	actualDateCompleted: new Date().toISOString()
};

export const backOfficeValues = {
	...defaultValues,
	clientSubTasks: backOfficeSubTasks
};
