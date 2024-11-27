import Environment from '$enums/Environment';
import * as yup from 'yup';

export type ClientSubTaskFormType = {
	subtaskName: string;
	comment: string;
	taskStatusId: number;
	assignedTo: string;
};

export type ClientTaskFormType = {
	assignedTo: string;
	targetDateCompleted: string;
	actualDateCompleted: string;
	clientSubTasks: ClientSubTaskFormType[];
};

export type ProductFormType = {
	[Environment.STAGING]: ClientTaskFormType;
	[Environment.PRODUCTION]: ClientTaskFormType;
};

const clientSubTaskFormSchema = yup.array().of(
	yup.object().shape({
		subtaskName: yup.string(),
		comment: yup.string(),
		taskStatusId: yup.number(),
		assignedTo: yup.string()
	})
);

const clientTaskFormSchema = yup.object().shape({
	assignedTo: yup.string().min(1, 'Assigned to is required'),
	targetDateCompleted: yup.string(),
	actualDateCompleted: yup.string(),
	clientSubTasks: clientSubTaskFormSchema
});

const productFormSchema = yup.object().shape({
	[Environment.STAGING]: clientTaskFormSchema,
	[Environment.PRODUCTION]: clientTaskFormSchema
});

export default productFormSchema;
