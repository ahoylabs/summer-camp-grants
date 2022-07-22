import { AnchorWallet } from '@solana/wallet-adapter-react'
import { Keypair } from '@solana/web3.js'

import { fetchUSDCAssociatedTokenAccount } from '../fetch/fetchUSDCAssociatedTokenAccount'
import { getGrantProgram } from '../getGrantProgram'
import { ContentSHA256 } from '../types/ContentSHA256'
import { formatGrant, Grant } from '../types/Grant'
import { connection } from './../connection'

interface Args {
  contentSha256: ContentSHA256
  wallet: AnchorWallet
}

export const createGrant = async ({
  contentSha256,
  wallet,
}: Args): Promise<Grant> => {
  const program = getGrantProgram(wallet, connection)
  const grantKeypair = Keypair.generate()

  const associatedTokenAddress = await fetchUSDCAssociatedTokenAccount(
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

  const grantAccount = await program.account.grant.fetch(grantKeypair.publicKey)

  return formatGrant(grantKeypair.publicKey, grantAccount)
}
