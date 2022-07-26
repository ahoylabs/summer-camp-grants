import { utils } from '@project-serum/anchor'
import { getAssociatedTokenAddress } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

import {
  NEXT_PUBLIC_SOLANA_CLUSTER,
  NEXT_PUBLIC_USDC_MINT_ADDR,
} from './../__generated__/_env'
import { localFaucetProgram } from './getFaucetProgram'

export const getUSDCAssociatedTokenAddress = async (
  owner: PublicKey,
): Promise<PublicKey> => {
  if (NEXT_PUBLIC_SOLANA_CLUSTER !== 'mainnet') {
    // use the custom faucet program
    const [mintPda] = await PublicKey.findProgramAddress(
      [Buffer.from(utils.bytes.utf8.encode('faucet-mint'))],
      localFaucetProgram,
    )
    return await getAssociatedTokenAddress(mintPda, owner)
  }

  return await getAssociatedTokenAddress(
    new PublicKey(NEXT_PUBLIC_USDC_MINT_ADDR),
    owner,
  )
}
