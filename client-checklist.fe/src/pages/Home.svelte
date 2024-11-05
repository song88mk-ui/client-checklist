<script>
  import {navigate} from 'svelte-routing'
  import PublicLayout from "../components/PublicLayout.svelte";
  import {isAuthenticated} from '../stores/login'

  $: if (!$isAuthenticated) {
    setTimeout(()=>{
      navigate('/login');
    },20)
  }
</script>

<PublicLayout>
  <div class="px-3">Home</div>
</PublicLayout>
