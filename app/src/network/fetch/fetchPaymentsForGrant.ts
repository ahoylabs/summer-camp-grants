import { BN } from '@project-serum/anchor'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { formatAsPayment, Payment } from '../types/models/Payment'

interface Args {
  grantAccount: PublicKey
  wallet: AnchorWallet
}

// look at all submissions where amountWon > 0
export const fetchPaymentsForGrant = async ({
  grantAccount,
  wallet,
}: Args): Promise<Payment[]> => {
  const program = getGrantProgram(wallet, connection)
  const submissions = await program.account.submission.all(
    grantAccount.toBuffer(),
  )
  return submissions
    .filter((s) => s.account.amountWon.gt(new BN(0)))
    .map((s) => formatAsPayment(s.publicKey, s.account))
}
