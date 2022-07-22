import { useWallet } from '@solana/wallet-adapter-react'
import { useCallback, useEffect, useState } from 'react'

import { connection } from '../network/connection'
import { fetchUSDCBalance } from '../network/fetch/fetchUSDCBalance'

export const useConnectedWalletBalance = () => {
  const wallet = useWallet()

  const [solBalance, setSolBalance] = useState<number | null>(null)
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null)

  const refetch = useCallback(async () => {
    if (!wallet.publicKey || !wallet.connected) return
    const sol = await connection.getBalance(wallet.publicKey)
    const usdc = await fetchUSDCBalance(wallet.publicKey)
    setSolBalance(sol)
    setUsdcBalance(usdc)
  }, [wallet.connected, wallet.publicKey])

  useEffect(() => {
    ;(async () => await refetch())()
  }, [refetch])

  return [solBalance, usdcBalance, refetch] as const
}
