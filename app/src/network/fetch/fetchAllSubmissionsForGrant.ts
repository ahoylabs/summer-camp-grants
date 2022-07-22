import { AnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { Submission } from '../types/Submission'
import { formatSubmission } from './../types/Submission'

interface Args {
  grantAccount: PublicKey
  wallet: AnchorWallet
}

export const fetchAllSubmissionsForGrant = async ({
  grantAccount,
  wallet,
}: Args): Promise<Submission[]> => {
  const program = getGrantProgram(wallet, connection)
  const submissions = await program.account.submission.all(
    grantAccount.toBuffer(),
  )
  return submissions.map((s) => formatSubmission(s.publicKey, s.account))
}
