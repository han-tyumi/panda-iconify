import {
  assertEquals,
  assertRejects,
  assertStrictEquals,
} from "./test_deps.ts";

import { loadIconSet, loadIconSets } from "./load.ts";

Deno.test("loads an icon set", async () => {
  const name = "fa6-solid";
  const iconSet = await loadIconSet(name);
  assertStrictEquals(iconSet.prefix, name);
});

Deno.test("throws an error when an icon set is not found", async () => {
  const name = "unknown";
  await assertRejects(() => loadIconSet(name), name);
});

Deno.test("loads multiple icon sets", async () => {
  const names = ["fa6-solid", "mdi"];
  const iconSets = await loadIconSets(names);
  assertEquals(
    iconSets.map((set) => set.prefix),
    names,
  );
});
