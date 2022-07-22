import { BN, utils } from '@project-serum/anchor'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from '@solana/spl-token'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { FC } from 'react'

import { connection } from '../network/connection'
import { getAirdropProgram } from '../network/getAirdropProgram'

export const Airdrop: FC = () => {
  const wallet = useAnchorWallet()

  const airdrop = async () => {
    if (!wallet) return

    const program = getAirdropProgram(wallet, connection)

    const [mintPda, mintPdaBump] = await PublicKey.findProgramAddress(
      [Buffer.from(utils.bytes.utf8.encode('faucet-mint'))],
      new PublicKey(program.programId),
    )
    const grantCreatorATA = await getAssociatedTokenAddress(
      mintPda,
      wallet.publicKey,
    )

    // get 10 SOL for fees
    await connection.requestAirdrop(wallet.publicKey, 1_000_000_000)

    // initialize faucet
    const initializeIx = await program.methods
      .initializeFaucet(mintPdaBump)
      .accounts({
        mint: mintPda,
        payer: wallet.publicKey,
      })
      .instruction()

    // get 50 simulated USDC
    await program.methods
      .airdrop(mintPdaBump, new BN(50_000_000))
      .accounts({
        destination: grantCreatorATA,
        mint: mintPda,
        payer: wallet.publicKey,
        receiver: wallet.publicKey,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .preInstructions([initializeIx])
      .rpc()
  }

  return (
    <>
      <button onClick={airdrop} style={{ border: '1px solid black' }}>
        Airdrop 50 Fake USDC and 1 SOL
      </button>
    </>
  )
}
