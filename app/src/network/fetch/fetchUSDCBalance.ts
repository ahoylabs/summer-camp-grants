import { getAccount } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

import { connection } from '../connection'
import { getUSDCAssociatedTokenAddress } from '../getUSDCAssociatedTokenAddress'
import { convertUnitsToUSDC } from './../convertUSDC'

export const fetchUSDCBalance = async (owner: PublicKey): Promise<number> => {
  const associatedTokenAddress = await getUSDCAssociatedTokenAddress(owner)
  try {
    const account = await getAccount(connection, associatedTokenAddress)
    const balanceUSDC = convertUnitsToUSDC(account.amount)
    return balanceUSDC
  } catch (error) {
    console.warn('Associated token account not found.')
    return 0
  }
}
