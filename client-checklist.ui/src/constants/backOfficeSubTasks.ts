import { ClientRowStatus } from '$enums/ClientRowStatus';

const backOfficeTasks = [
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

export default backOfficeTasks;
