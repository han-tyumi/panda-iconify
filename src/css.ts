import type { IconifyIcon } from '@iconify/types'
import type { IconCSSCommonCodeOptions } from '@iconify/utils/lib/css/types'
import {
  generateItemCSSRules,
  getCommonCSSRules,
} from '@iconify/utils/lib/css/common'
import { defaultIconProps } from '@iconify/utils/lib/icon/defaults'

export function getIconCSSRules(icon: IconifyIcon): Record<string, string> {
  const options: IconCSSCommonCodeOptions = {
    mode: 'mask',
    varName: 'svg',
  }

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
  }
}
