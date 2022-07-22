import { getAccount } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

import { connection } from '../connection'
import { fetchUSDCAssociatedTokenAccount } from '../getUSDCAssociatedTokenAddress'
import { convertUnitsToUSDC } from './../convertUSDC'

export const fetchUSDCBalance = async (owner: PublicKey): Promise<number> => {
  const associatedTokenAddress = await fetchUSDCAssociatedTokenAccount(owner)
  const account = await getAccount(connection, associatedTokenAddress)
  const balanceUSDC = convertUnitsToUSDC(account.amount)
  return balanceUSDC
}
