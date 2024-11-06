<script lang="ts">
  import { fly } from "svelte/transition";

  export let Progress: number = 0;
  export let Title: string = "";
  export let TargetDateComplete: string = "";
  export let ActualDateComplete: string = "";
  export let status: number = 0;

  let isOpen = false;

  const STATUS_BG: any = {
    0: "bg-[#E3E3E3]",
    1: "bg-[#FAE9DC]",
    2: "bg-[#E7FFE4]",
  };
  const STATUS_TEXT: any = {
    0: "text-[#979797]",
    1: "text-[#EF7E1D]",
    2: "text-[#2DBE22]",
  };

  function toggle() {
    isOpen = !isOpen;
  }

  function Status(status: number) {
    return `
        <div
            class="mx-[10px] rounded-[24px] ${STATUS_BG[status]} flex px-[2px] justify-center items-center ${STATUS_TEXT[status]} text-[12px] font-normal font-semibold leading-none h-[23px] self-center">
            ${status === 0 ? "<span>In Progress</span>" : ""} 
            ${status === 1 ? "<span>Not Started</span>" : ""}   
            ${status === 2 ? "<span>Completed</span>" : ""}        
        </div>
    `;
  }
</script>

<div
  on:click={toggle}
  role="presentation"
  class="cursor-pointer min-h-[94px] mt-4 rounded-[4px] border border-[#E1E1E1] bg-white"
>
  <div class="flex justify-between items-center p-6">
    <div class="flex">
      <span
        class="self-center text-[#0071BC] text-[24px] font-normal font-bold leading-none mr-[10px]"
        >{Title}</span
      >
      <div
        class="h-[36px] w-[36px] rounded-full bg-[#0071BC] text-white text-[12px] font-normal font-bold leading-none flex items-center justify-center"
      >
        <span>{`${Progress}%`}</span>
      </div>
    </div>
    <div class="flex">
      <div class="mx-[10px]">
        <span
          class="text-[#7A7A7A] text-[11px] font-normal font-light leading-none"
          >Target Date To Complete</span
        >
        <br />
        <span
          class="text-[#0071BC] text-[14px] font-normal font-bold leading-none"
        >
          {TargetDateComplete}</span
        >
      </div>

      <div class="mx-[10px]">
        <span
          class="text-[#7A7A7A] text-[11px] font-normal font-light leading-none"
          >Actual Date Completed</span
        >
        <br />
        <span
          class="text-[#0071BC] text-[14px] font-normal font-bold leading-none"
          >{ActualDateComplete}</span
        >
      </div>
      <div
        class={`mx-[10px] rounded-[24px] ${STATUS_BG[status]} flex px-[12px] justify-center items-center ${STATUS_TEXT[status]} text-[12px] font-normal font-semibold leading-none h-[23px] self-center`}
      >
        {#if status === 1}
          <span>In Progress</span>
        {/if}
        {#if status === 0}
          <span>Not Started</span>
        {/if}
        {#if status === 2}
          <span>Completed</span>
        {/if}
      </div>
      <img
        src={`./assets/${isOpen ? "arrow-up" : "arrow-down"}.svg`}
        alt="logo"
      />
    </div>
  </div>
  {#if isOpen}
    <div class="mx-[20px]" transition:fly={{ y: -10, duration: 300 }}>
      <table class="min-w-full mb-[10px]">
        <thead class="h-[36px]">
          <tr>
            <th
              class="text-start bg-[#F6F6F6] px-4 py-2 text-[#1A1A1A] text-[14px] font-normal font-semibold leading-normal"
              >Description</th
            >
            <th
              class="text-start bg-[#F6F6F6] px-4 py-2 text-[#1A1A1A] text-[14px] font-normal font-semibold leading-normal"
              >Comments</th
            >
            <th
              class="text-start bg-[#F6F6F6] px-4 py-2 text-[#1A1A1A] text-[14px] font-normal font-semibold leading-normal"
              >Assigned To</th
            >
            <th
              class="text-start bg-[#F6F6F6] px-4 py-2 text-[#1A1A1A] text-[14px] font-normal font-semibold leading-normal"
              >Status</th
            >
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              class="text-start border-b border-[#ECECEC] px-4 py-2 text-[#1A1A1A] text-[14px]"
              >Max Bet</td
            >
            <td
              class="text-start border-b border-[#ECECEC] px-4 py-2 text-[#1A1A1A] text-[14px]"
              >Test Account</td
            >
            <td
              class="text-start border-b border-[#ECECEC] px-4 py-2 text-[#1A1A1A] text-[14px]"
              >Song88 Operations Team</td
            >
            <td
              class="text-start border-b border-[#ECECEC] px-4 py-2 text-[#1A1A1A] text-[14px]"
              >{@html Status(2)}</td
            >
          </tr>
          <tr>
            <td
              class="text-start border-b border-[#ECECEC] px-4 py-2 text-[#1A1A1A] text-[14px]"
              >Max Payout</td
            >
            <td
              class="text-start border-b border-[#ECECEC] px-4 py-2 text-[#1A1A1A] text-[14px]"
              >N/A</td
            >
            <td
              class="text-start border-b border-[#ECECEC] px-4 py-2 text-[#1A1A1A] text-[14px]"
              >Song88 Operations Team</td
            >
            <td
              class="text-start border-b border-[#ECECEC] px-4 py-2 text-[#1A1A1A] text-[14px]"
              >{@html Status(0)}</td
            >
          </tr>
          <tr>
            <td
              class="text-start border-b border-[#ECECEC] px-4 py-2 text-[#1A1A1A] text-[14px]"
              >Player CCF and Groupings</td
            >
            <td
              class="text-start border-b border-[#ECECEC] px-4 py-2 text-[#1A1A1A] text-[14px]"
              >N/A</td
            >
            <td
              class="text-start border-b border-[#ECECEC] px-4 py-2 text-[#1A1A1A] text-[14px]"
              >Song88 Operations Team</td
            >
            <td
              class="text-start border-b border-[#ECECEC] px-4 py-2 text-[#1A1A1A] text-[14px]"
              >{@html Status(1)}</td
            >
          </tr>
        </tbody>
      </table>
    </div>
  {/if}
</div>
