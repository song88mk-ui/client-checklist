import { ClientRowStatus } from '$enums/ClientRowStatus';

const backOfficeSubTasks = [
	{
		subtaskName: 'Client Account Set Up',
		comment: '',
		taskStatusId: ClientRowStatus.NotStarted,
		assignedTo: ''
	},
	{
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
