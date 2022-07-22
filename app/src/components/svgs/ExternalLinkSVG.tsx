import type { FC } from 'react'

import type { WidthOnlySVGProps } from '../../types/widthOnlySVGProps'

export const ExternalLinkSVG: FC<WidthOnlySVGProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" height={props.width} {...props}>
    <path
      d="M6.1999 17.85L5.1499 16.8L15.4499 6.5H5.9999V5H17.9999V17H16.4999V7.55L6.1999 17.85Z"
      fill="currentColor"
    />
  </svg>
)
