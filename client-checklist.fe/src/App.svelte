<script lang="ts">
  import { Router, Link, Route, links } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import NotFound from "./pages/NotFound.svelte";
  export let url = "";
</script>

<main>
  <Router {url}>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/blog">Blog</Link>
    </nav>
    <div>
      <Route path="/"><Home /></Route>
      <Route path="/about"><About /></Route>
      <Route path="*">
        <NotFound />
      </Route>
    </div>
  </Router>
</main>
