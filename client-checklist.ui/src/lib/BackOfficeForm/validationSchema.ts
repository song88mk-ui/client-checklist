import * as yup from 'yup';

export type SubTaskType = {
	subtaskName: string;
	comment: string;
	taskStatusId: number;
	assignedTo: string;
};

export type BackOfficeFormType = {
	assignedTo: string;
	targetDateCompleted: string;
	actualDateCompleted: string;
	clientSubTasks: SubTaskType[];
};

function getMinDate() {
	return new Date(2000, 1, 1);
}

export default yup.object().shape({
	assignedTo: yup.string().min(1).required('Assigned to is required'),
	targetDateCompleted: yup
		.date()
		.min(getMinDate(), `Min date is ${getMinDate()}`)
		.max(yup.ref('actualDateCompleted'), 'Must be earlier than the actual date'),
	actualDateCompleted: yup
		.date()
		.min(yup.ref('targetDateCompleted'), 'Must be later than target date'),
	clientSubTasks: yup.array().of(
		yup.object().shape({
			subtaskName: yup.string().required(),
			comment: yup.string().required(),
			taskStatusId: yup.number().required(),
			assignedTo: yup.string()
		})
	)
});
