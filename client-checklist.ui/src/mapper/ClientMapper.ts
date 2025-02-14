import type { ClientDto } from '$api/GetClients.DTO';
import services from '$constants/services';
import type { Client } from '$types/client';
import type { EditClientPayload, CreateClientPayload } from '$api/request.DTO.model';
import type { ClientInformationFormType } from '$lib/ClientInformationForm';
import IntegrationType from '$enums/integrationType';
import { servicesTypeId } from '$constants/services';

export const toClientViewModel = (client: ClientDto): Client => {
    return {
        id: client.clientId,
        companyName: client.clientName,
        domain: client.domain,
        targetLaunchDate: client.targetLaunchDate,
        services: services[client.serviceTypeId],
        mainDecisionMaker: client.mainDecisionMaker.name,
        status: client.taskStatus,
        clientToken: client.clientToken,
        isActive: client.isActive
    }
}

export const toCreateClientPayload = (selectedIntegration: IntegrationType, clientForm: ClientInformationFormType): CreateClientPayload => {
    const {
        languages,
        currencies,
        sports,
        markets,
        mainDecisionMakerName,
        mainDecisionMakerNumber,
        financeManagerName,
        financeManagerNumber,
        productManagerName,
        productManagerNumber,
        accountManagerName,
        accountManagerNumber,
        technicalManagerName,
        technicalManagerNumber,
        customerServiceManagerName,
        customerServiceManagerNumber,
        socialAccount,
    } = clientForm;

    const sportsList = sports.split(',').map(item => item.trim()).filter(item => item !== '');

    return {
        ...clientForm,
        serviceTypeId: servicesTypeId[selectedIntegration],
        languages: languages.split(','),
        currencies: currencies.split(','),
        sports: sportsList,
        markets: markets.split(','),
        mainDecisionMaker: { name: mainDecisionMakerName, number: mainDecisionMakerNumber },
        financeManager: { name: financeManagerName, number: financeManagerNumber },
        productManager: { name: productManagerName, number: productManagerNumber },
        accountManager: { name: accountManagerName, number: accountManagerNumber },
        technicalManager: { name: technicalManagerName, number: technicalManagerNumber },
        customerServiceManager: {
            name: customerServiceManagerName,
            number: customerServiceManagerNumber
        },
        socialAccount
    };
}

export const toEditClientPayload = (selectedIntegration: IntegrationType, clientForm: ClientInformationFormType): EditClientPayload => {
    return {
        ...toCreateClientPayload(selectedIntegration, clientForm),
        clientId: clientForm.clientId,
    } as EditClientPayload
}