import { AnchorProvider, Program } from '@project-serum/anchor'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey } from '@solana/web3.js'

import { IDL, SplTokenFaucet } from '../__generated__/spl_token_faucet'
import { TypedProgram } from './types/typedProgram'

export const localFaucetProgram = new PublicKey(
  '4sN8PnN2ki2W4TFXAfzR645FWs8nimmsYeNtxM8RBK6A',
)

export const getAirdropProgram = (
  wallet: AnchorWallet,
  connection: Connection,
) => {
  const provider = new AnchorProvider(connection, wallet, {})

  const program = new Program(
    IDL,
    localFaucetProgram,
    provider,
  ) as TypedProgram<SplTokenFaucet>

  return program
}
