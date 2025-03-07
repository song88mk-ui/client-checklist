<script lang="ts">
	import { onMount,onDestroy } from 'svelte';
	import { closeModal } from '$stores/modal';
	import Device from '$enums/Device';

	let agreementText: any;
	let isScrolledToBottom = false;
	let device: Device = Device.Desktop;

	function handleScroll() {
		const scrollTop = agreementText.scrollTop;
		if(scrollTop > 78){
			isScrolledToBottom = true;
		}
	}
	onMount(() => {
		document.body.style.overflow = "hidden"
		if (window.innerWidth <= 768) {
			device = Device.Mobile;
		}
		handleScroll();
	});
	onDestroy(() => {
		document.body.style.overflow = "scroll"
  });
</script>

<div class={`mt-[50px] h-[635px] ${device === Device.Mobile ? 'w-[80%]' : 'w-[811px]'}  flex-shrink-0 self-start bg-white`}>
	<div class="m-[24px] h-[500px] overflow-y-scroll agreement"
  bind:this={agreementText} 
  class:scrolled={isScrolledToBottom} 
  onscroll={handleScroll}
  >
		<div class="mt-[10px]">
			<span class="text-[24px] font-bold leading-none text-[#262626]"
				>Guide to Onboarding Clients:</span
			>
			<p class="pt-[10px] text-[14px] font-medium font-normal leading-[19px] text-[#262626]">
				This document will serve as a guide for Clients regarding the tasks related to integration
				and launch of Song88 Sportsbook. The list of tasks, assigned task owners, and task status
				will be updated in this document by Song88’s Account Manager and Development team throughout
				the integration process.<br/><br/> Remarks will be added in this document in case of delays or
				circumstances affecting the integration timeline.
			</p>
		</div>
		
		<div class="mt-[24px]">
			<span class="text-[24px] font-bold leading-none text-[#262626]"
				>Important to Note:</span>

				<ul class="list-decimal pl-5 pt-[10px] text-[14px] font-medium font-normal leading-[19px] text-[#262626]">
					<li>
					The integration process will not start until the contract between Song88 and Client has been
					finalized or signed by both parties. 
				</li>
				
				<li>
					Bespoke requests are not accommodated unless mentioned
					in the contract. Any requests by Client outside of the contract during or after the
					integration process should go through Song88’s Account Manager who will process the change
					request internally and get approval from Song88 Management. 
				</li>
				
				<li>
					Once change or additional
					requests are approved, an amendment to the original contract needs to be signed before the
					actual Development work can resume. 
				</li>
				
				<li>
					All Client related communication and requirements will
					be managed by the assigned Song88 Account Manager, with the exception of technical
					discussions needed between the Client and Song88 Development or Technical teams.
				</li>
			</ul>
		</div>
		<div class="mt-[24px]">
			<span class="text-[24px] font-bold leading-none text-[#262626]"
				>Steps to Onboarding a Client:</span
			>
			<ul class="list-decimal pl-5 pt-[10px] text-[14px] font-medium font-normal leading-[19px] text-[#262626]">
				<li>
					Sales team to negotiate and get the contract signed with an estimated target date as
					discussed with the Development team.
				</li>
				<li>
					Handover from Sales to Account Manager (Client details,
					expectations and contract).
				</li>
				<li>
					Account Manager to coordinate with the Development team to
					verify the project scope and timelines based on available resources. The Account Manager
					will create the relevant communication channels between Song88 and Client.
				</li>
				<li>Kick-off of Integration Process. </li>
				<li>
					The Integration and Launch Document will be updated from start to
					finish by individual or team contributors assigned to the tasks.
				</li>
				<li> The Account Manager will be responsible for following up target timelines, requirements, etc.</li>
				<li>
					The Account Manager will be responsible for updating the Client regarding the integration tasks status aside from
					ensuring that the Integration and Launch document is up to date.
				</li>
				<li>
					Once all tasks by Song88
					has been completed including End-to-end test in Staging, Clients should conduct a User or
					Business Acceptance Test. Clients are expected to provide a target launch or GO LIVE date
					once the User or Business Acceptance Test has started.
				</li>
				<li>
					Issues or any other Change Requests
					which may be accommodated still after the UAT will be addressed and the GO LIVE date will be
					agreed upon by both Song88 and Client.
				</li>
				<li>
					Clients should not launch without prior agreement
					with Song88.
				</li>
				<li>
					GO LIVE!
				</li>

			</ul>
		</div>
	</div>
	<div class="mx-[24px] my-0">
		<button
      disabled={!isScrolledToBottom}
			onclick={closeModal}
			class="flex w-[104px] items-center justify-center gap-[10px] justify-self-end rounded-[5px] bg-[#272727] p-[10px] text-[14px] font-bold font-normal leading-none text-white "
      class:opacity-50={!isScrolledToBottom}
      >
			Close
		</button>
	</div>
</div>
