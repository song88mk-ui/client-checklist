<script lang="ts">
  import Layout from "../components/Layout.svelte";
  import ModalContent from "../components/ClientOnBoardGuide.svelte";
  import ProgressBar from "../components/ClientProgressBar.svelte";
  import ClientTask from "../components/ClientTask.svelte";
  import { modalContent, isModalOpen } from "../stores/modal";
  isModalOpen.set(false);
  modalContent.set(ModalContent);
</script>

<Layout>
  <div
    class="flex p-6 flex-col items-start rounded-[4px] border border-[#E1E1E1] bg-white"
  >
    <div class="flex justify-between items-start self-stretch">
      <div class="test">
        <span class="text-[#7A7A7A] text-[11px] font-normal leading-none"
          >Company Name</span
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
          www.Song88.com</span
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
          Sportsbook Integration</span
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
          EN, JP, TH</span
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
          December 25, 2024</span
        >
      </div>
    </div>
  </div>
  <ProgressBar InProgress="30%" NotStarted="50%" Completed="20%"/>
  <ClientTask Title="Song88 Back Office" Progress={50} ActualDateComplete="-" TargetDateComplete="December 25, 2024"/>
  <ClientTask Title="Risk Management System" Progress={0} ActualDateComplete="-" TargetDateComplete="-"/>
  <ClientTask Title="Odds Feed/ Live Data and Bet Validation" Progress={100} ActualDateComplete="December 25, 2024" TargetDateComplete="October 25, 2024" status={2}/>
  <ClientTask Title="Sports" Progress={100} ActualDateComplete="December 25, 2024" TargetDateComplete="October 25, 2024" status={2}/>
  <ClientTask Title="Operations" Progress={100} ActualDateComplete="December 25, 2024" TargetDateComplete="October 25, 2024" status={2}/>
  <ClientTask Title="End to End Testing: Function/ Performance" Progress={100} ActualDateComplete="December 25, 2024" TargetDateComplete="October 25, 2024" status={2}/>
  <ClientTask Title="Business Acceptance Test and Client Launch" Progress={100} ActualDateComplete="December 25, 2024" TargetDateComplete="October 25, 2024" status={2}/>

</Layout>

