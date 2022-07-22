import { AnchorWallet } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey } from '@solana/web3.js'

import { getGrantProgram } from '../getGrantProgram'
import { getUSDCAssociatedTokenAddress } from '../getUSDCAssociatedTokenAddress'
import { pinGrantToIPFS } from '../ipfs/pinToIPFS'
import { connection } from './../connection'

interface Args {
  companyName: string
  description: string
  imageFile: File | null
  twitterSlug: string
  wallet: AnchorWallet
  websiteURL: string
}

export const createGrant = async ({
  companyName,
  description,
  imageFile,
  twitterSlug,
  wallet,
  websiteURL,
}: Args): Promise<PublicKey> => {
  const contentSha256 = await pinGrantToIPFS(
    companyName,
    description,
    twitterSlug,
    websiteURL,
    imageFile,
  )

  const program = getGrantProgram(wallet, connection)
  const grantKeypair = Keypair.generate()
  const associatedTokenAddress = await getUSDCAssociatedTokenAddress(
    wallet.publicKey,
  )
  await program.methods
    .create(contentSha256)
    .accounts({
      // grant account
      grant: grantKeypair.publicKey,
      // fee payer
      payer: wallet.publicKey,
      // associated USDC token account
      wallet: associatedTokenAddress,
      // owner of the associated token account
      walletOwner: wallet.publicKey,
    })
    .signers([grantKeypair])
    .rpc()
  await program.account.grant.fetch(grantKeypair.publicKey)

  return grantKeypair.publicKey
}
