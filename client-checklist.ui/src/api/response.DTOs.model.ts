import type Role from '$enums/role';

export type LoginAPIResponse = {
	data: { userToken: string; roleName: Role; accessType: number };
};

export type LogoutAPIResponse = {
	data: null;
};

export type Manager = {
    Name: string
    Number: number
}

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
}

export type FetchClientsResponse = {
    data: {
        clients: ClientFetch[];
    }
}

export type DeleteClientResponse = {
    data: null;
}
