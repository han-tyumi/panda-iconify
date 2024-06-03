import {
  camelize,
  definePreset,
  pascalize,
  type Preset,
  type RecipeConfig,
  type SystemStyleObject,
} from "./deps.ts";
import { getIconCSSRules } from "./get_icon_css_rules.ts";
import { loadIconSets } from "./load.ts";

export interface Options {
  /**
   * The icon sets that you'd like to be defined as recipes.
   *
   * These must be made available through `@iconify/json`
   * or individual icon set packages (e.g., `@iconify-json/mdi`).
   */
  iconSets: string[];

  /**
   * Controls which recipes are defined.
   *
   * @default
   * ```js
   * { icon: true }
   * ```
   */
  define?: {
    /**
     * Defines an `icon` recipe where the `name` property takes a string
     * containing the icon prefix and name separated by a `:`.
     *
     * @example
     * ```js
     * import { icon } from '~/styled-system/recipes'
     * icon({ name: 'fa6-solid:address-book' })
     * ```
     */
    icon?: boolean;

    /**
     * Defines a recipe for each prefix.
     * The `name` property specifies the icon's name.
     *
     * @example
     * ```js
     * import { fa6Solid } from '~/styled-system/recipes'
     * fa6Solid({ name: 'address-book' })
     * ```
     */
    prefix?: boolean;

    /**
     * Defines a recipe for each icon using its prefix followed by its name.
     *
     * @example
     * ```js
     * import { fa6SolidAddressBook } from '~/styled-system/recipes'
     * fa6SolidAddressBook()
     * ```
     */
    prefixAndName?: boolean;
  };
}

export default async function createPreset(options: Options): Promise<Preset> {
  const iconSets = await loadIconSets(options.iconSets);

  const recipes: Record<string, Partial<RecipeConfig>> = {};
  const define = options.define ?? { icon: true };

  if (define.icon) {
    recipes.icon = {
      variants: {
        name: {},
      },
    };
  }

  for (const set of iconSets) {
    const camelizedPrefix = camelize(set.prefix);

    if (define.prefix) {
      recipes[camelizedPrefix] = {
        variants: {
          name: {},
        },
      };
    }

    for (const [name, icon] of Object.entries(set.icons)) {
      const systemStyleObject = getIconCSSRules(icon) as SystemStyleObject;

      if (define.prefixAndName) {
        recipes[camelizedPrefix + pascalize(name)] = {
          base: systemStyleObject,
        };
      }

      if (define.prefix) {
        recipes[camelizedPrefix].variants!.name[name] = systemStyleObject;
      }

      if (define.icon) {
        recipes.icon.variants!.name[set.prefix + ":" + name] =
          systemStyleObject;
      }
    }
  }

  return definePreset({
    theme: {
      extend: {
        recipes,
      },
    },
  });
}
