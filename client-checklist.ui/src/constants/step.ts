import Step from "$enums/Step"

const Steps: { [key: number]: string } = {
  [Step.BackOffice]: 'BackOffice',
  [Step.WalletIntegration]: 'Wallet Integration',
  [Step.OddsfeedIntegration]: 'Oddsfeed Integration',
  [Step.SportsbookPlayerSite]: 'Sportsbook PlayerSite',
  [Step.ManagedTradingServices]: 'Managed Trading Services',
  [Step.EndToEndFunctionalPerformanceTest]: 'EndToEnd Functional Performance Test',
  [Step.Operations]: 'Operations',
  [Step.BusinessAcceptanceTest]: 'Business Acceptance Test',
  [Step.ClientLaunch]: 'Client Launch',
};

export default Steps;