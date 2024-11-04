<script lang="ts">
  import type Step from "../types/step";
  import ProgressStepper from "../components/ProgressStepper.svelte";
  import Layout from "../components/Layout.svelte";

  const handleClick = (step: Step) => {
    console.log(step);
  };
</script>

<Layout>
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
    onClick={handleClick}
  />
</Layout>
