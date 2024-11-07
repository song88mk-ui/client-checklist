<script lang="ts">
  import Layout from "../components/Layout.svelte";
  import ModalContent from "../components/ClientOnBoardGuide.svelte";
  import ProgressBar from "../components/ClientProgressBar.svelte";
  import ClientTask from "../components/ClientTask.svelte";
  import ClientHeader from "../components/ClientHeader.svelte";
  import { modalContent, isModalOpen } from "../stores/modal";
  isModalOpen.set(false);
  modalContent.set(ModalContent);
</script>

<Layout>
  <ClientHeader CompanyName="Song88" Domain="www.Song88.com" ServiceToProvide="Sportsbook Integration" LangSupported="EN, JP, TH"  LaunchDate="December 25, 2024"/>
  <ProgressBar InProgress="30%" NotStarted="50%" Completed="20%"/>
  <ClientTask Title="Song88 Back Office" Progress={50} ActualDateComplete="-" TargetDateComplete="December 25, 2024"/>
  <ClientTask Title="Risk Management System" Progress={0} ActualDateComplete="-" TargetDateComplete="-"/>
  <ClientTask Title="Odds Feed/ Live Data and Bet Validation" Progress={100} ActualDateComplete="December 25, 2024" TargetDateComplete="October 25, 2024" status={2}/>
  <ClientTask Title="Sports" Progress={100} ActualDateComplete="December 25, 2024" TargetDateComplete="October 25, 2024" status={2}/>
  <ClientTask Title="Operations" Progress={100} ActualDateComplete="December 25, 2024" TargetDateComplete="October 25, 2024" status={2}/>
  <ClientTask Title="End to End Testing: Function/ Performance" Progress={100} ActualDateComplete="December 25, 2024" TargetDateComplete="October 25, 2024" status={2}/>
  <ClientTask Title="Business Acceptance Test and Client Launch" Progress={100} ActualDateComplete="December 25, 2024" TargetDateComplete="October 25, 2024" status={2}/>
</Layout>

