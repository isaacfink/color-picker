<script lang="ts">
  import { scale } from "svelte/transition";

  export let text = "Copy";

  let copied = false;
  function handleCopy() {
    navigator.clipboard.writeText(text);
    copied = true;

    setTimeout(() => {
      copied = false;
    }, 2000);
  }
</script>

<button
  on:click={handleCopy}
  type="button"
  class="absolute top-3 right-3 rounded-md bg-white size-7 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 flex items-center justify-center"
>
  {#if copied}
    <svg
      transition:scale
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-5 absolute top-1 left-1"><path d="M20 6 9 17l-5-5" /></svg
    >
  {:else}
    <svg
      transition:scale
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-5 absolute top-1 left-1"
      ><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path
        d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
      /></svg
    >
  {/if}
</button>
