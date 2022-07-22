import { AnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { formatSubmission } from '../types/Submission'

interface Args {
  submissionPubkey: PublicKey
  wallet: AnchorWallet
}

export const fetchSubmission = async ({ submissionPubkey, wallet }: Args) => {
  const program = getGrantProgram(wallet, connection)
  const account = await program.account.submission.fetch(submissionPubkey)
  return formatSubmission(submissionPubkey, account)
}
