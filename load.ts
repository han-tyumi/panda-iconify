import { IconifyJSONIconsData } from "./deps.ts";

async function importJSON<T>(id: string): Promise<T> {
  return (await import(id, { with: { type: "json" } })).default;
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
  );
}

export function loadIconSets(names: string[]): Promise<IconifyJSONIconsData[]> {
  return Promise.all(names.map(loadIconSet));
}
