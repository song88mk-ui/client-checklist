<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Layout from "./components/Layout.svelte";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
  import NotFound from "./pages/NotFound.svelte";

</script>

<Router>
  <Layout>
    <Route path="/"><Home /></Route>
    <Route path="/about"><About /></Route>
    <Route path="/login"><Login /></Route>
    <Route path="*">
      <NotFound />
    </Route>
  </Layout>
</Router>
