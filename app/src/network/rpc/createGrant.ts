import { AnchorWallet } from '@solana/wallet-adapter-react'
import { Keypair } from '@solana/web3.js'

import { getGrantProgram } from '../getGrantProgram'
import { ContentSHA256 } from '../types/ContentSha256'
import { connection } from './../connection'

interface Args {
  contentSha256: ContentSHA256
  wallet: AnchorWallet
}

export const createGrant = async ({ contentSha256, wallet }: Args) => {
  const program = getGrantProgram(wallet, connection)
  const grant = Keypair.generate()

  const txHash = await program.methods
    .create(contentSha256)
    .accounts({
      grant: grant.publicKey,
      payer: wallet.publicKey,
      wallet: wallet.publicKey,
      walletOwner: wallet.publicKey,
    })
    .rpc()

  return txHash
}
