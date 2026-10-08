const links = [
  { label: "Twitter", href: "https://x.com/atilafassina", rel: "me" },
  { label: "Bluesky", href: "https://atila.io/bsky", rel: "me" },
  { label: "GitHub", href: "https://github.com/atilafassina", rel: "me" },
  { label: "YouTube", href: "https://atila.io/youtube", rel: "" },
  { label: "LinkedIn", href: "https://atila.io/linkedin", rel: "me" },
];

export const SocialFooter = () => {
  return (
    <footer class="flex flex-wrap items-center justify-between gap-4 pt-[34px] pb-[60px]">
      <ul class="flex flex-wrap gap-5 label">
        {links.map((link) => (
          <li>
            <a
              href={link.href}
              rel={`${link.rel} noopener noreferrer`.trim()}
              class="text-ink border-b-[1.5px] border-transparent hover:border-ink"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p class="font-mono text-xs text-dim">
        © {new Date().getFullYear()} Atila Fassina
      </p>
    </footer>
  );
};
