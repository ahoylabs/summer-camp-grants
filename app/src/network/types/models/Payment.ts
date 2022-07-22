import { PublicKey } from '@solana/web3.js'
import dayjs, { Dayjs } from 'dayjs'

import { ContentSHA256 } from './../../../../../contract/tests/utils/types/ContentSHA256'
import { convertUnitsToUSDC } from './../../convertUSDC'
import { AnchorSubmission } from './Submission'

export interface Payment {
  contentSha256: ContentSHA256
  paidToPubkey: PublicKey
  submissionPubkey: PublicKey
  usdcPaid: number
  wonAt: Dayjs
}

export const formatAsPayment = (
  pubkey: PublicKey,
  account: AnchorSubmission,
): Payment => {
  return {
    submissionPubkey: pubkey,
    contentSha256: account.contentSha256 as ContentSHA256,
    usdcPaid: convertUnitsToUSDC(account.amountWon.toNumber()),
    paidToPubkey: account.payTo,
    wonAt: dayjs.unix(account.wonAt.toNumber()),
  }
}
