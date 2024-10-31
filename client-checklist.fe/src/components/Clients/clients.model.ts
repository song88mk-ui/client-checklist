export interface RetrieveRequest {
    clientId: string
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


export interface BackOffice extends ChecklistSection<BackOfficeTask> { }

export interface BackOfficeTask {
    clientAccountSetup: Task,
    backOfficeAccountSetup: Task
}

export interface WalletIntegration extends ChecklistSection<WalletIntegrationTask> { }

export interface WalletIntegrationTask {
    authentication: Task
    betPlacement: Task
    betFullCashout: Task
    betCancellation: Task
    betSettlement: Task
    betResettlement: Task
}

export interface SportsbookSite extends ChecklistSection<SportsbookSiteTask> { }

export interface SportsbookSiteTask {
    theme: Task
    features: Task
    container: Task
}

export interface TradingServices extends ChecklistSection<TradingServicesTask> { }

export interface TradingServicesTask {
    maxBet: Task
    maxPayout: Task
    playerCcf: Task
    betValidation: Task
}

export interface EndToEndTesting extends ChecklistSection<EndToEndTestingTask> { }

export interface EndToEndTestingTask {
    pageLoad: Task
    logInLogOut: Task
    search: Task
    betPlacement: Task
    oddsFormat: Task
    fullPartialCashout: Task
    settlement: Task
    betslip: Task
    myBets: Task
    betHistory: Task
    languages: Task
    currencies: Task
    pushUpdates: Task
    myFavorites: Task
    statsAndStreaming: Task
    parlayBonus: Task
    betBuilder: Task
    priceBoosts: Task
    successAndInfoMessages: Task
    errorMessages: Task
}

export interface Operations extends ChecklistSection<OperationsTask> { }

export interface OperationsTask {
    boCustomerTraining: Task
    customerSupportSetup: Task
}
export interface BusinessAcceptanceTest extends ChecklistSection<EndToEndTestingTask> { }

export interface ClientLaunch extends ChecklistSection<ClientLaunchTask> { }

export interface ClientLaunchTask {
    clientLaunch: Task
}

export interface Task {
    comment: string
    status: number
}

export interface CreateRequest {
    clientInfo: ClientInformation
    backOffice: BackOffice
    wallet: WalletIntegration
    sportsbookSite: SportsbookSite
    tradingServices: TradingServices
    endToEndTesting: EndToEndTesting
    operations: Operations
    businessAcceptanceTest: BusinessAcceptanceTest
    clientLaunch: ClientLaunch
}
