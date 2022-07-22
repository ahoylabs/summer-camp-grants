import { AnchorWallet } from '@solana/wallet-adapter-react'
import Decimal from 'decimal.js-light'

import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { ContentSHA256 } from '../types/ContentSHA256'
import { Grant } from '../types/Grant'

interface Args {
  wallet: AnchorWallet
}

export const fetchAllGrants = async ({ wallet }: Args): Promise<Grant[]> => {
  const program = getGrantProgram(wallet, connection)
  const grants = await program.account.grant.all()
  return grants.map((g) => {
    const grant: Grant = {
      publicKey: g.publicKey,
      contentSha256: g.account.contentSha256 as ContentSHA256,
      initialAmountLamports: new Decimal(g.account.initialAmount.toString()),
    }
    return grant
  })
}
