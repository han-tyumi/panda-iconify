import { readFileSync } from 'node:fs'
import type { IconifyJSONIconsData } from '@iconify/types'

async function importJSON<T>(id: string): Promise<T> {
  const path = require.resolve(id)
  const json = readFileSync(path, { encoding: 'utf8' })
  return JSON.parse(json)
}

export async function loadIconSet(
  prefix: string,
): Promise<IconifyJSONIconsData> {
  const errors = []

  try {
    return await importJSON(`@iconify/json/json/${prefix}.json`)
  }
  catch (error) {
    errors.push(error)
  }

  try {
    return await importJSON(`@iconify-json/${prefix}/icons.json`)
  }
  catch (error) {
    errors.push(error)
  }

  throw new Error(
    `Could not find '${prefix}' icon set\n${errors.map(String).join('\n')}`,
  )
}

export function loadIconSets(
  prefixes: string[],
): Promise<IconifyJSONIconsData[]> {
  return Promise.all(prefixes.map(loadIconSet))
}
