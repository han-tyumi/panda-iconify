import { build, emptyDir } from "./dev_deps.ts";

const outDir = "./npm";

await emptyDir(outDir);

// TODO: Unsure why exactly this existing causes issue with the build.
await emptyDir("./node_modules");

await build({
  entryPoints: ["./mod.ts"],
  outDir,
  shims: {
    deno: true,
  },
  typeCheck: "both",
  package: {
    name: "panda-iconify",
    version: Deno.args[0],
    description: "Iconify preset for Panda CSS",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/han-tyumi/panda-iconify.git",
    },
    bugs: {
      url: "https://github.com/han-tyumi/panda-iconify/issues",
    },
  },
});

Deno.copyFileSync("LICENSE.txt", `${outDir}/LICENSE.txt`);
Deno.copyFileSync("README.md", `${outDir}/README.md`);
