import { useWallet } from '@solana/wallet-adapter-react'
import React, { FC, useEffect } from 'react'

import { isHeapEnabled } from '../constants/environment'

export const AnalyticsWrapper: FC<{ children: typeof React.Children }> = (
  props,
) => {
  useHeapAnalytics()
  return <>{props.children}</>
}

const useHeapAnalytics = isHeapEnabled
  ? () => {
      const wallet = useWallet()

      useEffect(() => {
        if (wallet.connected && wallet.publicKey) {
          // this will only run when the wallet connection status changes
          window.heap.identify(wallet.publicKey.toBase58())
        }
      }, [wallet.connected, wallet.publicKey])
    }
  : () => {
      // no-op if heap is not enabled
    }
