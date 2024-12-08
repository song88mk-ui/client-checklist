import type Role from '$enums/role';

export type LoginAPIResponse = {
	userToken: string;
	roleName: Role;
	accessType: number;
};

export type LogoutAPIResponse = null;

export type Manager = {
	name: string;
	number: string;
};

export type ClientFetch = {
	clientId: string;
	clientName: string;
	clientToken: string;
	currencies: string[];
	customerServiceManager: Manager;
	domain: string;
	financeManager: Manager;
	isActive: boolean;
	languages: string[];
	mainDecisionMaker: Manager;
	markets: string[];
	productManager: Manager;
	serviceTypeId: number;
	sports: string[];
	sslCertificate: string;
	targetLaunchDate: string;
	taskStatus: number;
	technicalManager: Manager;
};

export type FetchClientsResponse = {
	clients: ClientFetch[];
};

export type ClientStatusResponse = null;

export type CreateClientResponse = string;

export type GetClientTaskStatusResponse = {
	client: ClientFetch[];
	clientSteps: unknown[];
};

export type CreateProductResponse = {
	id: string;
};

export type EditProductResponse = {
	id: string;
};