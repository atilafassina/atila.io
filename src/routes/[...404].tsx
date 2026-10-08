import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { MainLayout } from "~/components/main-layout";

export default function NotFound() {
  return (
    <MainLayout>
      <Title>404 :: Not Found</Title>
      <HttpStatusCode code={404} />
      <section class="py-24">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-dim">
          404
        </p>
        <h1 class="mt-3 text-[clamp(40px,8vw,88px)] font-semibold leading-[0.95] tracking-[-0.05em]">
          Yikes! There's nothing here.
        </h1>
        <p class="mt-6 text-xl text-dim">
          Maybe let's start from the beginning:{" "}
          <A href="/" class="link-inv">
            atila.io
          </A>
        </p>
      </section>
    </MainLayout>
  );
}
