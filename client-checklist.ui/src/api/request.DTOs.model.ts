import type { Manager } from "./response.DTOs.model";

export type LoginFormDataType = {
	username: string;
	password: string;
};

export type LogoutFormDataType = {
	userToken: string;
};

export type DeleteClientFormDataType = {
	clientId: string;
};

export type CreateClientFormDataType = {
	clientName: string,
	currencies: string[],
	customerServiceManager: Manager,
	customerServiceManagerName: string,
	customerServiceManagerNumber: string,
	domain: string,
	financeManager: Manager,
 	financeManagerName: string,
	financeManagerNumber: string,
	languages: string[],
	launchDate: string,
	mainDecisionMaker: Manager,
	mainDecisionMakerName: string,
	mainDecisionMakerNumber: string,
	marketManager: Manager,
	marketManagerName: string,
	marketManagerNumber: string,
	markets: string[],
	productManager: Manager,
	productManagerName: string,
	productManagerNumber: string,
	serviceTypeId: number,
	sports: string[],
	sslCert: string,
	technicalManager: Manager,
	technicalManagerName: string,
	technicalManagerNumber: string
};
