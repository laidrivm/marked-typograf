import { build } from "esbuild";

const sharedConfig = {
  entryPoints: ["src/index.js"],
  bundle: true,
  sourcemap: true,
  minify: true,
  external: ["marked"], // ToDo: add typograf here
};

async function buildAll() {
  await build({
    ...sharedConfig,
    format: "esm",
    outfile: "lib/index.mjs",
  });

  await build({
    ...sharedConfig,
    format: "cjs",
    outfile: "lib/index.cjs",
  });

  await build({
    ...sharedConfig,
    format: "umd",
    globalName: "markedTypograf",
    outfile: "lib/index.umd.js",
  });

  console.log("Build completed successfully!");
}

buildAll().catch(() => process.exit(1));