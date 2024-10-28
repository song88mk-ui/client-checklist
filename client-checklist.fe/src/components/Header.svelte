<script>
  import { Link } from "svelte-routing";
</script>

<header class="flex p-3">
  <h1 class="mr-3">
    <Link to="/">Checklist</Link>
  </h1>
  <nav class="flex-1 flex justify-between">
    <div>
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
    </div>
    <Link to="login">Login</Link>
  </nav>
</header>
