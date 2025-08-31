// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body class="sand bg-neutral-100 bg-[length:22px_22px] dark:bg-[length:400%_400%] dark:bg-dark dark:animate-bkg-move">
          <div
            id="app"
            class="sand bg-neutral-100 bg-[length:22px_22px] dark:bg-[length:400%_400%] dark:bg-dark dark:animate-bkg-move"
          >
            {children}
          </div>
          {scripts}
          <script>
            {`
  const theme = (() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme")
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }
    return "light"
  })()  

  if (theme === "light") {
    document.documentElement.classList.remove("dark")
  } else {
    document.documentElement.classList.add("dark")
  }
  window.localStorage.setItem("theme", String(theme))

`}
          </script>
        </body>
      </html>
    )}
  />
));
