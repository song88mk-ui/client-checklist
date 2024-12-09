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
	launchDate: string;
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
};

export default yup.object().shape({
	clientName: yup.string().required(),
	domain: yup.string(),
	sslCert: yup.string(),
	languages: yup.string().required(),
	currencies: yup.string().required(),
	sports: yup.string().required(),
	markets: yup.string().required(),
	launchDate: yup.string(),
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
	socialAccount: yup.string().required()
});
