import { readdir, writeFile } from "fs/promises";
import { resolve } from "path";

const root = process.cwd();

function isRoute(fileName) {
  return !fileName.startsWith("[");
}

(async () => {
  const files = await readdir(resolve(root, "src", "routes"));

  const dynamicRoutes = await Promise.all(
    files.map(async (pageFile) => {
      return (
        isRoute(pageFile) && `https://atila.io/${pageFile.replace(".tsx", "")}`
      );
    })
  );

  await writeFile(
    `${root}/pages.codegen.json`,
    JSON.stringify(
      { pages: dynamicRoutes.filter((route) => Boolean(route)) },
      null,
      2
    ),
    "utf-8"
  );
})();
