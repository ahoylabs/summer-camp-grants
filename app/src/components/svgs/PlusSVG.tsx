import type { FC } from 'react'

import type { WidthOnlySVGProps } from '../../types/widthOnlySVGProps'

export const PlusSVG: FC<WidthOnlySVGProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" height={props.width} {...props}>
    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor" />
  </svg>
)
