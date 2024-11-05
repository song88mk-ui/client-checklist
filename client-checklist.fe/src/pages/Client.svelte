<script lang="ts">
  import type Step from "../types/step";
  import ProgressStepper from "../components/ProgressStepper.svelte";
  import Layout from "../components/Layout.svelte";

  const handleClick = (step: Step) => {
    console.log(step);
  };
</script>

<Layout>This is client</Layout>
