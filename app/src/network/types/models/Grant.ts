import { PublicKey } from '@solana/web3.js'
import dayjs, { Dayjs } from 'dayjs'
import Decimal from 'decimal.js-light'

import { AhoyGrants } from '../../../../../contract/target/types/ahoy_grants'
import { ContentSHA256 } from '../ContentSHA256'
import { TypedProgram } from '../typedProgram'

export interface Grant {
  contentSha256: ContentSHA256
  createdAt: Dayjs
  initialAmountLamports: Decimal
  publicKey: PublicKey
}

type AnchorGrant = Awaited<
  ReturnType<TypedProgram<AhoyGrants>['account']['grant']['fetch']>
>

export const formatGrant = (pubkey: PublicKey, account: AnchorGrant): Grant => {
  return {
    publicKey: pubkey,
    contentSha256: account.contentSha256 as ContentSHA256,
    initialAmountLamports: new Decimal(account.initialAmount.toString()),
    createdAt: dayjs.unix(account.createdAt.toNumber()),
  }
}
