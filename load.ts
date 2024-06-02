import type { IconifyJSONIconsData } from "./deps.ts";

async function importJSON(path: string) {
  return (await import(path, { with: { type: "json" } })).default;
}

export async function loadIconSet(name: string): Promise<IconifyJSONIconsData> {
  const errors = [];

  try {
    return await importJSON(`@iconify-json/${name}/icons.json`);
  } catch (error) {
    errors.push(error);
  }

  try {
    return await importJSON(`@iconify/json/json/${name}.json`);
  } catch (error) {
    errors.push(error);
  }

  throw new Error(
    `Could not find '${name}' icon set\n` + errors.map(String).join("\n"),
    { cause: errors },
  );
}

export function loadIconSets(names: string[]): Promise<IconifyJSONIconsData[]> {
  return Promise.all(names.map(loadIconSet));
}
