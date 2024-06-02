import {
  defaultIconProps,
  generateItemCSSRules,
  getCommonCSSRules,
  type IconCSSCommonCodeOptions,
  type IconifyIcon,
} from "./deps.ts";

export function getIconCSSRules(icon: IconifyIcon): Record<string, string> {
  const options: IconCSSCommonCodeOptions = {
    mode: "mask",
    varName: "svg",
  };

  return {
    ...getCommonCSSRules(options),
    ...generateItemCSSRules(
      {
        ...defaultIconProps,
        ...icon,
        body: icon.body,
      },
      options,
    ),
  };
}
