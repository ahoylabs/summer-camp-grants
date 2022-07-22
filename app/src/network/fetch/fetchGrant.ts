import { AnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import Decimal from 'decimal.js-light'

import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { ContentSHA256 } from '../types/ContentSHA256'
import { Grant } from '../types/Grant'

interface Args {
  grantPubkey: PublicKey
  wallet: AnchorWallet
}

export const fetchGrant = async ({ grantPubkey, wallet }: Args) => {
  const program = getGrantProgram(wallet, connection)
  const grantAccount = await program.account.grant.fetch(grantPubkey)

  const grant: Grant = {
    publicKey: grantPubkey,
    contentSha256: grantAccount.contentSha256 as ContentSHA256,
    initialAmountLamports: new Decimal(grantAccount.initialAmount.toString()),
  }

  return grant
}
