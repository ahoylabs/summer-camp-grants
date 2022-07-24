import { getAccount } from '@solana/spl-token'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'

import { connection } from '../network/connection'
import { convertUnitsToUSDC } from '../network/convertUSDC'
import { fetchGrantWithSubmissions } from '../network/fetch/fetchGrantWithSubmissions'
import { Grant } from '../network/types/models/Grant'
import { Submission } from '../network/types/models/Submission'
import { anchorWalletWithFallback } from '../utils/anchorWalletWithFallback'

export const useGrantWithSubmissions = (
  uid: string,
  wallet: AnchorWallet | undefined,
) => {
  const [grant, setGrant] = useState<Grant | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [usdcBalance, setUsdcBalance] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      if (!uid) return
      const isValidPubkey = PublicKey.isOnCurve(uid as string)
      if (!isValidPubkey) {
        console.warn('Not a valid grant account.')
      }

      const { grant, submissions } = await fetchGrantWithSubmissions({
        grantPubkey: new PublicKey(uid as string),
        wallet: anchorWalletWithFallback(wallet),
      })
      setGrant(grant)
      setSubmissions(submissions)

      try {
        const account = await getAccount(
          connection,
          grant.associatedUSDCTokenAccount,
        )
        const balanceUSDC = convertUnitsToUSDC(account.amount)
        setUsdcBalance(balanceUSDC)
      } catch (error) {
        // there's a chance the ATA could have been destroyed
        setUsdcBalance(0)
      }
      setLoading(false)
    })()
  }, [uid, wallet])

  return [grant, submissions, usdcBalance, loading] as const
}
