import * as yup from 'yup';

export type ClientInformationFormType = {
	clientId?: string;
	clientName: string;
	domain: string;
	sslCert: string;
	languages: string;
	currencies: string;
	sports: string;
	markets: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
	launchDate: any;
	mainDecisionMakerName: string;
	mainDecisionMakerNumber: string;
	financeManagerName: string;
	financeManagerNumber: string;
	productManagerName: string;
	productManagerNumber: string;
	accountManagerName: string;
	accountManagerNumber: string;
	technicalManagerName: string;
	technicalManagerNumber: string;
	customerServiceManagerName: string;
	customerServiceManagerNumber: string;
	socialAccount: string;
	taskStatus: number;
};

export default yup.object().shape({
	clientName: yup.string().required("Client name is required."),
	domain: yup.string(),
	sslCert: yup.string(),
	languages: yup.string().required("Languages must at least have one value."),
	currencies: yup.string().required("Currencies must at least have one value."),
	sports: yup.string().required("Sports must at least have one value."),
	markets: yup.string().required("Markets must at least have one value."),
	launchDate: yup.mixed().nullable(),
	mainDecisionMakerName: yup.string(),
	mainDecisionMakerNumber: yup.string(),
	financeManagerName: yup.string(),
	financeManagerNumber: yup.string(),
	productManagerName: yup.string(),
	productManagerNumber: yup.string(),
	accountManagerName: yup.string(),
	accountManagerNumber: yup.string(),
	technicalManagerName: yup.string(),
	technicalManagerNumber: yup.string(),
	customerServiceManagerName: yup.string(),
	customerServiceManagerNumber: yup.string(),
	socialAccount: yup.string().required("Social account is required.")
});
