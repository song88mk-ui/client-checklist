import IntegrationType from '$enums/integrationType';
import Services from '$enums/Services';

const services: { [key: number]: string } = {
	[Services.ODDS_FEED_AND_LIVE_DATA_INTEGRATION]: 'Odds Feed and Live Data Integration',
	[Services.SPORTBOOK_AND_WALLET_INTEGRATION]: 'Sportsbook and Wallet Integration'
};

export const servicesTypeId: { [key: string]: Services } = {
	[IntegrationType.WALLET_INTEGRATION]: Services.SPORTBOOK_AND_WALLET_INTEGRATION,
	[IntegrationType.FEED_INTEGRATION]: Services.ODDS_FEED_AND_LIVE_DATA_INTEGRATION
};

export const servicesType: { [key: number]: IntegrationType } = {
	[Services.ODDS_FEED_AND_LIVE_DATA_INTEGRATION]: IntegrationType.WALLET_INTEGRATION,
	[Services.SPORTBOOK_AND_WALLET_INTEGRATION]: IntegrationType.FEED_INTEGRATION
};

export default services;
