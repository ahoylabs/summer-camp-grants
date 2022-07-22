import { PublicKey } from '@solana/web3.js'
import Decimal from 'decimal.js-light'

import { ContentSHA256 } from './ContentSHA256'

export interface Grant {
  contentSha256: ContentSHA256
  initialAmountLamports: Decimal
  publicKey: PublicKey
}
