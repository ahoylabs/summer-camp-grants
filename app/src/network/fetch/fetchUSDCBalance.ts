import { getAccount } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

import { connection } from '../connection'
import { fetchAssociatedUSDCAccount } from './fetchAssociatedUSDCAccount'

const convertToUSDC = (amount: bigint): number => {
  // USDC is denominated in units of 1e^-6
  return Number(amount) / 1_000_000
}

export const fetchUSDCBalance = async (owner: PublicKey): Promise<number> => {
  const associatedTokenAddress = await fetchAssociatedUSDCAccount(owner)
  const account = await getAccount(connection, associatedTokenAddress)
  const balanceUSDC = convertToUSDC(account.amount)
  return balanceUSDC
}
