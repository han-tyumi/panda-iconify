import { build, emptyDir } from "./dev_deps.ts";

const outDir = "./npm";

await emptyDir(outDir);

await build({
  entryPoints: ["./mod.ts"],
  outDir,
  scriptModule: false,
  testPattern: "*_test.ts",
  shims: {
    deno: true,
  },
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

async function testExample(name: string) {
  console.log(`\nVerifying 'panda codegen' works for ${name} example...`);
  const cmd = new Deno.Command("pnpm", {
    args: ["panda", "codegen", "--clean"],
    cwd: `examples/${name}`,
    stdout: "inherit",
    stderr: "inherit",
  });
  await cmd.output();
}

await testExample("esm");
