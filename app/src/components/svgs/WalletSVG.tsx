import type { FC } from 'react'

import { WidthOnlySVGProps } from '../../types/widthOnlySVGProps'

export const WalletSVG: FC<WidthOnlySVGProps> = (props) => (
  <svg
    height={props.width}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 2.667H4a2.666 2.666 0 0 0-2.667 2.666v5.334A2.666 2.666 0 0 0 4 13.333h8a2.666 2.666 0 0 0 2.667-2.666V5.333A2.666 2.666 0 0 0 12 2.667zM10.76 9.18c-.16.133-.38.187-.587.133L2.767 7.5c.2-.487.673-.833 1.233-.833h8c.447 0 .84.226 1.087.56L10.76 9.18zM4 4h8c.733 0 1.333.6 1.333 1.333V5.7A2.664 2.664 0 0 0 12 5.333H4c-.487 0-.94.14-1.333.367v-.367C2.667 4.6 3.267 4 4 4z"
      fill="currentColor"
    />
  </svg>
)
