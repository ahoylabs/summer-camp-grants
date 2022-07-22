import { getAssociatedTokenAddress } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

import { NEXT_PUBLIC_USDC_MINT_ADDR } from '../__generated__/_env'

export const getUSDCAssociatedTokenAddress = async (
  owner: PublicKey,
): Promise<PublicKey> => {
  return await getAssociatedTokenAddress(
    new PublicKey(NEXT_PUBLIC_USDC_MINT_ADDR),
    owner,
  )
}
