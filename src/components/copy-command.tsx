import { createSignal } from "solid-js";

export const CopyCommand = (props: { command: string }) => {
  const [copied, setCopied] = createSignal(false);

  const copy = async () => {
    await navigator.clipboard.writeText(props.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div class="flex items-stretch border-[1.5px] border-ink bg-panel">
      <code class="flex-1 overflow-x-auto whitespace-nowrap px-4 py-3.5 font-mono text-[13px]">
        <span class="text-dim select-none">$ </span>
        {props.command}
      </code>
      <button
        type="button"
        onClick={copy}
        class="label shrink-0 border-l-[1.5px] border-ink bg-ink px-4 text-paper transition-colors hover:bg-paper hover:text-ink"
      >
        {copied() ? "copied ✓" : "copy"}
      </button>
    </div>
  );
};
