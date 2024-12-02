export type CreateClientRequest = {
    ClientName: string
    Domain: string
    SSLCert: string
    ServiceTypeId: number
    Languages: string[]
    Currencies: string[]
    Sports: string[]
    Markets: string[]
    LaunchDate: string
    MainDecisionMaker: Manager
    FinanceManager: Manager
    ProductManager: Manager
    MarketManager: Manager
    TechnicalManager: Manager
    CustomerServiceManager: Manager
}


export type Manager = {
    Name: string
    Number: number
}