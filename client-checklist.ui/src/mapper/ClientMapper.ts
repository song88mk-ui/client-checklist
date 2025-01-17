import type { ClientDto } from '$api/GetClients.DTO';
import services from '$constants/services';

export const toClientViewModel = (client: ClientDto) => {
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