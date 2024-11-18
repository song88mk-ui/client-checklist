export type SubTask = {
    subtaskId: number;
    subtaskName: string
    comment: string;
    taskStatusId: number
    assignedTo: number;
};

export type ClientTask = {
    clientTaskId: number;
    clientId: string;
    stepId: number;
    stepName: string;
    serviceTypeId: number;
    targetDateCompleted: string;
    actualDateCompleted:string;
    assignedTo: string;
    sortOrder: number;
    environment: number;
    subTasks: SubTask[]
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
    taskStatus: number;
    technicalManager: Manager
    clientTasks: ClientTask[];
};

export type ClientProgressStatus = {
    notStarted: number;
    inProgress:number;
    completed:number;
}