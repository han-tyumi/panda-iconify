import { expect, it } from 'vitest'

import { loadIconSet, loadIconSets } from './load.js'

it('loads an icon set', async () => {
  const name = 'fa6-solid'
  const iconSet = await loadIconSet(name)
  expect(iconSet.prefix).toStrictEqual(name)
})

it('throws an error when an icon set is not found', async () => {
  const name = 'unknown'
  await expect(loadIconSet(name)).rejects.toThrowError(name)
})

it('loads multiple icon sets', async () => {
  const names = ['fa6-solid', 'mdi']
  const iconSets = await loadIconSets(names)
  expect(iconSets.map(set => set.prefix)).toEqual(names)
})
