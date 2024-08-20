<script lang="ts">
  import "$lib/styles.pcss";

  let url: string = "";
  let generatedUrl = "";
  let copied = false;
  let urlError: string | null = null;

  let colors = [
    { label: "Main color", key: "mainColor", color: "#ff0000" },
    { label: "Background color", key: "bgColor", color: "#ff0000" },
    { label: "Dark theme color", key: "colorDark", color: "#ff0000" },
    { label: "Medium theme color ", key: "colorMedium", color: "#ff0000" },
    { label: "Light theme color", key: "colorLight", color: "#ff0000" },
  ];

  let state: "pending" | "loading" | "generated" = "pending";

  async function handleGenerate() {
    try {
      state = "loading";
      const _url = new URL(url);
      const searchParams = new URLSearchParams();
      for (const color of colors) {
        searchParams.set(color.key, color.color);
      }

      _url.search = searchParams.toString();
      generatedUrl = _url.toString();

      state = "generated";
    } catch (error) {
      console.error(error);
      state = "pending";
      urlError = "Invalid URL";
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(generatedUrl);
    copied = true;
  }

  function handleReset() {
    url = "";
    urlError = null;
    generatedUrl = "";
    copied = false;
    colors = [
      { label: "Main color", key: "mainColor", color: "#ff0000" },
      { label: "Background color", key: "bgColor", color: "#ff0000" },
      { label: "Dark theme color", key: "colorDark", color: "#ff0000" },
      { label: "Medium theme color ", key: "colorMedium", color: "#ff0000" },
      { label: "Light theme color", key: "colorLight", color: "#ff0000" },
    ];
    state = "pending";
  }
</script>

<div
  class="container mx-auto bg-slate-50 h-screen flex flex-col p-12 items-center justify-center gap-y-6"
>
  <h1 class="text-slate-600 text-3xl font-medium">
    Generate encoded url with colors query params
  </h1>

  <div class="w-full max-w-xl">
    <label
      for="company-website"
      class="block text-sm font-medium leading-6 text-gray-900">Base URL</label
    >
    <div class="mt-2">
      <div
        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-600 sm:max-w-xl w-full"
      >
        <span
          class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
          >https://</span
        >
        <input
          type="text"
          bind:value={url}
          name="company-website"
          id="company-website"
          class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
          placeholder="www.example.com"
        />
      </div>
      {#if urlError}
        <p class="text-red-500 text-sm">{urlError}</p>
      {/if}
    </div>
  </div>

  <div class="max-w-xl grid grid-cols-3 w-full gap-6">
    {#each colors as color, index}
      <div>
        <label
          for="color-{index}"
          class="block text-sm font-medium leading-6 text-gray-900"
          >{color.label}</label
        >
        <div class="mt-2">
          <input
            type="color"
            bind:value={color.color}
            id="color-{index}"
            class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    {/each}
  </div>

  <div class="max-w-xl w-full grid grid-cols-2 gap-6">
    {#if state === "pending"}
      <button
        on:click={handleGenerate}
        type="button"
        class="rounded-md col-span-2 bg-cyan-600 px-3 w-full py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
        >Generate</button
      >
    {:else if state === "loading"}
      <button
        type="button"
        class="rounded-md col-span-2 bg-gray-300 px-3 w-full py-3 text-sm font-semibold text-gray-600 shadow-sm cursor-not-allowed flex items-center justify-center gap-4"
        disabled
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="animate-spin size-5"
          ><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path
            d="M18 12h4"
          /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path
            d="m4.9 19.1 2.9-2.9"
          /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /></svg
        >Loading...</button
      >
    {:else if state === "generated"}
      <div
        class="col-span-2 py-2 px-3 rounded border border-slate-300 bg-slate-50 text-slate-600"
      >
        {generatedUrl}
      </div>
      <button
        on:click={handleReset}
        type="button"
        class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 flex items-center justify-center gap-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-5"
          ><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path
            d="M3 3v5h5"
          /></svg
        >
        Reset</button
      >

      <button
        on:click={handleCopy}
        type="button"
        class="rounded-md bg-cyan-600 px-3 w-full py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 flex items-center justify-center gap-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-5"
          ><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path
            d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
          /></svg
        >
        {copied ? "Copied" : "Copy"}</button
      >
    {/if}
  </div>
</div>
