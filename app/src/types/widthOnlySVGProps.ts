import React from 'react'

/**
 * to make dealing with SVGs easier, we only specify the `width` and
 * do the calculation in the component for `height`
 */
export type WidthOnlySVGProps = Omit<
  React.SVGProps<SVGSVGElement>,
  'height'
> & {
  width: number
}
