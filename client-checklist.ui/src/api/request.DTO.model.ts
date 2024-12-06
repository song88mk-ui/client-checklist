import type { Manager } from "./response.DTO.model";

export type LoginPayload = {
    username: string;
    password: string;
};

export type LogoutPayload = {
    userToken: string;
};

export enum ClientActiveStatus {
    Inactive,
    Active
}

export type ClientStatusPayload = {
    clientId: string;
    statusId: ClientActiveStatus
};

export type CreateClientPayload = {
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
    accountManager: Manager,
    accountManagerName: string,
    accountManagerNumber: string,
    markets: string[],
    productManager: Manager,
    productManagerName: string,
    productManagerNumber: string,
    serviceTypeId: number,
    sports: string[],
    sslCert: string,
    technicalManager: Manager,
    technicalManagerName: string,
    technicalManagerNumber: string,
    socialAccount: string
};

export type ClientSubtask = {
    assignedTo: string;
    comment: string;
    subtaskId: number;
    subtaskName: string;
    taskStatusId: number;
}

export type CreateProductPayload = {
    actualDateCompleted: string;
    assignedTo: string;
    clientId: string;
    clientSubTasks: ClientSubtask[];
    environment: number;
    serviceTypeId: number;
    sortOrder: number;
    stepId: number;
    stepName: string;
    targetDateCompleted: string;
}

export type EditProductPayload = {
	id: string;
	stepName: string;
	targetDateCompleted: string;
	actualDateCompleted: string;
	assignedTo: string;
	clientSubTasks: ClientSubtask[];
};
