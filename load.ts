import { type IconifyJSONIconsData } from "./deps.ts";

async function importJSON<T>(id: string): Promise<T> {
  return (await import(id, { with: { type: "json" } })).default;
}

export async function loadIconSet(
  prefix: string,
): Promise<IconifyJSONIconsData> {
  const errors = [];

  try {
    return await importJSON(`@iconify-json/${prefix}/icons.json`);
  } catch (error) {
    errors.push(error);
  }

  try {
    return await importJSON(`@iconify/json/json/${prefix}.json`);
  } catch (error) {
    errors.push(error);
  }

  throw new Error(
    `Could not find '${prefix}' icon set\n` + errors.map(String).join("\n"),
  );
}

export function loadIconSets(
  prefixes: string[],
): Promise<IconifyJSONIconsData[]> {
  return Promise.all(prefixes.map(loadIconSet));
}
