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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	targetDateCompleted: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	actualDateCompleted: any;
	clientSubTasks: ClientSubTaskFormType[];
};

export type ProductFormType = {
	[key: string]: ClientTaskFormType;
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

const clientTaskFormSchema = yup
	.object()
	.shape({
		assignedTo: yup.string().when('disabled', {
			is: false,
			then: (schema) => schema.min(1, 'Assigned to is required'),
			otherwise: (schema) => schema
		}),
		targetDateCompleted: yup.mixed().nullable(),
		actualDateCompleted: yup.mixed().nullable(),
		clientSubTasks: clientSubTaskFormSchema
	})
	.nullable()
	.notRequired();

export const validationSchema = yup.object().shape({
	[Environment.STAGING]: clientTaskFormSchema,
	[Environment.PRODUCTION]: clientTaskFormSchema
});

export const validationProdSchema = yup.object().shape({
	[Environment.PRODUCTION]: clientTaskFormSchema
});

