# panda-iconify

A [Panda CSS](https://github.com/chakra-ui/panda) preset which adds
[Iconify](https://github.com/iconify/iconify) recipes for the icon sets you
specify.

## Installation

```bash
npm install --save-dev panda-iconify
```

## Usage

Import or require the plugin and add it to your `presets`.

You must specify the `iconSets` you wish to use.

Make sure you have installed either each set individually (e.g.,
`@iconify-json/mdi`) or `@iconify/json`.

```js
import { defineConfig } from '@pandacss/dev'
import pandaIconify from 'panda-iconify'

export default defineConfig({
  presets: [
    pandaIconify({ iconSets: ['fa6-solid', 'fa6-brands', 'mdi'] }),
  ],
})
```

### Recipes

You can enable different `recipes` for specifying icons.

```js
pandaIconify({
  iconSets: ['fa6-solid'],
  recipes: {
    icon: true,
    prefix: true,
    prefixAndName: true,
  },
})
```

#### `icon`

Defines an `icon` recipe where the `name` property takes a string
containing the icon prefix and name separated by a `:`.

This is the default recipe if `recipes` is not defined.

```js
import { icon } from '~/styled-system/recipes'

icon({ name: 'fa6-solid:address-book' })
```

#### `prefix`

Defines a recipe for each prefix.
The `name` property specifies the icon's name.

```js
import { fa6Solid } from '~/styled-system/recipes'

fa6Solid({ name: 'address-book' })
```

#### `prefixAndName`

Defines a recipe for each icon using its prefix followed by its name.

```js
import { fa6SolidAddressBook } from '~/styled-system/recipes'

fa6SolidAddressBook()
```
