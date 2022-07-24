import { AnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import axios, { AxiosResponse } from 'axios'

import { urls } from '../../constants/urls'
import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { contentSha256ToIpfsCID } from '../ipfs/convertContentSha256'
import { SubmissionForIPFS } from '../ipfs/types'
import { ContentSHA256 } from '../types/ContentSHA256'
import { Submission } from '../types/models/Submission'
import { formatSubmission } from '../types/models/Submission'

interface Args {
  grantAccount: PublicKey
  wallet: AnchorWallet
}

export const fetchAllSubmissionsForGrant = async ({
  grantAccount,
  wallet,
}: Args): Promise<Submission[]> => {
  const program = getGrantProgram(wallet, connection)
  const rawSubmissions = await program.account.submission.all(
    grantAccount.toBuffer(),
  )
  const submissions: Submission[] = []
  for (const s of rawSubmissions) {
    // definitely not ideal to be firing off this many network calls,
    // but for the time being we won't have that many grants...
    const res: AxiosResponse = await axios.get(
      urls.ipfs(
        contentSha256ToIpfsCID(s.account.contentSha256 as ContentSHA256),
      ),
    )
    const grant = formatSubmission(
      s.publicKey,
      s.account,
      res.data as SubmissionForIPFS,
    )
    submissions.push(grant)
  }
  return submissions
}
