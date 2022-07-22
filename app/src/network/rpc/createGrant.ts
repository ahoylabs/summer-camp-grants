import { AnchorWallet } from '@solana/wallet-adapter-react'
import { Keypair } from '@solana/web3.js'
import Decimal from 'decimal.js-light'

import { getGrantProgram } from '../getGrantProgram'
import { ContentSHA256 } from '../types/ContentSHA256'
import { Grant } from '../types/Grant'
import { connection } from './../connection'

interface Args {
  contentSha256: ContentSHA256
  wallet: AnchorWallet
}

export const createGrant = async ({ contentSha256, wallet }: Args) => {
  const program = getGrantProgram(wallet, connection)
  const grantKeypair = Keypair.generate()

  await program.methods
    .create(contentSha256)
    .accounts({
      // pubkey of the grant account
      grant: grantKeypair.publicKey,
      // fee payer
      payer: wallet.publicKey,
      // USDC associated token account pubkey
      wallet: new Keypair().publicKey, // TODO!!!!!!!!!!!! query the wallet for a USDC account
      // owner of the associated token account
      walletOwner: wallet.publicKey,
    })
    .rpc()

  const grantAccount = await program.account.grant.fetch(grantKeypair.publicKey)

  const grant: Grant = {
    publicKey: grantKeypair.publicKey,
    contentSha256: grantAccount.contentSha256 as ContentSHA256,
    initialAmountLamports: new Decimal(grantAccount.initialAmount.toString()),
  }

  return grant
}
