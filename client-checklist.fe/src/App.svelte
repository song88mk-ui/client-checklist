<script lang="ts">
  import Routes from "./Routes.svelte";
  import {checkAuthentication} from './components/Login/auth'

  checkAuthentication()
</script>

<Routes />
