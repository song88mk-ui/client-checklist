<script lang="ts">
  import Layout from "../components/Layout.svelte";
  import ModalContent from "../components/ClientOnBoardGuide.svelte";
  import {modalContent,isModalOpen} from '../stores/modal'
  isModalOpen.set(true)
  modalContent.set(ModalContent)
</script>

<Layout>This is client</Layout>
