import type { APIGatewayType } from './models';
import Users from '$api/Users';
import Clients from '$api/Clients';
import Steps from '$api/Steps';

const APIGateway = (): APIGatewayType => {
	return {
		...Users,
		...Clients,
		...Steps,
	};
};

export default APIGateway;
