<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
</script>

<Router>
  <Route path="/"><Home /></Route>
  <Route path="/about"><About /></Route>
  <Route path="/login"><Login /></Route>
  <PrivateRoute path="dashboard">
    <Dashboard />
  </PrivateRoute>
  <Route path="*">
    <NotFound />
  </Route>
</Router>
