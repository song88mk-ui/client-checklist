import Services from "$enums/Services"

const services: { [key: number]: string } = {
  [Services.LIVE_DATA_INTEGRATION]: 'Sportbook and Wallet Integration',
  [Services.ODDS_FEED_AND_LIVE_DATA_INTEGRATION]: 'Odds Feed and Live Data Integration',
  [Services.OODS_FEED_INTEGRATION]: 'Odds Feed Integration',
  [Services.SPORTBOOK_AND_WALLET_INTEGRATION]:'Live Data Integration',
};

export default services;