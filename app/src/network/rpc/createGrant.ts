import { AnchorWallet } from '@solana/wallet-adapter-react'
import { Keypair } from '@solana/web3.js'
import Decimal from 'decimal.js-light'

import { getGrantProgram } from '../getGrantProgram'
import { ContentSHA256 } from '../types/ContentSHA256'
import { Grant } from '../types/Grant'
import { connection } from './../connection'
import { fetchAssociatedUSDCAccount } from './../fetch/fetchAssociatedUSDCAccount'

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

  const associatedTokenAddress = await fetchAssociatedUSDCAccount(
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
    .rpc()

  const grantAccount = await program.account.grant.fetch(grantKeypair.publicKey)

  return {
    publicKey: grantKeypair.publicKey,
    contentSha256: grantAccount.contentSha256 as ContentSHA256,
    initialAmountLamports: new Decimal(grantAccount.initialAmount.toString()),
  }
}
