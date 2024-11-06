<script lang="ts">
  import ClientInformationForm from "../components/ClientInformationForm.svelte";
  import GenerateLinkButton from "../components/GenerateLinkButton.svelte";
  import Layout from "../components/Layout.svelte";
  import ProgressStepper from "../components/ProgressStepper.svelte";
  import type Step from "../types/step";

  const handleStepClick = (step: Step) => {
    console.log(step);
  };
</script>

<Layout>
  <div class="flex items-center justify-between mb-10">
    <h1 class="font-bold text-3xl">Odds Feed and Live Data Integration</h1>
    <GenerateLinkButton />
  </div>
  <div class="max-w-screen-lg mx-auto mb-10">
    <ProgressStepper
      steps={[
        { id: "1", title: "Contact Information", status: "completed" },
        { id: "2", title: "Back Office", status: "active" },
        { id: "3", title: "Wallet Integration", status: "inactive" },
        { id: "4", title: "Sportsbook Player Site UI/UX", status: "inactive" },
        { id: "5", title: "Manage Trading Services", status: "inactive" },
        { id: "6", title: "Operations", status: "inactive" },
        { id: "7", title: "Business Acceptance Test", status: "inactive" },
        { id: "8", title: "Client Launch", status: "inactive" },
      ]}
      onClick={handleStepClick}
    />
  </div>
  <div class="mb-10">
    <ClientInformationForm />
  </div>
  <div class="text-right">
    <div class="inline-flex gap-2">
      <button
        class="w-24 h-[40px] leading-none bg-white border-2 border-slate-800 px-5 py-2 rounded-md"
        >Back</button
      >
      <button
        class="w-24 bg-slate-800 border-slate-800 text-white px-5 py-2 rounded-md"
        >Next</button
      >
    </div>
  </div>
</Layout>
