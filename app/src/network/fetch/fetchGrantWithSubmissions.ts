import { AnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { formatGrant } from '../types/models/Grant'
import { fetchAllSubmissionsForGrant } from './fetchAllSubmissionsForGrant'

interface Args {
  grantPubkey: PublicKey
  wallet: AnchorWallet
}

export const fetchGrantWithSubmissions = async ({
  grantPubkey,
  wallet,
}: Args) => {
  const program = getGrantProgram(wallet, connection)
  const grantAccount = await program.account.grant.fetch(grantPubkey)
  const grant = formatGrant(grantPubkey, grantAccount)
  const submissions = await fetchAllSubmissionsForGrant({
    grantAccount: grantPubkey,
    wallet,
  })
  return [grant, submissions] as const
}
