<script>
    import { isModalOpen, modalContent } from '../stores/modal';
  </script>
  
  {#if $isModalOpen}
      <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-30 flex items-center justify-center">
        <svelte:component this={$modalContent} />
    </div>
  {/if}
  