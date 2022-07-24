import { ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey } from '@solana/web3.js'

import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { getUSDCAssociatedTokenAddress } from '../getUSDCAssociatedTokenAddress'
import { pinSubmissionToIPFS } from '../ipfs/pinToIPFS'
import { NEXT_PUBLIC_USDC_MINT_ADDR } from './../../__generated__/_env'

interface Args {
  contact: string
  description: string
  githubURL: string
  grantAccount: PublicKey
  imageFile: File | null
  title: string
  wallet: AnchorWallet
}

export const createSubmission = async ({
  grantAccount,
  wallet,
  contact,
  description,
  githubURL,
  title,
  imageFile,
}: Args) => {
  const contentSha256 = await pinSubmissionToIPFS(
    contact,
    description,
    githubURL,
    title,
    imageFile,
  )

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
