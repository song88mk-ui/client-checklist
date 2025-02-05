import { describe, it, expect } from 'vitest';
import getOverallStatus from './getOverallStatus';
import type Step from '$types/step';
import type { ClientInformationFormType } from '$lib/ClientInformationForm';

describe('getOverallStatus', () => {
	it('returns NotStarted', () => {
		const steps: Step[] = [
			{
				title: 'Contact Information',
				status: 1,
				stepId: 0,
				formData: {
					clientId: '77e0bc07-040c-43c7-9705-08dd4405faab',
					clientName: '6123',
					domain: '',
					launchDate: null,
					languages: 'eng',
					currencies: 'eur',
					sports: 'soccer',
					markets: 'asian',
					mainDecisionMakerName: '',
					mainDecisionMakerNumber: '',
					financeManagerName: '',
					financeManagerNumber: '',
					productManagerName: '',
					productManagerNumber: '',
					accountManagerName: '',
					accountManagerNumber: '',
					technicalManagerName: '',
					technicalManagerNumber: '',
					customerServiceManagerName: '',
					customerServiceManagerNumber: '',
					socialAccount: '60'
				} as ClientInformationFormType
			},
			{
				title: 'Back Office',
				status: 2,
				stepId: 1,
				formData: {
					staging: {
						id: '19',
						assignedTo: 'Front End Development Team',
						targetDateCompleted: null,
						actualDateCompleted: null,
						clientSubTasks: [
							{
								assignedTo: '',
								subtaskId: 1,
								subtaskName: 'Client Account Set Up',
								comment: '',
								taskStatusId: 1
							},
							{
								assignedTo: '',
								subtaskId: 2,
								subtaskName: 'Back Office User Account',
								comment: '',
								taskStatusId: 1
							}
						]
					},
					production: {
						id: '18',
						assignedTo: 'QA',
						targetDateCompleted: null,
						actualDateCompleted: null,
						clientSubTasks: [
							{
								assignedTo: '',
								subtaskId: 1,
								subtaskName: 'Client Account Set Up',
								comment: '',
								taskStatusId: 1
							},
							{
								assignedTo: '',
								subtaskId: 2,
								subtaskName: 'Back Office User Account',
								comment: '',
								taskStatusId: 1
							}
						]
					}
				}
			},
			{
				title: 'Wallet Integration',
				status: 2,
				stepId: 2,
				formData: {
					staging: {
						id: '22',
						assignedTo: 'Front End Development Team',
						targetDateCompleted: null,
						actualDateCompleted: null,
						clientSubTasks: [
							{
								assignedTo: '',
								subtaskId: 1,
								subtaskName: 'Authentication',
								comment: '',
								taskStatusId: 1
							},
							{
								assignedTo: '',
								subtaskId: 2,
								subtaskName: 'Bet Placement',
								comment: '',
								taskStatusId: 1
							}
						]
					},
					production: {
						id: '23',
						assignedTo: 'QA',
						targetDateCompleted: null,
						actualDateCompleted: null,
						clientSubTasks: [
							{
								assignedTo: '',
								subtaskId: 1,
								subtaskName: 'Authentication',
								comment: '',
								taskStatusId: 1
							},
							{
								assignedTo: '',
								subtaskId: 2,
								subtaskName: 'Bet Placement',
								comment: '',
								taskStatusId: 1
							}
						]
					}
				}
			}
		];
		expect(getOverallStatus(steps)).toBe(1);
	});

	it('returns InProgress', () => {
		const steps: Step[] = [
			{
				title: 'Contact Information',
				status: 1,
				stepId: 0,
				formData: {
					clientId: '77e0bc07-040c-43c7-9705-08dd4405faab',
					clientName: '6123',
					domain: '',
					launchDate: null,
					languages: 'eng',
					currencies: 'eur',
					sports: 'soccer',
					markets: 'asian',
					mainDecisionMakerName: '',
					mainDecisionMakerNumber: '',
					financeManagerName: '',
					financeManagerNumber: '',
					productManagerName: '',
					productManagerNumber: '',
					accountManagerName: '',
					accountManagerNumber: '',
					technicalManagerName: '',
					technicalManagerNumber: '',
					customerServiceManagerName: '',
					customerServiceManagerNumber: '',
					socialAccount: '60'
				} as ClientInformationFormType
			},
			{
				title: 'Back Office',
				status: 2,
				stepId: 1,
				formData: {
					staging: {
						id: '19',
						assignedTo: 'Front End Development Team',
						targetDateCompleted: null,
						actualDateCompleted: null,
						clientSubTasks: [
							{
								assignedTo: '',
								subtaskId: 1,
								subtaskName: 'Client Account Set Up',
								comment: '',
								taskStatusId: 1
							},
							{
								assignedTo: '',
								subtaskId: 2,
								subtaskName: 'Back Office User Account',
								comment: '',
								taskStatusId: 1
							}
						]
					},
					production: {
						id: '18',
						assignedTo: 'QA',
						targetDateCompleted: null,
						actualDateCompleted: null,
						clientSubTasks: [
							{
								assignedTo: '',
								subtaskId: 1,
								subtaskName: 'Client Account Set Up',
								comment: '',
								taskStatusId: 1
							},
							{
								assignedTo: '',
								subtaskId: 2,
								subtaskName: 'Back Office User Account',
								comment: '',
								taskStatusId: 1
							}
						]
					}
				}
			},
			{
				title: 'Wallet Integration',
				status: 2,
				stepId: 2,
				formData: {
					staging: {
						id: '22',
						assignedTo: 'Front End Development Team',
						targetDateCompleted: null,
						actualDateCompleted: null,
						clientSubTasks: [
							{
								assignedTo: '',
								subtaskId: 1,
								subtaskName: 'Authentication',
								comment: '',
								taskStatusId: 2
							},
							{
								assignedTo: '',
								subtaskId: 2,
								subtaskName: 'Bet Placement',
								comment: '',
								taskStatusId: 1
							}
						]
					},
					production: {
						id: '23',
						assignedTo: 'QA',
						targetDateCompleted: null,
						actualDateCompleted: null,
						clientSubTasks: [
							{
								assignedTo: '',
								subtaskId: 1,
								subtaskName: 'Authentication',
								comment: '',
								taskStatusId: 1
							},
							{
								assignedTo: '',
								subtaskId: 2,
								subtaskName: 'Bet Placement',
								comment: '',
								taskStatusId: 1
							}
						]
					}
				}
			}
		];
		expect(getOverallStatus(steps)).toBe(2);
	});

	it('returns Completed', () => {
		const steps: Step[] = [
			{
				title: 'Contact Information',
				status: 1,
				stepId: 0,
				formData: {
					clientId: '77e0bc07-040c-43c7-9705-08dd4405faab',
					clientName: '6123',
					domain: '',
					launchDate: null,
					languages: 'eng',
					currencies: 'eur',
					sports: 'soccer',
					markets: 'asian',
					mainDecisionMakerName: '',
					mainDecisionMakerNumber: '',
					financeManagerName: '',
					financeManagerNumber: '',
					productManagerName: '',
					productManagerNumber: '',
					accountManagerName: '',
					accountManagerNumber: '',
					technicalManagerName: '',
					technicalManagerNumber: '',
					customerServiceManagerName: '',
					customerServiceManagerNumber: '',
					socialAccount: '60'
				} as ClientInformationFormType
			},
			{
				title: 'Back Office',
				status: 2,
				stepId: 1,
				formData: {
					staging: {
						id: '19',
						assignedTo: 'Front End Development Team',
						targetDateCompleted: null,
						actualDateCompleted: null,
						clientSubTasks: [
							{
								assignedTo: '',
								subtaskId: 1,
								subtaskName: 'Client Account Set Up',
								comment: '',
								taskStatusId: 3
							},
							{
								assignedTo: '',
								subtaskId: 2,
								subtaskName: 'Back Office User Account',
								comment: '',
								taskStatusId: 3
							}
						]
					},
					production: {
						id: '18',
						assignedTo: 'QA',
						targetDateCompleted: null,
						actualDateCompleted: null,
						clientSubTasks: [
							{
								assignedTo: '',
								subtaskId: 1,
								subtaskName: 'Client Account Set Up',
								comment: '',
								taskStatusId: 3
							},
							{
								assignedTo: '',
								subtaskId: 2,
								subtaskName: 'Back Office User Account',
								comment: '',
								taskStatusId: 3
							}
						]
					}
				}
			},
			{
				title: 'Wallet Integration',
				status: 2,
				stepId: 2,
				formData: {
					staging: {
						id: '22',
						assignedTo: 'Front End Development Team',
						targetDateCompleted: null,
						actualDateCompleted: null,
						clientSubTasks: [
							{
								assignedTo: '',
								subtaskId: 1,
								subtaskName: 'Authentication',
								comment: '',
								taskStatusId: 3
							},
							{
								assignedTo: '',
								subtaskId: 2,
								subtaskName: 'Bet Placement',
								comment: '',
								taskStatusId: 3
							}
						]
					},
					production: {
						id: '23',
						assignedTo: 'QA',
						targetDateCompleted: null,
						actualDateCompleted: null,
						clientSubTasks: [
							{
								assignedTo: '',
								subtaskId: 1,
								subtaskName: 'Authentication',
								comment: '',
								taskStatusId: 3
							},
							{
								assignedTo: '',
								subtaskId: 2,
								subtaskName: 'Bet Placement',
								comment: '',
								taskStatusId: 3
							}
						]
					}
				}
			}
		];
		expect(getOverallStatus(steps)).toBe(3);
	});
});
