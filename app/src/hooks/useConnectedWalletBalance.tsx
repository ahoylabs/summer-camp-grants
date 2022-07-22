import { useWallet } from '@solana/wallet-adapter-react'
import { useCallback, useEffect, useState } from 'react'

import { connection } from '../network/connection'

export const useConnectedWalletBalance = () => {
  const wallet = useWallet()

  const [walletBalance, setWalletBalance] = useState<number | null>(null)

  const refetch = useCallback(async () => {
    if (!wallet.publicKey || !wallet.connected) return
    const balance = await connection.getBalance(wallet.publicKey)
    setWalletBalance(balance)
  }, [wallet.connected, wallet.publicKey])

  useEffect(() => {
    ;(async () => await refetch())()
  }, [refetch])

  return [walletBalance, refetch] as const
}
