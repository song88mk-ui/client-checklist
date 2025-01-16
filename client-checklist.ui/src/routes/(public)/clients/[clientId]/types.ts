export type ClientSubtask = {
    subtaskId: number;
    subtaskName: string
    comment: string;
    taskStatus: number
    assignedTo: number;
};

export type ClientStep = {
    clientTaskId: number;
    clientId: string;
    step: number;
    stepName: string;
    serviceTypeId: number;
    targetDateCompleted: string;
    actualDateCompleted:string;
    assignedTo: string;
    sortOrder: number;
    environment: number;
    clientSubtasks: ClientSubtask[],
    isExpanded: boolean;
}

export type Manager = {
    Name: string;
    Number: string;
}
export type ClientInformation = {
    clientId: string;
    clientName: string;
    currencies: string[];
    customerServiceManager: Manager;
    domain: string;
    financeManager: Manager;
    languages:string[];
    mainDecisionMaker: Manager;
    productManager: Manager
    serviceTypeId: number;
    sslCertificate: string;
    targetLaunchDate: string;
    taskStatusId: number;
    technicalManager: Manager
    clientSteps: ClientStep[];
};

export type ClientProgressStatus = {
    notStarted: number;
    inProgress:number;
    completed:number;
}