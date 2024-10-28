<script>
  import { Link } from "svelte-routing";
</script>

<header class="flex">
  <h1 class="mr-2">
    <Link to="/">Checklist</Link>
  </h1>
  <nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
    <Link to="login">Login</Link>
  </nav>
</header>
