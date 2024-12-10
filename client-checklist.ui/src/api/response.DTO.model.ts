import type Role from '$enums/role';
import type { ClientSubtask } from './request.DTO.model';
import type Services from '$enums/Services';

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
	accountManager: Manager;
	socialAccount: string;
};

export type FetchClientsResponse = {
	clients: ClientFetch[];
};

export type ClientStatusResponse = null;

export type CreateClientResponse = string;

export type ClientStep = {
	clientStepId: number;
	clientId: string;
	stepId: number;
	stepName: string;
	serviceTypeId: Services;
	environment: number;
	targetDateCompleted: string;
	actualDateCompleted: string;
	assignedTo: string;
	sortOrder: number;
	clientSubtasks: ClientSubtask[];
};

export type GetClientTaskStatusResponse = {
	client: ClientFetch;
	clientSteps: ClientStep[];
};

export type CreateProductResponse = {
	id: string;
};

export type EditProductResponse = {
	id: string;
};
