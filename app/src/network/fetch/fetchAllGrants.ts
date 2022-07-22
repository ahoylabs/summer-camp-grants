import { AnchorWallet } from '@solana/wallet-adapter-react'

import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { formatGrant, Grant } from '../types/models/Grant'

interface Args {
  wallet: AnchorWallet
}

export const fetchAllGrants = async ({ wallet }: Args): Promise<Grant[]> => {
  const program = getGrantProgram(wallet, connection)
  const grants = await program.account.grant.all()
  return grants.map((g) => formatGrant(g.publicKey, g.account))
}
