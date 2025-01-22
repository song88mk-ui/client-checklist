import { ClientRowStatus } from '$enums/ClientRowStatus';

export const generateSubTask = (
	subtaskId: number,
	subtaskName: string,
	comment: string,
	taskStatusId: ClientRowStatus,
	assignedTo: string
) => ({
	subtaskId,
	subtaskName,
	comment,
	taskStatusId,
	assignedTo
});

export const defaultValues = {
	assignedTo: '',
	targetDateCompleted: null,
	actualDateCompleted: null
};