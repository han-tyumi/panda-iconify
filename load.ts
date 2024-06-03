import { createRequire, IconifyJSONIconsData } from "./deps.ts";

const _require = createRequire(import.meta.url);

function importJSON<T>(id: string): T {
  const path = _require.resolve(id);
  const json = Deno.readTextFileSync(path);
  return JSON.parse(json);
}

export function loadIconSet(name: string): IconifyJSONIconsData {
  const errors = [];

  try {
    return importJSON(`@iconify-json/${name}/icons.json`);
  } catch (error) {
    errors.push(error);
  }

  try {
    return importJSON(`@iconify/json/json/${name}.json`);
  } catch (error) {
    errors.push(error);
  }

  throw new Error(
    `Could not find '${name}' icon set\n` + errors.map(String).join("\n"),
  );
}

export function loadIconSets(names: string[]): IconifyJSONIconsData[] {
  return names.map(loadIconSet);
}
