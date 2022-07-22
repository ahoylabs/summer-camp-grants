import { PublicKey } from '@solana/web3.js'
import dayjs, { Dayjs } from 'dayjs'

import { AhoyGrants } from '../../../../../contract/target/types/ahoy_grants'
import { ContentSHA256 } from '../ContentSHA256'
import { TypedProgram } from '../typedProgram'

export interface Submission {
  contentSha256: ContentSHA256
  publicKey: PublicKey
  submittedAt: Dayjs
}

export type AnchorSubmission = Awaited<
  ReturnType<TypedProgram<AhoyGrants>['account']['submission']['fetch']>
>

export const formatSubmission = (
  pubkey: PublicKey,
  account: AnchorSubmission,
): Submission => {
  return {
    publicKey: pubkey,
    contentSha256: account.contentSha256 as ContentSHA256,
    submittedAt: dayjs.unix(account.submittedAt.toNumber()),
  }
}
