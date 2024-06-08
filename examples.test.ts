import { spawnSync } from 'node:child_process'
import { beforeAll, expect, it } from 'vitest'

beforeAll(() => {
  spawnSync('pnpm', ['build', '--no-dts'], { cwd: __dirname })
})

it.each(['cjs', 'esm'])('can be run with `panda codegen` in a %s project', (name) => {
  const exampleCwd = `./examples/${name}`
  spawnSync('pnpm', ['install'], { cwd: exampleCwd })
  const process = spawnSync('pnpm', ['panda', 'codegen', '--clean'], { cwd: exampleCwd })
  expect(process.error).toBeUndefined()
  expect(process.stdout.toString()).not.toMatch(/error/i)
  expect(process.status).toBe(0)
})
