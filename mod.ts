import {
  definePreset,
  type Preset,
  type RecipeConfig,
  type SystemStyleObject,
} from "./deps.ts";
import { getIconCSSRules } from "./get_icon_css_rules.ts";
import { loadIconSets } from "./load.ts";

export interface Options {
  sets: string[];
}

export default async function createPreset(options: Options): Promise<Preset> {
  const iconSets = await loadIconSets(options.sets);

  const recipes: Record<string, Partial<RecipeConfig>> = {
    icon: {
      variants: {
        name: {},
      },
    },
  };

  for (const set of iconSets) {
    recipes[set.prefix] = {
      variants: {
        name: {},
      },
    };

    for (const [name, icon] of Object.entries(set.icons)) {
      const systemStyleObject = getIconCSSRules(icon) as SystemStyleObject;

      // TODO: Support prefixes?
      recipes[set.prefix + "-" + name] = {
        base: systemStyleObject,
      };

      recipes[set.prefix].variants!.name[name] = systemStyleObject;

      recipes.icon.variants!.name[set.prefix + ":" + name] = systemStyleObject;
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

// const preset = await createPreset({ sets: ['fa6-solid', 'mdi'] })
// console.log(Object.keys(preset.theme?.extend?.recipes ?? {}))
