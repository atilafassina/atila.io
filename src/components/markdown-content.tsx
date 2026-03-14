import { type Component } from "solid-js";

interface MarkdownContentProps {
  html: string;
}

export const MarkdownContent: Component<MarkdownContentProps> = (props) => {
  return (
    <article
      class="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:underline [&_pre]:!bg-transparent [&_pre]:!p-4 prose-img:rounded-lg prose-h2:font-medium prose-h3:font-medium prose-h4:font-medium"
      innerHTML={props.html}
    />
  );
};
