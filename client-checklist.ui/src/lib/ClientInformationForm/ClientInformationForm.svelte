<script lang="ts">
	import { createForm } from 'svelte-forms-lib';

	import auth from '$stores/auth';
	import steps from '$stores/steps';
	import selectedIntegration from '$stores/integration';
	import { sportsFeed } from '$stores/client-launch-feed';

	import EnhanceDropdown from '$lib/EnhanceDropdown.svelte';
	import APIGateway from '$api/APIGateway';
	import { StatusCode } from '$api/models';
	import { PageGuard } from '$services/PageGuard';
	import { toCreateClientPayload, toEditClientPayload } from '$mapper/ClientMapper';
	import { ClientRowStatus } from '$enums/ClientRowStatus';
	import { AccessType } from '$enums/role';
	import Step from '$enums/Step';
	import validationSchema, { type ClientInformationFormType } from './validationSchema';
	import Product from '../../utils/client';
	import {
		currencyOption,
		languageOption,
		marketOption,
		sportsOption
	} from '$constants/ClientInformation';
	import DateInput from '../DateInput.svelte';

	const { createClient, updateClient } = APIGateway();
	let { next, isEdit = false } = $props();
	let isLoading = $state(false);
	let disabled = $state(false);

	$effect(() => {
		disabled = isEdit && AccessType.READWRITE !== $auth?.accessType;
	});

	let initialValues = {
		clientId: '',
		clientName: '',
		domain: '',
		sslCert: '',
		languages: '',
		currencies: '',
		sports: '',
		markets: '',
		launchDate: null,
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
		socialAccount: '',
		taskStatus: ClientRowStatus.NotStarted
	};

	const serviceSteps = Step[$selectedIntegration];

	$effect(() => {
		if ($steps[serviceSteps.ClientInformation]?.formData) {
			const formData = $steps[serviceSteps.ClientInformation]
				?.formData as ClientInformationFormType;
			updateInitialValues({
				...formData,
				clientId: formData?.clientId || ''
			});
		} else {
			updateInitialValues(initialValues);
		}
	});

	const { form, handleSubmit, errors, updateField, updateInitialValues } = createForm({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			if (disabled) {
				next();
				return;
			}
			isLoading = true;

			let response;
			if (values.clientId) {
				response = await updateClient(toEditClientPayload($selectedIntegration, values), {
					'x-user-token': $auth?.userToken as string
				});
			} else {
				response = await createClient(toCreateClientPayload($selectedIntegration, values), {
					'x-user-token': $auth?.userToken as string
				});
			}

			isLoading = false;

			if (response.statusCode === StatusCode.Success) {
				const { sports } = values;
				$sportsFeed = sports
					.split(',')
					.map((item) => item.trim())
					.filter((item) => item !== '');

				$steps[serviceSteps.ClientInformation].formData = {
					...values,
					clientId: response.data
				};

				next();

				return;
			}
			// $sports = values.sports;
			await PageGuard(response.error?.statusCode);
		}
	});

	const handleSelectDate = (selectedDate: Date) => {
		updateField('launchDate', selectedDate.toISOString());
	};

	const handleSelectedLanguage = (selectedItem: string) => {
		updateField('languages', selectedItem);
	};
	const handleSelectedCurrency = (selectedItem: string) => {
		updateField('currencies', selectedItem);
	};
	const handleSelectedSport = (selectedItem: string) => {
		updateField('sports', selectedItem);
	};
	const handleSelectedMarket = (selectedItem: string) => {
		updateField('markets', selectedItem);
	};

	let showLanguageOption = $state(false);
	let showCurrencyOption = $state(false);
	let showSportsOption = $state(false);
	let showMarketOption = $state(false);
	const handleEnhanceDropdown = (dropdown: string, toggle: boolean) => {
		showCurrencyOption = false;
		showSportsOption = false;
		showLanguageOption = false;
		showMarketOption = false;

		if (toggle) {
			if (dropdown === 'language') showLanguageOption = true;
			if (dropdown === 'currency') showCurrencyOption = true;
			if (dropdown === 'sports') showSportsOption = true;
			if (dropdown === 'market') showMarketOption = true;
		}
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
						<span class="font-bold text-red-500">*</span>
					</label>
					<input
						class="w-full rounded border px-3 py-2 text-sm text-gray-700"
						id="clientName"
						type="text"
						placeholder="Enter Company Name"
						bind:value={$form.clientName}
						{disabled}
					/>
					{#if $errors.clientName}
						<small class="text-xs font-bold font-bold text-red-500">{$errors.clientName}</small>
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
						{disabled}
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
						{disabled}
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
						placeholder="Enter target launch date"
						value={$form.launchDate ? new Date($form.launchDate).toISOString() : null}
						onSelectDate={(selectedDate) => handleSelectDate(selectedDate)}
						elementId="clientInformation-targetLaunchDate"
						{disabled}
					/>
				</div>
			</div>
			<div class="flex gap-3">
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="languagesSupported">
						Languages Supported <span class="font-bold text-red-500">*</span>
					</label>
					<input type="hidden" bind:value={$form.languages} />
					<EnhanceDropdown
						onSelectedOption={(selectedItem: string) => handleSelectedLanguage(selectedItem)}
						options={languageOption}
						selected={($steps[serviceSteps.ClientInformation]?.formData?.languages as string).split(
							','
						)}
						{disabled}
						placeholder="Enter Languages Supported"
						showOption={showLanguageOption}
						onShow={(toggle: boolean) => handleEnhanceDropdown('language', toggle)}
					/>
					{#if $errors.languages}
						<small class="text-xs font-bold font-bold text-red-500">{$errors.languages}</small>
					{/if}
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="currencySupported">
						Currencies Supported <span class="font-bold text-red-500">*</span>
					</label>
					<input type="hidden" bind:value={$form.currencies} />
					<EnhanceDropdown
						onSelectedOption={(selectedItem: string) => handleSelectedCurrency(selectedItem)}
						options={currencyOption}
						selected={(
							$steps[serviceSteps.ClientInformation]?.formData?.currencies as string
						).split(',')}
						{disabled}
						placeholder="Enter Currencies Supported"
						showOption={showCurrencyOption}
						onShow={(toggle: boolean) => handleEnhanceDropdown('currency', toggle)}
					/>
					{#if $errors.currencies}
						<small class="text-xs font-bold font-bold text-red-500">{$errors.currencies}</small>
					{/if}
				</div>
			</div>
			<div class="flex gap-3">
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="sports">
						Sports <span class="font-bold text-red-500">*</span>
					</label>
					<input type="hidden" bind:value={$form.sports} />
					<EnhanceDropdown
						onSelectedOption={(selectedItem: string) => handleSelectedSport(selectedItem)}
						options={sportsOption}
						selected={($steps[serviceSteps.ClientInformation]?.formData?.sports as string).split(
							','
						)}
						{disabled}
						placeholder="Enter Sports"
						showOption={showSportsOption}
						onShow={(toggle: boolean) => handleEnhanceDropdown('sports', toggle)}
					/>
					{#if $errors.sports}
						<small class="text-xs font-bold font-bold text-red-500">{$errors.sports}</small>
					{/if}
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="targetMarket">
						Target Market <span class="font-bold text-red-500">*</span>
					</label>
					<input type="hidden" bind:value={$form.markets} />
					<EnhanceDropdown
						onSelectedOption={(selectedItem: string) => handleSelectedMarket(selectedItem)}
						options={marketOption}
						selected={($steps[serviceSteps.ClientInformation]?.formData?.markets as string).split(
							','
						)}
						{disabled}
						placeholder="Enter Target Market"
						showOption={showMarketOption}
						onShow={(toggle: boolean) => handleEnhanceDropdown('market', toggle)}
					/>
					{#if $errors.markets}
						<small class="text-xs font-bold font-bold text-red-500">{$errors.markets}</small>
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
							{disabled}
						/>
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="mainDecisionMakerNumber"
							type="text"
							placeholder="Enter Number"
							bind:value={$form.mainDecisionMakerNumber}
							{disabled}
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
							{disabled}
						/>
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="financeManagerNumber"
							type="text"
							placeholder="Enter Number"
							bind:value={$form.financeManagerNumber}
							{disabled}
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
							{disabled}
						/>
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="productManagerNumber"
							type="text"
							placeholder="Enter Number"
							bind:value={$form.productManagerNumber}
							{disabled}
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
							{disabled}
						/>
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="accountManagerNumber"
							type="text"
							placeholder="Enter Number"
							bind:value={$form.accountManagerNumber}
							{disabled}
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
							{disabled}
						/>
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="technicalManagerNumber"
							type="text"
							placeholder="Enter Number"
							bind:value={$form.technicalManagerNumber}
							{disabled}
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
							{disabled}
						/>
						<input
							class="w-full rounded border px-3 py-2 text-sm text-gray-700"
							id="customerServiceManagerNumber"
							type="text"
							placeholder="Enter Number"
							bind:value={$form.customerServiceManagerNumber}
							{disabled}
						/>
					</div>
				</div>
			</div>
			<div>
				<label class="mb-2 block text-xs font-semibold text-gray-700" for="socialAccount">
					Social Account <span class="font-bold text-red-500">*</span>
				</label>
				<input
					class="w-full rounded border px-3 py-2 text-sm text-gray-700"
					id="socialAccount"
					type="text"
					placeholder="Enter Social Account (Skype, Whatsapp, Telegram, etc)"
					bind:value={$form.socialAccount}
					{disabled}
				/>
				{#if $errors.socialAccount}
					<small class="text-xs font-bold font-bold text-red-500">{$errors.socialAccount}</small>
				{/if}
			</div>
		</div>
	</div>
	<div class="text-right">
		<div class="inline-flex gap-2">
			<button
				class="w-24 rounded-md border-slate-800 bg-slate-800 px-5 py-2 text-white"
				type="submit"
				disabled={isLoading}
				>Next
			</button>
		</div>
	</div>
</form>
