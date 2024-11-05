<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Role from "./enums/role";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import NotAuthorized from "./pages/NotAuthorized.svelte";
  import RoleGuard from "./components/RoleGuard.svelte";
  import Redirect from "./components/Redirect.svelte";
  import Client from "./pages/Client.svelte";
</script>

<Router>
  <Route path="/">
    <Redirect to="/dashboard" />
  </Route>
  <Route path="/about"><About /></Route>
  <Route path="/login"><Login /></Route>
  <PrivateRoute path="/dashboard">
    <RoleGuard allowedRoles={[Role.ADMIN]}>
      <Dashboard />
    </RoleGuard>
  </PrivateRoute>
  <Route path="/client">
    <Client />
  </Route>
  <Route path="/not-authorized">
    <NotAuthorized />
  </Route>
  <Route path="*">
    <NotFound />
  </Route>
</Router>
