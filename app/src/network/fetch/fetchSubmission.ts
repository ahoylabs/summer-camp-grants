import { AnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import axios, { AxiosResponse } from 'axios'
import { urls } from '../../constants/urls'

import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { contentSha256ToIpfsCID } from '../ipfs/convertContentSha256'
import { SubmissionForIPFS } from '../ipfs/types'
import { ContentSHA256 } from '../types/ContentSHA256'
import { formatSubmission } from '../types/models/Submission'

interface Args {
  submissionPubkey: PublicKey
  wallet: AnchorWallet
}

export const fetchSubmission = async ({ submissionPubkey, wallet }: Args) => {
  const program = getGrantProgram(wallet, connection)
  const account = await program.account.submission.fetch(submissionPubkey)
  const res: AxiosResponse = await axios.get(
    urls.ipfs(contentSha256ToIpfsCID(account.contentSha256 as ContentSHA256)),
  )
  const ipfsSubmission: SubmissionForIPFS = res.data
  return formatSubmission(submissionPubkey, account, ipfsSubmission)
}
