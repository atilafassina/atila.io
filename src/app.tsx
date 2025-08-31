import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "@fontsource-variable/jost";
import "./global.css";
import { isServer } from "solid-js/web";
import posthog from "posthog-js";

const DEFAULT_METAS = {
  title: "Atila − Web Development",
  description: "Content hub of Atila Fassina.",
  image: import.meta.env.DEV
    ? "http://localhost:3000/public/og.png"
    : "https://atila.io/og.png",
};

if (
  !isServer &&
  !window.location.host.includes("127.0.0.1") &&
  !window.location.host.includes("localhost")
) {
  posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
    api_host: "https://eu.i.posthog.com",
  });
}

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>{DEFAULT_METAS.title}</Title>
          <Link
            rel="webmention"
            href="https://webmention.io/atila.io/webmention"
          />
          <Link rel="pingback" href="https://webmention.io/atila.io/xmlrpc" />
          <Meta property="description" content={DEFAULT_METAS.description} />
          <Meta property="og:title" content={DEFAULT_METAS.title} />
          <Meta property="og:description" content={DEFAULT_METAS.description} />
          <Meta property="og:image" content={DEFAULT_METAS.image} />
          <Meta property="og:type" content="website" />
          <Meta property="twitter:card" content="summary_large_image" />
          <Meta property="twitter:title" content={DEFAULT_METAS.title} />
          <Meta
            property="twitter:description"
            content={DEFAULT_METAS.description}
          />
          <Meta property="twitter:image" content={DEFAULT_METAS.image} />
          <Meta property="theme-color" content="#000000" />
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
