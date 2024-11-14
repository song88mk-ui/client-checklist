import { ClientRowStatus } from '$enums/ClientRowStatus';

export type Client = {
	id: string;
	companyName: string;
	domain: string;
	targetLaunchDate: string;
	services: string;
	mainDecisionMaker: string;
	status: ClientRowStatus;
	clientToken: string;
};

export type Clients = Client[] | [];
