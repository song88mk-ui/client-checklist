<script lang="ts">

export let CompanyName: string = '';
export let Domain: string = '';
export let ServiceToProvide: string = '';
export let LangSupported: string = '';
export let LaunchDate: string = '';


</script>

<div
class="flex p-6 flex-col items-start rounded-[4px] border border-[#E1E1E1] bg-white"
>
<div class="flex justify-between items-start self-stretch">
  <div class="test">
    <span class="text-[#7A7A7A] text-[11px] font-normal leading-none"
      >{CompanyName}</span
    >
    <br />
    <span
      class="text-[#0071BC] text-[16px] font-normal font-bold leading-none"
    >
      Song88</span
    >
  </div>
  <div class="test">
    <span class="text-[#7A7A7A] text-[11px] font-normal leading-none"
      >Domain(s)</span
    >
    <br />
    <span
      class="text-[#0071BC] text-[16px] font-normal font-bold leading-none"
    >
      {Domain}</span
    >
  </div>
  <div class="test">
    <span class="text-[#7A7A7A] text-[11px] font-normal leading-none"
      >Service to Provide</span
    >
    <br />
    <span
      class="text-[#0071BC] text-[16px] font-normal font-bold leading-none"
    >
      {ServiceToProvide}</span
    >
  </div>
  <div class="test">
    <span class="text-[#7A7A7A] text-[11px] font-normal leading-none"
      >Languages and Currencies Supported</span
    >
    <br />
    <span
      class="text-[#0071BC] text-[16px] font-normal font-bold leading-none"
    >
      {LangSupported}</span
    >
  </div>
  <div class="test">
    <span class="text-[#7A7A7A] text-[11px] font-normal leading-none"
      >Target Launch Date</span
    >
    <br />
    <span
      class="text-[#0071BC] text-[16px] font-normal font-bold leading-none"
    >
      {LaunchDate}</span
    >
  </div>
</div>
</div>