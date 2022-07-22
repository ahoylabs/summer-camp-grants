import { AnchorProvider, Program } from '@project-serum/anchor'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'

import { AhoyGrants, IDL } from '../../../contract/target/types/ahoy_grants'
import { NEXT_PUBLIC_PROGRAM_ID } from './../__generated__/_env'
import { TypedProgram } from './types/typedProgram'

export const getGrantProgram = (
  wallet: AnchorWallet,
  connection: Connection,
) => {
  const provider = new AnchorProvider(connection, wallet, {})

  const program = new Program(
    IDL,
    NEXT_PUBLIC_PROGRAM_ID,
    provider,
  ) as TypedProgram<AhoyGrants>

  return program
}
