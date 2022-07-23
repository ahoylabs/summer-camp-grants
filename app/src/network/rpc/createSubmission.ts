import { ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey } from '@solana/web3.js'

import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { getUSDCAssociatedTokenAddress } from '../getUSDCAssociatedTokenAddress'
import { ContentSHA256 } from '../types/ContentSHA256'
import { NEXT_PUBLIC_USDC_MINT_ADDR } from './../../__generated__/_env'

interface Args {
  contentSha256: ContentSHA256
  grantAccount: PublicKey
  wallet: AnchorWallet
}

export const createSubmission = async ({
  contentSha256,
  grantAccount,
  wallet,
}: Args) => {
  const program = getGrantProgram(wallet, connection)
  const submissionKeypair = Keypair.generate()
  const associatedUSDCAccount = await getUSDCAssociatedTokenAddress(
    wallet.publicKey,
  )

  await program.methods
    .submit(contentSha256)
    .accounts({
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      grant: grantAccount,
      submission: submissionKeypair.publicKey,
      mint: new PublicKey(NEXT_PUBLIC_USDC_MINT_ADDR),
      payTo: associatedUSDCAccount,
      payToOwner: wallet.publicKey,
      payer: wallet.publicKey,
    })
    .signers([submissionKeypair])
    .rpc()

  return submissionKeypair.publicKey
}
