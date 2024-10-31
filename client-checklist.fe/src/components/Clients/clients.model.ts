export interface RetrieveRequest {
    clientId: string
}

export interface CreateRequest {
    clientInfo: ClientInformation
}

export interface ClientInformation {
    companyName: string
    domain: string
    sslCert: string
    servicesToProvide: string
    languages: string[]
    currencies: string[]
    launchDate: string
    decisionMaker: Manager
    financeManager: Manager
    productManager: Manager
    technicalManager: Manager
}

export interface Manager {
    name: string
    phoneNumber: string
}

export interface ChecklistSection<T> {
    assignedTo: string
    DateCompleted: {
        target: string
        actual: string
    }
    task: T[]
}

export interface BackOffice extends ChecklistSection<BackOfficeTask> { }

export interface BackOfficeTask {
    clientAccountSetup: Task,
    backOfficeAccountSetup: Task
}

export interface RiskManagementSystem {

}

export interface RiskManagementSystemTask {
    maxBet: Task
    maxPayout: Task
    playerCcf: Task
}

export interface Task {
    comment: string
    status: number
}

