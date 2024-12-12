<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import APIGateway from '$api/APIGateway';
	import auth from '$stores/auth';
	import DateInput from '../DateInput.svelte';
	import selectedIntegration from '$stores/integration';
	import Product from '../../utils/client';
	import { StatusCode } from '$api/models';
	import { goto } from '$app/navigation';
	import { LocalStorage } from '../storage';
	import steps from '$stores/steps';
	import Step from '$enums/Step';
	import { servicesTypeId } from '$constants/services';
	import validationSchema, { type ClientInformationFormType } from './validationSchema';

	const { createClient } = APIGateway();
	let { next } = $props();
	let isLoading = $state(false);

	let initialValues = {
		clientName: '',
		domain: '',
		sslCert: '',
		languages: '',
		currencies: '',
		sports: '',
		markets: '',
		launchDate: new Date().toISOString(),
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
		socialAccount: ''
	};

	$effect(() => {
		if ($steps[Step.ClientInformation]?.formData) {
			updateInitialValues($steps[Step.ClientInformation]?.formData as ClientInformationFormType);
		} else {
			updateInitialValues(initialValues);
		}
	})

	const { form, handleSubmit, errors, updateField, updateInitialValues } = createForm({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			isLoading = true;
			const {
				clientName,
				domain,
				sslCert,
				languages,
				currencies,
				sports,
				markets,
				launchDate,
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
				socialAccount
			} = values;

			const formData = {
				...values,
				serviceTypeId: servicesTypeId[$selectedIntegration],
				languages: languages.split(' '),
				currencies: currencies.split(' '),
				sports: sports.split(' '),
				markets: markets.split(' '),
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

			const response: any = await createClient(formData, {
				'x-user-token': $auth?.userToken as string
			});
			isLoading = false;

			if (response.statusCode === StatusCode.Success) {
				$steps[Step.ClientInformation].formData = {
					clientId: response.data,
					...values
				};
				next();
			}

			if ((response.error as any)?.statusCode === StatusCode.UnAuthorized) {
				$auth = null;
				LocalStorage.removeValue('userToken');
				LocalStorage.removeValue('accessType');
				LocalStorage.removeValue('username');
				goto('/login');
				return;
			}
		}
	});

	const handleSelectDate = (selectedDate: Date) => {
		updateField('launchDate', selectedDate.toISOString());
	};
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-7">
	<div class="flex flex flex-col flex-col gap-5 divide-y rounded-md border bg-white px-6 py-[30px]">
		<div class="flex flex-col gap-5">
			<h2 class="text-lg font-bold italic">Client information</h2>
			<div class="flex gap-3">
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="companyName">
						Company Name
						<span class="text-red-500 font-bold">*</span>
					</label>
					<input
						class="w-full rounded border px-3 py-2 text-sm text-gray-700"
						id="clientName"
						type="text"
						placeholder="Enter Company Name"
						bind:value={$form.clientName}
					/>
					{#if $errors.clientName}
						<small class="text-xs font-bold text-red-500 font-bold">{$errors.clientName}</small>
					{/if}
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="domain">
						Domain
					</label>
					<input
						class="w-full rounded border px-3 py-2 text-sm text-gray-700"
						id="domain"
						type="text"
						placeholder="Enter Domain"
						bind:value={$form.domain}
					/>
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="sslCertificate">
						SSL Certificate (s)
					</label>
					<input
						class="w-full rounded border px-3 py-2 text-sm text-gray-700"
						id="sslCertificate"
						type="text"
						placeholder="Enter SSL Certificate (s)"
						bind:value={$form.sslCert}
					/>
				</div>
			</div>
			<div class="flex gap-3">
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="servicesToProvide">
						Services to Provide
					</label>
					<div class="w-full rounded border px-3 py-2 text-sm text-gray-700">
						{Product[$selectedIntegration]}
					</div>
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="targetLaunchDate">
						Target Launch Date
					</label>
					<DateInput
						value={new Date($form.launchDate).toISOString()}
						onSelectDate={(selectedDate) => handleSelectDate(selectedDate)}
					/>
				</div>
			</div>
			<div class="flex gap-3">
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="languagesSupported">
						Languages Supported <span class="text-red-500 font-bold">*</span>
					</label>
					<input
						class="w-full rounded border px-3 py-2 text-sm text-gray-700"
						id="languagesSupported"
						type="text"
						placeholder="Enter Languages Supported"
						bind:value={$form.languages}
					/>
					{#if $errors.languages}
						<small class="text-xs font-bold text-red-500 font-bold">{$errors.languages}</small>
					{/if}
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="currencySupported">
						Currencies Supported <span class="text-red-500 font-bold">*</span>
					</label>
					<input
						class="w-full rounded border px-3 py-2 text-sm text-gray-700"
						id="currencySupported"
						type="text"
						placeholder="Enter Currencies Supported"
						bind:value={$form.currencies}
					/>
					{#if $errors.currencies}
						<small class="text-xs font-bold text-red-500 font-bold">{$errors.currencies}</small>
					{/if}
				</div>
			</div>
			<div class="flex gap-3">
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="sports">
						Sports <span class="text-red-500 font-bold">*</span>
					</label>
					<input
						class="w-full rounded border px-3 py-2 text-sm text-gray-700"
						id="sports"
						type="text"
						placeholder="Enter Sports"
						bind:value={$form.sports}
					/>
					{#if $errors.sports}
						<small class="text-xs font-bold text-red-500 font-bold">{$errors.sports}</small>
					{/if}
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="targetMarket">
						Target Market <span class="text-red-500 font-bold">*</span>
					</label>
					<input
						class="w-full rounded border px-3 py-2 text-sm text-gray-700"
						id="targetMarket"
						type="text"
						placeholder="Enter Target Market"
						bind:value={$form.markets}
					/>
					{#if $errors.markets}
						<small class="text-xs font-bold text-red-500 font-bold">{$errors.markets}</small>
					{/if}
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-5">
			<h2 class="mt-5 text-lg font-bold italic">Contact information</h2>
			<div class="flex gap-3">
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="companyName">
						Main Decision Maker
					</label>
					<div class="flex gap-3">
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="mainDecisionMakerName"
							type="text"
							placeholder="Enter Name"
							bind:value={$form.mainDecisionMakerName}
						/>
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="mainDecisionMakerNumber"
							type="text"
							placeholder="Enter Number"
							bind:value={$form.mainDecisionMakerNumber}
						/>
					</div>
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="companyName">
						Finance Manager
					</label>
					<div class="flex gap-3">
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="financeManagerName"
							type="text"
							placeholder="Enter Name"
							bind:value={$form.financeManagerName}
						/>
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="financeManagerNumber"
							type="text"
							placeholder="Enter Number"
							bind:value={$form.financeManagerNumber}
						/>
					</div>
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="companyName">
						Product Manager
					</label>
					<div class="flex gap-3">
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="productManagerName"
							type="text"
							placeholder="Enter Name"
							bind:value={$form.productManagerName}
						/>
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="productManagerNumber"
							type="text"
							placeholder="Enter Number"
							bind:value={$form.productManagerNumber}
						/>
					</div>
				</div>
			</div>
			<div class="flex gap-3">
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="companyName">
						Account Manager
					</label>
					<div class="flex gap-3">
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="accountManagerName"
							type="text"
							placeholder="Enter Name"
							bind:value={$form.accountManagerName}
						/>
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="accountManagerNumber"
							type="text"
							placeholder="Enter Number"
							bind:value={$form.accountManagerNumber}
						/>
					</div>
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="companyName">
						Technical Manager
					</label>
					<div class="flex gap-3">
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="technicalManagerName"
							type="text"
							placeholder="Enter Name"
							bind:value={$form.technicalManagerName}
						/>
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="technicalManagerNumber"
							type="text"
							placeholder="Enter Number"
							bind:value={$form.technicalManagerNumber}
						/>
					</div>
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="companyName">
						Customer Service Manager
					</label>
					<div class="flex gap-3">
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="customerServiceManagerName"
							type="text"
							placeholder="Enter Name"
							bind:value={$form.customerServiceManagerName}
						/>
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="customerServiceManagerNumber"
							type="text"
							placeholder="Enter Number"
							bind:value={$form.customerServiceManagerNumber}
						/>
					</div>
				</div>
			</div>
			<div>
				<label class="mb-2 block text-xs font-semibold text-gray-700" for="socialAccount">
					Social Account <span class="text-red-500 font-bold">*</span>
				</label>
				<input
					class="w-full rounded border px-3 py-2 text-sm text-gray-700"
					id="socialAccount"
					type="text"
					placeholder="Enter Social Account (Skype, Whatsapp, Telegram, etc)"
					bind:value={$form.socialAccount}
				/>
				{#if $errors.socialAccount}
					<small class="text-xs font-bold text-red-500 font-bold">{$errors.socialAccount}</small>
				{/if}
			</div>
		</div>
	</div>
	<div class="text-right">
		<div class="inline-flex gap-2">
			<button
				class="w-24 rounded-md border-slate-800 bg-slate-800 px-5 py-2 text-white"
				type="submit"
				disabled={isLoading}>Next</button
			>
		</div>
	</div>
</form>
