import { PublicKey } from '@solana/web3.js'
import dayjs, { Dayjs } from 'dayjs'

import { AhoyGrants } from '../../../__generated__/ahoy_grants'
import { convertUnitsToUSDC } from '../../convertUSDC'
import { GrantForIPFS } from '../../ipfs/types'
import { ContentSHA256 } from '../ContentSHA256'
import { TypedProgram } from '../typedProgram'

export interface Grant {
  associatedUSDCTokenAccount: PublicKey
  contentSha256: ContentSHA256
  createdAt: Dayjs
  info: GrantForIPFS
  initialAmountUSDC: number
  publicKey: PublicKey
}

export type AnchorGrant = Awaited<
  ReturnType<TypedProgram<AhoyGrants>['account']['grant']['fetch']>
>

export const formatGrant = (
  pubkey: PublicKey,
  account: AnchorGrant,
  grantInfo: GrantForIPFS,
): Grant => {
  return {
    associatedUSDCTokenAccount: account.wallet,
    publicKey: pubkey,
    contentSha256: account.contentSha256 as ContentSHA256,
    info: grantInfo,
    initialAmountUSDC: convertUnitsToUSDC(account.initialAmount.toNumber()),
    createdAt: dayjs.unix(account.createdAt.toNumber()),
  }
}
