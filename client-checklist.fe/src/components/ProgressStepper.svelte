<script lang="ts">
  import Icon from "@iconify/svelte";
  import type Step from "../types/step";

  export let steps: Step[] = [];
  export let onClick: (step: Step) => void;

  const statusColors = {
    completed: {
      bg: "bg-blue-600",
      icon: "text-white",
      border: "border-blue-600",
      line: "bg-blue-600",
      text: "text-blue-600",
    },
    active: {
      bg: "bg-white",
      icon: "text-blue-600",
      border: "border-blue-500",
      line: "bg-gray-300",
      text: "text-blue-600",
    },
    inactive: {
      bg: "bg-white",
      icon: "text-gray-300",
      border: "border-gray-300",
      line: "bg-gray-300",
      text: "text-gray-300",
    },
  };
</script>

<div class="flex">
  {#each steps as { id, title, status }, index}
    <div class="flex flex-1 flex-col items-center relative">
      <button
        class={`${statusColors[status].bg} ${statusColors[status].border} z-10 w-10 h-10 rounded-full flex items-center justify-center border-2`}
        on:click={() => onClick({ id, title, status })}
        disabled={status === "inactive"}
      >
        <span class={`font-medium ${statusColors[status].icon}`}>
          {#if status === "completed"}
            <Icon icon="mdi:check" />
          {:else}
            <Icon icon="mdi:circle" />
          {/if}
        </span>
      </button>
      <div
        class={`text-xs font-medium mt-2 text-center ${statusColors[status].text}`}
      >
        {title}
      </div>
      {#if index < steps.length - 1}
        <div
          class={`absolute top-5 w-full h-0.5 -right-1/2 ${statusColors[status].line}`}
        ></div>
      {/if}
    </div>
  {/each}
</div>
