import Environment from '$enums/Environment';
import * as yup from 'yup';

export type ClientSubTaskFormType = {
	subtaskId: number;
	subtaskName: string;
	comment: string;
	taskStatusId: number;
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
		taskStatusId: yup.number(),
		assignedTo: yup.string()
	})
);

const clientTaskFormSchema = yup.object().shape({
	assignedTo: yup.string().when('disabled', {
		is: false,
		then: (schema) => schema.min(1, 'Assigned to is required'),
		otherwise: (schema) => schema
	}),
	targetDateCompleted: yup.string(),
	actualDateCompleted: yup.string(),
	clientSubTasks: clientSubTaskFormSchema
});

const productFormSchema = yup.object().shape({
	[Environment.STAGING]: clientTaskFormSchema,
	[Environment.PRODUCTION]: clientTaskFormSchema
});

export default productFormSchema;
