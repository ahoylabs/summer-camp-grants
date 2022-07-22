import { utils } from '@project-serum/anchor'
import { getAssociatedTokenAddress } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

import { NEXT_PUBLIC_USDC_MINT_ADDR } from '../__generated__/_env'

export const getUSDCAssociatedTokenAddress = async (
  owner: PublicKey,
): Promise<PublicKey> => {
  const [mintPda] = await PublicKey.findProgramAddress(
    [Buffer.from(utils.bytes.utf8.encode('faucet-mint'))],
    new PublicKey(NEXT_PUBLIC_USDC_MINT_ADDR),
  )
  return await getAssociatedTokenAddress(mintPda, owner)
}
