interface Props {
  title: string;
  index?: string;
}

export function SectionHeader(props: Props) {
  return (
    <header class="flex items-baseline justify-between mb-6">
      <h2 class="font-mono text-[15px] font-semibold uppercase tracking-[0.14em]">
        {props.title}
      </h2>
      {props.index && (
        <span class="font-mono text-xs text-dim">{props.index}</span>
      )}
    </header>
  );
}
