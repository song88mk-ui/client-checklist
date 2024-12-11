import * as yup from 'yup';

export type LoginFormType = {
	username: string;
	password: string;
	rememberMe: boolean;
};

export default yup.object().shape({
	username: yup.string().required("Username is required."),
	password: yup.string().required("Password is required."),
	rememberMe: yup.boolean()
});
