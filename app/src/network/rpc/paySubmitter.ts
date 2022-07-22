import { BN } from '@project-serum/anchor'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { getUSDCAssociatedTokenAddress } from '../getUSDCAssociatedTokenAddress'
import { convertUSDCToUnits } from './../convertUSDC'

interface Args {
  grantAccount: PublicKey
  submissionAccount: PublicKey
  submitterAssociatedTokenAccount: PublicKey
  usdcToPay: number
  wallet: AnchorWallet
}

export const paySubmitter = async ({
  usdcToPay,
  grantAccount,
  submissionAccount,
  submitterAssociatedTokenAccount,
  wallet,
}: Args) => {
  const program = getGrantProgram(wallet, connection)
  const associatedTokenAddress = await getUSDCAssociatedTokenAddress(
    wallet.publicKey,
  )

  await program.methods
    .paySubmission(new BN(convertUSDCToUnits(usdcToPay)))
    .accounts({
      grant: grantAccount,
      submission: submissionAccount,
      wallet: associatedTokenAddress,
      walletOwner: wallet.publicKey,
      payTo: submitterAssociatedTokenAccount,
    })
}
