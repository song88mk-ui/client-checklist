<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import Clients from "./pages/Clients.svelte";
  import NotAuthorized from "./pages/NotAuthorized.svelte";
  import RoleGuard from "./components/RoleGuard.svelte";
  import Role from "./types/role";
  import Redirect from "./components/Redirect.svelte";
</script>

<Router>
  <Route path="/">
    <Redirect to="/clients" />
  </Route>
  <Route path="/about"><About /></Route>
  <Route path="/login"><Login /></Route>
  <PrivateRoute path="clients">
    <RoleGuard allowedRoles={[Role.ADMIN]}>
      <Clients />
    </RoleGuard>
  </PrivateRoute>
  <Route path="/not-authorized">
    <NotAuthorized />
  </Route>
  <Route path="*">
    <NotFound />
  </Route>
</Router>
