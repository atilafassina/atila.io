import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { MainLayout } from "~/components/main-layout";

export default function NotFound() {
  return (
    <MainLayout>
      <Title>404 :: Not Found</Title>
      <HttpStatusCode code={404} />
      <main class="grid place-items-center h-full align-center text-center">
        <div>
          <h1>Yikes! There's nothing here.</h1>
          <p>
            Maybe let's start from the beginning:{" "}
            <A
              href="/"
              class="font-mono dark:text-orange-200 text-orange-700 underline"
            >
              atila.io
            </A>
          </p>
        </div>
      </main>
    </MainLayout>
  );
}
