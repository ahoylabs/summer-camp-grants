import { PublicKey } from '@solana/web3.js'
import dayjs, { Dayjs } from 'dayjs'
import Decimal from 'decimal.js-light'

import { SubmissionForIPFS } from '../../ipfs/types'
import { TypedProgram } from '../typedProgram'
import { AhoyGrants } from './../../../__generated__/ahoy_grants'

export interface Submission {
  amountWon: Decimal
  grant: PublicKey
  info: SubmissionForIPFS
  payTo: PublicKey
  publicKey: PublicKey
  submittedAt: Dayjs
  wonAt: Dayjs
}

export type AnchorSubmission = Awaited<
  ReturnType<TypedProgram<AhoyGrants>['account']['submission']['fetch']>
>

export const formatSubmission = (
  pubkey: PublicKey,
  account: AnchorSubmission,
  submissionInfo: SubmissionForIPFS,
): Submission => {
  console.log(account)

  return {
    amountWon: new Decimal(account.amountWon.toString()),
    grant: account.grant,
    info: submissionInfo,
    payTo: account.payTo,
    publicKey: pubkey,
    submittedAt: dayjs.unix(account.submittedAt.toNumber()),
    wonAt: dayjs.unix(account.wonAt.toNumber()),
  }
}
