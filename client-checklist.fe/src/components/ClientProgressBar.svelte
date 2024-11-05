<script lang="ts">

export let NotStarted: string = '0%';
export let InProgress: string = '0%';
export let Completed: string = '0%';

// @ts-ignore
function createKeyframes(name, fromWidth, toWidth) {
  const styleSheet = document.styleSheets[0];
  const keyframes = `
    @keyframes ${name} {
      from { width: ${fromWidth}; }
      to { width: ${toWidth}; }
    }
  `;

  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}

// Create the keyframes
createKeyframes('fillAnimation1', '0%', NotStarted);
createKeyframes('fillAnimation2', '0%', InProgress);
createKeyframes('fillAnimation3', '0%', Completed);

</script>

<div class="mt-6 w-full h-5 bg-[#e0e0e0] rounded-[10px] overflow-hidden border border-[#ccc] flex">
  <div class="h-full transition-[width] duration-1000 ease-in-out flex items-center justify-center relative w-0 fill-1">
    <span class="absolute text-[12px] text-white font-bold whitespace-nowrap z-[1] pointer-events-none">{NotStarted}</span>
  </div>
  <div class="h-full transition-[width] duration-1000 ease-in-out flex items-center justify-center relative w-0 fill-2">
    <span class="absolute text-[12px] text-white font-bold whitespace-nowrap z-[1] pointer-events-none">{InProgress}</span>
  </div>
  <div class="h-full transition-[width] duration-1000 ease-in-out flex items-center justify-center relative w-0 fill-3">
    <span class="absolute text-[12px] text-white font-bold whitespace-nowrap z-[1] pointer-events-none">{Completed}</span>
  </div>
</div>

<div class="flex flex-row mt-[10px]">
    <div class="flex flex-row">
      <div class="w-[12px] h-[12px] rounded-[10px] self-center mx-[10px] my-0" style="background-color: #BDBBBB;"></div>
      <span class="text-[#524F4F] text-center text-[14px] italic font-semibold leading-none">Not Started</span>
    </div>
    <div class="flex flex-row">
      <div class="w-[12px] h-[12px] rounded-[10px] self-center mx-[10px] my-0" style="background-color: #EF7E1D;"></div>
      <span class="text-[#524F4F] text-center text-[14px] italic font-semibold leading-none">In Progress</span>
    </div>
    <div class="flex flex-row">
      <div class="w-[12px] h-[12px] rounded-[10px] self-center mx-[10px] my-0" style="background-color: #2DBE22;"></div>
      <span class="text-[#524F4F] text-center text-[14px] italic font-semibold leading-none">Completed</span>
    </div>
</div>

<style>
  .fill-1 {
    background-color: #bdbbbb;
    animation: fillAnimation1 3s forwards;
  }

  .fill-2 {
    background-color: #ef7e1d;
    animation: fillAnimation2 3s 1s forwards;
  }

  .fill-3 {
    background-color: #2dbe22;
    animation: fillAnimation3 3s 2s forwards;
  }
</style>
