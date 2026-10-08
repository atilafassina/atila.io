export const AtilaCard = () => {
  return (
    <header class="grid md:grid-cols-[1fr_auto] gap-11 items-center pt-[50px] pb-[34px] border-b border-rule">
      <div>
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-dim">
          Productivity &amp; Data-Intensive Apps
        </p>
        <h1 class="mt-3 mb-[18px] text-[clamp(52px,11vw,132px)] font-semibold leading-[0.92] tracking-[-0.05em]">
          Atila
          <br />
          Fassina
          <span class="sr-only"> — engineer and speaker</span>
        </h1>
        <p class="text-[clamp(19px,2.4vw,24px)] text-dim max-w-[40ch]">
          <b class="font-medium text-ink">Engineer</b> &amp;{" "}
          <b class="font-medium text-ink">speaker</b> — building
          productivity tools and data-intensive apps, with AI where it earns
          its keep, not as a personality.
        </p>
        <ul class="flex flex-wrap items-center gap-x-4 gap-y-2.5 mt-[22px] font-mono text-xs uppercase tracking-[0.06em]">
          <li class="border-[1.5px] border-ink px-[11px] py-[5px]">
            SolidJS core team
          </li>
          {/*
          <li>
            <a
              href="/xavier"
              class="block border-[1.5px] border-ink bg-ink text-paper px-[11px] py-[5px] transition-colors hover:bg-paper hover:text-ink focus-visible:bg-paper focus-visible:text-ink"
            >
              Building Xavier →
            </a>
          </li>
          */}
        </ul>
        {/* <p class="mt-3 font-mono text-xs">currently: more on camera</p> */}
      </div>
      <div class="order-first md:order-last w-[132px] h-[132px] md:w-[210px] md:h-[210px] rounded-full overflow-hidden border-2 border-ink bg-white shrink-0">
        <img
          class="block w-full h-full object-cover object-[center_22%] grayscale scale-[1.06] hover:grayscale-0 hover:scale-[1.16] motion-safe:transition-all motion-safe:duration-500"
          src="/avatar-nobg.png"
          alt="Atila's face"
        />
      </div>
    </header>
  );
};
