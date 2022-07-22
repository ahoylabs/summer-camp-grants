import { AnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { formatGrant } from '../types/models/Grant'

interface Args {
  grantPubkey: PublicKey
  wallet: AnchorWallet
}

export const fetchGrant = async ({ grantPubkey, wallet }: Args) => {
  const program = getGrantProgram(wallet, connection)
  const grantAccount = await program.account.grant.fetch(grantPubkey)
  return formatGrant(grantPubkey, grantAccount)
}
