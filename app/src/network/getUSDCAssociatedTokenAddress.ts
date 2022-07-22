import { utils } from '@project-serum/anchor'
import { getAssociatedTokenAddress } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

import { localFaucetProgram } from './getAirdropProgram'

export const getUSDCAssociatedTokenAddress = async (
  owner: PublicKey,
): Promise<PublicKey> => {
  const [mintPda] = await PublicKey.findProgramAddress(
    [Buffer.from(utils.bytes.utf8.encode('faucet-mint'))],
    localFaucetProgram, // hardcode this to USDC mint address for prod
  )

  return await getAssociatedTokenAddress(mintPda, owner)
}
