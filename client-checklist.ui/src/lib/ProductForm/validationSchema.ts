import Environment from '$enums/Environment';
import * as yup from 'yup';

export type ClientSubTaskFormType = {
	subtaskId: number;
	subtaskName: string;
	comment: string;
	taskStatus: number;
	assignedTo: string;
};

export type ClientTaskFormType = {
	id?: string;
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
		subtaskId: yup.number(),
		subtaskName: yup.string(),
		comment: yup.string(),
		taskStatus: yup.number(),
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
