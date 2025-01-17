export type ClientDto = {
	clientId: string,
	clientName: string,
	domain: string,
	targetLaunchDate: string,
	serviceTypeId: number,
	mainDecisionMaker: { name: string },
	taskStatus: number,
	clientToken: string,
	isActive: boolean
}

export type GetClientsResponseDto = {
	clients: ClientDto[]
}