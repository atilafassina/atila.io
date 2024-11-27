interface Props {
  title: string
  subtitle: string
}

export function SectionHeader(props: Props) {
  return (
    <header class="grid md:grid-cols-[auto,1fr] gap-10">
      <h2 class="text-5xl text-neutral-800 font-thin dark:text-neutral-200">
        {props.title}
      </h2>
      <strong class="dark:text-neutral-400 text-neutral-600">
        {props.subtitle}
      </strong>
    </header>
  )
}
