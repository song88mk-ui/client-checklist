import IntegrationType from '$enums/integrationType';

const Step = {
	[IntegrationType.WALLET_INTEGRATION]: {
		ClientInformation: 0,
		BackOffice: 1,
		WalletIntegration: 2,
		SportsbookPlayerSite: 3,
		ManagedTradingServices: 4,
		Operations: 5,
		EndToEndFunctionalPerformanceTest: 6,
		BusinessAcceptanceTest: 7,
		ClientLaunch: 8
	},
	[IntegrationType.FEED_INTEGRATION]: {
		ClientInformation: 0,
		BackOffice: 1,
		OddsfeedIntegration: 2,
		ManagedTradingServices: 3,
		Operations: 4,
		EndToEndFunctionalPerformanceTest: 5,
		BusinessAcceptanceTest: 6,
		ClientLaunch: 7
	}
};

export default Step;
