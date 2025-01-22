import { ClientRowStatus } from '$enums/ClientRowStatus';

export const generateSubTask = (
	subtaskId: number,
	subtaskName: string,
) => ({
	subtaskId,
	subtaskName,
	comment: '',
	taskStatusId: ClientRowStatus.NotStarted,
	assignedTo: ''
});

export const defaultValues = {
	assignedTo: '',
	targetDateCompleted: null,
	actualDateCompleted: null
};