import { AnchorProvider, Program } from '@project-serum/anchor'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'

import { IDL, SplTokenFaucet } from '../__generated__/spl_token_faucet'
import { NEXT_PUBLIC_USDC_MINT_ADDR } from './../__generated__/_env'
import { TypedProgram } from './types/typedProgram'

export const getAirdropProgram = (
  wallet: AnchorWallet,
  connection: Connection,
) => {
  const provider = new AnchorProvider(connection, wallet, {})

  const program = new Program(
    IDL,
    NEXT_PUBLIC_USDC_MINT_ADDR,
    provider,
  ) as TypedProgram<SplTokenFaucet>

  return program
}
