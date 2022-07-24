import type { FC } from 'react'

import type { WidthOnlySVGProps } from '../../types/widthOnlySVGProps'

export const ChevronLeftSVG: FC<WidthOnlySVGProps> = (props) => (
  <svg height={props.width} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M17.5101 3.8701L15.7301 2.1001L5.84009 12.0001L15.7401 21.9001L17.5101 20.1301L9.38009 12.0001L17.5101 3.8701Z"
      fill="currentColor"
    />
  </svg>
)
