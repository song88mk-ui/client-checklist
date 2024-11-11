import * as yup from 'yup';

export type LoginFormType = {
	username: string;
	password: string;
	rememberMe: boolean;
};

export default yup.object().shape({
	username: yup.string().required(),
	password: yup.string().required(),
	rememberMe: yup.boolean()
});
